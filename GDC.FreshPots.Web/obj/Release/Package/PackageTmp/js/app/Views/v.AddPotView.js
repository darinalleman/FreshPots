var AddPotView = Backbone.View.extend({
    events: {
        'click #addNewPotButtonRegular': "addNewRegular",
        'click #addNewPotButtonOther': "addNewOther",
    },
    initialize: function () {
        this.template = Handlebars.compile($("#addPotTemplate").html());
        var deleteDropdown = $("inputDiv").clone();
        deleteDropdown.attr("id", "coffeeType2");
        deleteDropdown.appendTo(".st-menu st-effect-6");
      
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    addNewRegular: function () {
        if (this.getNextFreeLocation() == "") {
            alert("There are no empty burners. Please remove one before brewing a new one.");
        }
        else {
            this.finishAddingOther("Regular");
        }
    },

    addNewOther: function () {
        var self = this;
        var nextFreeLocation = self.getNextFreeLocation();
        if (nextFreeLocation == "") {
            alert("There are no empty burners. Please remove one before brewing a new one.");
        }
        else if (document.getElementById('inputDiv').style.visibility == "hidden") {
            //remove Regular and Empty from the dropdown list
            this.removeUnusedValues();
            //make the dropdown visible
            document.getElementById('inputDiv').style.visibility = "visible";
            //when the dropdown list selection changes...
            $(function () {
                $("#coffeeType").change(function () {
                    //only if the dropdown value that it changed to isn't the blank one (please selet a type)
                    if (this.value != "") {
                        //hide the dropdown and begin adding the new pot that was selected
                        document.getElementById('inputDiv').style.visibility = "hidden";
                        self.finishAddingOther(document.getElementById("coffeeType").value);
                        //reset the value to the "Please select a type" option
                        this.value = "";
                    }
                }
             )
            });
        }
        else {
            document.getElementById('inputDiv').style.visibility = "hidden";
        }
    },


    finishAddingOther: function (type) {
        var self = this;
        var FreshPotHubProxy = $.connection.FreshPotHub;
        var modelList = this.collection.models;
        var nextFreeLocation = self.getNextFreeLocation();
        /*
            Knowing that the order of pots in the lists will be 
            in upper, ll, lr....

            If the ll is free, just put it there..
            If the ll is not free, check the upper and if it's free, move the 
            ll one up there, and put the new on in the ll.
            If both the LL and U are not free, do the previous except move the LL
            to the LR
        */
        if (nextFreeLocation == "LowerLeft") {
            //simply add a new pot that the user specified in the LL
            self.createPot(modelList[1], type, "LowerLeft");
            console.log("Added pot to lower left");
        }
        else if (nextFreeLocation == "Upper")
        {
            //simply update the upper pot to take the values that were in the Lower Left
            var upper = modelList[0];
            var lowerLeft = modelList[1];
            upper.set({ type: lowerLeft.get('type') });
            upper.set({ status: "Brewed" });
            upper.set({ AuditModifiedDate: lowerLeft.get('AuditModifiedDate') });
            //build the pot to be sent to the hub
            var postPot = {
                Id: upper.get('Id'), TypeTextValue: upper.get('type'),
                LocationTextValue: upper.get('location'), StatusTextValue: upper.get('status'),
                AuditModifiedDate: upper.get('AuditModifiedDate'), UpdateTime: false
            };
            //update the hub
            FreshPotHubProxy.server.UpdatePot(postPot).done(function () {
                console.log('Invocation of UpdatePot succeeded');
            }).fail(function (error) {
                console.log('Invocation of UpdatePot failed. Error: ' + error);
            });
            //create a new pot in the lower left that the user specified (reg or dropdown)
            self.createPot(modelList[1], type, "LowerLeft");
        }
        else if (nextFreeLocation == "LowerRight") {
            //simply update the LR pot to take the values that were in the Lower Left
            var lowerRight = modelList[2];
            var lowerLeft = modelList[1];
            lowerRight.set({ type: lowerLeft.get('type') });
            lowerRight.set({ status: "Brewed" });
            lowerRight.set({ AuditModifiedDate: lowerLeft.get('AuditModifiedDate') });
            //build the pot to be sent to the hub
            var postPot = {
                Id: lowerRight.get('Id'), TypeTextValue: lowerRight.get('type'),
                LocationTextValue: lowerRight.get('location'), StatusTextValue: lowerRight.get('status'),
                AuditModifiedDate: lowerRight.get('AuditModifiedDate'), UpdateTime: false
            };
            //update the hub
            FreshPotHubProxy.server.UpdatePot(postPot).done(function () {
                console.log('Invocation of UpdatePot succeeded');
            }).fail(function (error) {
                console.log('Invocation of UpdatePot failed. Error: ' + error);
            });
            //create a new pot in the lower left that the user specified
            self.createPot(modelList[1], type, "LowerLeft");
        }
    },

    /*
    Remove empty and regular from the dropdown list 
    */
    removeUnusedValues: function(){
        $("#coffeeType option").filter(function () {
            var $this = $(this);
            return $this.text() == "Regular" || $this.text() == "Empty";
        }).remove();
    },
    
    /*
    Create and add a new pot to the position specified, and post the update to the hub.
    */
    createPot: function (pot, type, location) {
        pot.set({ type: type });
        pot.set({ status: "Brewed" });
        pot.set({ location: location });

        var now = new Date();
        var postPot = { Id: pot.get('Id'), TypeTextValue: pot.get('type'),
            LocationTextValue: pot.get('location'), StatusTextValue: pot.get('status'),
            AuditModifiedDate: now, UpdateTime: true
        };
        var FreshPotHubProxy = $.connection.FreshPotHub;
        FreshPotHubProxy.server.UpdatePot(postPot).done(function () {
            console.log('Invocation of UpdatePot succeeded');
        }).fail(function (error) {
            console.log('Invocation of UpdatePot failed. Error: ' + error);
        });
    },

    getNextFreeLocation: function(){
        var modelList = this.collection.models;
        var nextFreeLocation = "";
        _.each(modelList, function (m, i) {
            if (m.get('location') == "LowerLeft" && (m.get('status') == "Empty")) {
                nextFreeLocation = "LowerLeft";
            }
            else if (m.get('location') == "Upper" && (m.get('status') == "Empty") && (nextFreeLocation != "LowerLeft")) {
                nextFreeLocation = "Upper";
            }
            else if (m.get('location') == "LowerRight" && (m.get('status') == "Empty") && (nextFreeLocation != "LowerLeft") && (nextFreeLocation != "Upper")) {

                nextFreeLocation = "LowerRight";
            }
        });
        return nextFreeLocation;
    }
});
