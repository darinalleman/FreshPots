var AddPotView = Backbone.View.extend({
    events: {
        'click #addNewPotButtonRegular': "addNewRegular",
        'click #addNewPotButtonOther': "addNewOther",
    },
    initialize: function () {
        this.template = Handlebars.compile($("#addPotTemplate").html());
        //clone the coffeetypes dropdown and add it to the sidebar
        var deleteDropdown = $("inputDiv").clone();
        deleteDropdown.attr("id", "coffeeType2");
        deleteDropdown.appendTo(".st-menu st-effect-6");
        $.connection.hub.start();
    },
    render: function () {
        this.$el.html(this.template({ site: this.tagName }));
        return this;
    },

    addNewRegular: function () {
        if (this.getNextFreeLocation() == 0) {
            alert("There are no empty burners. Please remove one before brewing a new one.");
        }
        else {
            this.finishAddingOther("Regular");
        }
    },
    /*
    Add a new pot with a type from the dropdown list
    */
    addNewOther: function () {
        var self = this;
        var nextFreeLocation = self.getNextFreeLocation();
        if (nextFreeLocation == 0) {
            alert("There are no empty burners. Please remove one before brewing a new one.");
        }
        else if (document.getElementById('inputDiv').style.visibility == "hidden") {
            this.removeUnusedValues();
            document.getElementById('inputDiv').style.visibility = "visible";
            //when the dropdown list selection changes...
            $("#coffeeType").change(function () {
                //only if the dropdown value that it changed to isn't the blank one (please select a type)
                if (this.value != "") {
                    document.getElementById('inputDiv').style.visibility = "hidden";
                    self.finishAddingOther(document.getElementById("coffeeType").value);
                    //reset the value to the "Please select a type" option
                    this.value = "";
                }
            });
        }
        else {
            document.getElementById('inputDiv').style.visibility = "hidden";
        }
    },

    finishAddingOther: function (type) {
        var nextFreeLocation = this.getNextFreeLocation();
        var lowerLeft = this.collection.models[1];
        /*
            If the LL is free, just put it there..
            If the LL is not free, check the upper and if it's free, move the 
            ll one up there, and put the new on in the LL.
            If both the LL and U are not free, do the previous except move the LL
            to the LR
        */
        if (nextFreeLocation == locationEnum.LOWERLEFT.id) {
            //simply add a new pot that the user specified in the LL
            this.createPot(lowerLeft, type, locationEnum.LOWERLEFT.id);
        }
        else if (nextFreeLocation == locationEnum.UPPER.id) {
            this.movePotAtoB(locationEnum.LOWERLEFT.id, locationEnum.UPPER.id);
            this.createPot(lowerLeft, type, locationEnum.LOWERLEFT.id);
        }
        else if (nextFreeLocation == locationEnum.LOWERRIGHT.id) {
            this.movePotAtoB(locationEnum.LOWERLEFT.id, locationEnum.LOWERRIGHT.id);
            this.createPot(lowerLeft, type, locationEnum.LOWERLEFT.id);
        }
    },

    /*
    Remove empty and regular from the dropdown list 
    */
    removeUnusedValues: function () {
        $("#coffeeType option").filter(function () {
            var $this = $(this);
            return $this.text() == "Regular" || $this.text() == "Empty";
        }).remove();
    },

    /*
    Create and add a new pot to the position specified, and post the update to the hub.
    */
    createPot: function (pot, type, location) {
        pot.set({ TypeTextValue: type });
        pot.set({ StatusId: statusEnum.BREWED });
        pot.set({ LocationId: location });
        pot.set({ track: true });
        pot.set({ seconds: 0 });
        var now = new Date();
        var postPot = {
            Id: pot.get('Id'), TypeTextValue: pot.get('TypeTextValue'),
            LocationId: pot.get('LocationId'), StatusId: pot.get('StatusId'),
            AuditModifiedDate: now, UpdateTime: true,
            SiteId: pot.get('SiteId')
        };
        var FreshPotHubProxy = $.connection.FreshPotHub;
        FreshPotHubProxy.server.UpdatePot(postPot, pot.get('SiteId'));
    },
    /*
    Returns the first location that is free, with the order being LL, U, LR. 
    */
    getNextFreeLocation: function () {
        var nextFreeLocation = 0;
        _.each(this.collection.models, function (m, i) {
            if (m.get('LocationId') == locationEnum.LOWERLEFT.id && (m.get('StatusId') == statusEnum.EMPTY)) {
                nextFreeLocation = locationEnum.LOWERLEFT.id;
            }
            else if (m.get('LocationId') == locationEnum.UPPER.id && (m.get('StatusId') == statusEnum.EMPTY) && (nextFreeLocation != locationEnum.LOWERLEFT.id)) {
                nextFreeLocation = locationEnum.UPPER.id;
            }
            else if (m.get('LocationId') == locationEnum.LOWERRIGHT.id && (m.get('StatusId') == statusEnum.EMPTY) && (nextFreeLocation != locationEnum.LOWERLEFT.id) && (nextFreeLocation != locationEnum.UPPER.id)) {
                nextFreeLocation = locationEnum.LOWERRIGHT.id;
            }
        });
        return nextFreeLocation;
    },
    /*
    Moves the data from pot A to pot B. Pot A is then set to empty. 
    */
    movePotAtoB: function (locationAId, locationBId) {
        //set up the pots. LocationIds run from 1-3 whereas the modelList goes from 0-2, so subtract one to match the modelist position
        var potA = this.collection.models[locationAId - 1];
        var potB = this.collection.models[locationBId - 1];

        //simply update the LR pot to take the values that were in the Lower Left
        potB.set({ TypeTextValue: potA.get('TypeTextValue') });
        potB.set({ StatusId: statusEnum.BREWED });
        potB.set({ AuditModifiedDate: potA.get('AuditModifiedDate') });
        potB.set({ track: true });
        potB.set({ seconds: potA.get('seconds') });
        //build the pot to be sent to the hub
        var postPot = {
            Id: potB.get('Id'), TypeTextValue: potB.get('TypeTextValue'),
            LocationId: potB.get('LocationId'), StatusId: potB.get('StatusId'),
            AuditModifiedDate: potB.get('AuditModifiedDate'), UpdateTime: false,
            SiteId: potB.get('SiteId')
        };
        //update the hub
        var FreshPotHubProxy = $.connection.FreshPotHub;
        FreshPotHubProxy.server.UpdatePot(postPot, potB.get('SiteId'));
      
    },
    //clear the pot at the input location - to be used after calling movePotAtoB when using drag and drop
    clearPot: function(locationId)
    {
        var pot = this.collection.models[locationId - 1];
        pot.set({ TypeTextValue: 'Empty' });
        pot.set({ StatusId: statusEnum.EMPTY });
        pot.set({ track: false });
        pot.set({ seconds: 0 });

        postPot = {
            Id: pot.get('Id'), TypeTextValue: pot.get('TypeTextValue'),
            LocationId: pot.get('LocationId'), StatusId: pot.get('StatusId'),
            AuditModifiedDate: pot.get('AuditModifiedDate'), UpdateTime: true,
            SiteId: pot.get('SiteId')
        };
        var FreshPotHubProxy = $.connection.FreshPotHub;
        FreshPotHubProxy.server.UpdatePot(postPot, pot.get('SiteId'));
    }
});
