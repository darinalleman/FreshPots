var ContainerView = Backbone.View.extend({
    el: $('#st-container'),
    render: function (pot, location) {
        //this ends up being the element ID for example #upper or #lowerright, matching the div id in the html
        var locationID = '#' + location;
        this.setElement(locationID);
        //create a new potview with the model pot input, and render
        //it in the element location.
        this.$el.empty();
        this.$el.append(new PotView({ model: pot }).render().el);
    },

    initialize: function () {
        //on first build, call render pots, which will render all of the current pots at load
        this.collection.bind("reset", this.renderPots, this);
        _.bindAll(this, 'track');
        var FreshPotHubProxy = $.connection.FreshPotHub;
        var self = this;
        /*
            Since the containerview has a connection to the hub,
            when there is information broadcast, this class will recieve it.

            It recieves a pot list (array of pot objects), and then iterates
            through  that list. For each object, it updates that new Pot Model 
            and then that change triggers a re-render
        */
        FreshPotHubProxy.client.ReceivePots = function (potList) {
            for (var i = 0; i < potList.length; i++) {
                var m = self.collection.shift();
                m.set({ TypeTextValue: potList[i].TypeTextValue });
                m.set({ LocationId: potList[i].LocationId });
                m.set({ StatusId: potList[i].StatusId });
                m.set({ AuditModifiedDate: potList[i].AuditModifiedDate });
                m.set({ seconds: 0 });
                m.set({ SiteId: potList[i].SiteId });

                var nowDate = new Date();
                var postDate = self.convertDate(m.get('AuditModifiedDate'));
                var secondsSinceUpdate = Math.floor((nowDate.getTime() - postDate.getTime()) / 1000);
                if (m.get('StatusId') == statusEnum.BREWED) {
                    m.set({ track: true });
                    if (secondsSinceUpdate < 0) {
                        m.set({ seconds: 0 });
                    }
                    else {
                        m.set({ seconds: secondsSinceUpdate });
                    }
                } else if (m.get('StatusId') == statusEnum.EXPIRED) {
                    m.set({ track: true });
                    if (secondsSinceUpdate >= 0) {
                        m.set({ seconds: secondsSinceUpdate });
                    }
                    else {
                        m.set({ seconds: 0 });
                    }
                } else {
                    m.set({ track: false });
                }
                self.collection.push(m);
            }
        };
        /*
        When we receive a list of coffeetypes from the hub, take the list and update all of the dropdwons.
        We have to be careful though to make sure that we remember to add back the "please select type" 
        option as well as remove regular and empty from the list.
        */
        FreshPotHubProxy.client.ReceiveTypes = function (list) {
            var coffeeTypes = new CoffeeTypes();
            var coffeeTypeView = new CoffeeTypeView({ collection: coffeeTypes });

            coffeeTypes.fetch({ reset: true });

            $("#coffeeType option").filter(function () {
                var $this = $(this);
                return true;
            }).remove();
            $('#coffeeType').append($('<option>', {
                value: "",
                text: "Please select type"
            }));
            for (var i = 0; i < list.length; i++) {
                if (list[i].TextValue != "Regular" && list[i].TextValue != "Empty") {
                    $('#coffeeType').append($('<option>', {
                        value: i,
                        text: list[i].TextValue
                    }));
                }

            }
            $("#coffeeType2").empty();
            $('#coffeeType2').append($('<option>', {
                value: "",
                text: "Please select type"
            }));
            for (var i = 0; i < list.length; i++) {
                if (list[i].TextValue != "Regular" && list[i].TextValue != "Empty") {
                    $('#coffeeType2').append($('<option>', {
                        value: i,
                        text: list[i].TextValue
                    }));
                }
            }
        }
        /*
        Join the group in the hub to receive updates from that site
        */
        $.connection.hub.start().done(function () {
            FreshPotHubProxy.server.JoinSite(self.collection.models[0].get('SiteId').toString());
        });
    },

    renderPots: function () {
        var self = this;
        self.$el.empty();
        _.each(this.collection.models, function (m, i) {
            m.set({ seconds: 0 });
            //calculate the seconds to be displayed first
            var nowDate = new Date();
            var postDate = self.convertDate(m.get('AuditModifiedDate'));
            var secondsSinceUpdate = Math.floor((nowDate.getTime() - postDate.getTime()) / 1000);
            if (m.get('StatusId') == statusEnum.BREWED) {
                m.set({ track: true });
                m.set({ seconds: secondsSinceUpdate });
            } else if (m.get('StatusId') == statusEnum.EXPIRED) {
                m.set({ seconds: 3600 + secondsSinceUpdate });
                m.set({ track: true });
            } else if (m.get('StatusId') == statusEnum.EMPTY) {
                m.set({ track: false });
            }
            //figure out which location it is, and pass that text on to the render function so it knows which HTML div to render
            var locationText;
            for (var i = 0; i < 3; i++) {
                if (m.get('LocationId') == locationEnum.LOWERLEFT.id) {
                    locationText = locationEnum.LOWERLEFT.text;
                }
                else if (m.get('LocationId') == locationEnum.UPPER.id) {
                    locationText = locationEnum.UPPER.text;
                }
                else if (m.get('LocationId') == locationEnum.LOWERRIGHT.id) {
                    locationText = locationEnum.LOWERRIGHT.text;
                }
            }
            self.render(m, locationText);

        });
        this.renderAddPotView();
    },
    convertDate: function (sqlDate) {
        var sqlDateArr1 = sqlDate.split("-");
        var sYear = sqlDateArr1[0];
        var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
        var sqlDateArr2 = sqlDateArr1[2].split("T");
        var sDay = sqlDateArr2[0];
        var sqlDateArr3 = sqlDateArr2[1].split(":");
        var sHour = sqlDateArr3[0];
        var sMinute = sqlDateArr3[1];
        var sqlDateArr4 = sqlDateArr3[2].split(".");
        var sSecond = sqlDateArr4[0];
        var sMillisecond = sqlDateArr4[1];

        var d = new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond, sMillisecond);

        return d;
    },
    renderAddPotView: function () {
        this.setElement('#addPot');
        this.$el.empty();
        var self = this;
        $.connection.hub.start().done(function () {
            var FreshPotHubProxy = $.connection.FreshPotHub;
            FreshPotHubProxy.server.FindSiteTextValue(self.collection.models[0].get('SiteId')).done(
                function (SiteTextValue) {
                    self.$el.append(new AddPotView({ collection: self.collection, tagName: SiteTextValue }).render().el);
                    self.renderCoffeeTypeDropdown();
                });
            
            
        });
    },
    renderCoffeeTypeDropdown: function () {
        var coffeeTypes = new CoffeeTypes();
        var coffeeTypeView = new CoffeeTypeView({ collection: coffeeTypes });

        coffeeTypes.fetch({ reset: true });

        this.interval = setInterval(this.track, 1000);
    },
    /*
    this method runs every second.
    It iterates through each model, and updates its seconds
    If it goes past 3600 seconds (1hr) it sets the pot to expired. 
    */
    track: function () {
        _.each(this.collection.models, function (m, i) {
            if (m.get('track') == true) {
                var seconds = m.get('seconds');

                if (seconds == 3600) {
                    m.set({ statusid: statusEnum.EXPIRED });
                }
                seconds++;
                m.set({ seconds: seconds });
            }
        });
    },



});

function addCoffeeType() {
    var newType = prompt("Please enter the name of the new coffee type");
    var FreshPotHubProxy = $.connection.FreshPotHub;

    if (newType.length > 20) {
        alert("Type name is too long. Please choose a shorter name.");
    }
    else if (newType != "") {
        FreshPotHubProxy.server.AddCoffeeType(newType);
        alert(newType + " added.");
        this.value = "";
    }
}
var counter = 0;
function deleteCoffeeType() {

    if (counter == 0) {
        var div = $('#coffeeType');
        var clone = div.clone(true, true);
        //var clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
        clone.id = "coffeeType2";
        $(clone).attr("id", "coffeeType2");
        clone.unbind();
        $("#menu-6").append(clone);
        clone.css('height', '5%');
        clone.css('width', '68%');
        clone.css('overflow-y', 'hidden');
        $("#coffeeType2").visible();
        $("#coffeeType2 option").filter(function () {
            var $this = $(this);
            return $this.text() == "Regular" || $this.text() == "Empty";
        }).remove();
        counter = 2;
    }
    else if (counter == 1) {

        $("#coffeeType2").visible();
        counter = 2;
    }
    else if (counter == 2) {
        $("#coffeeType2").invisible();
        counter = 1;
    }
    $(function () {

        $("#coffeeType2").change(function () {
            var selection = $("#coffeeType2 option:selected").text();

            if (selection != "Please select type") {
                if (confirm("Are you sure you want to delete " + selection + "?\nPlease make sure there are no active coffee pots with this type before deletion.")) {
                    var FreshPotHubProxy = $.connection.FreshPotHub;
                    FreshPotHubProxy.server.GetListOfTypeBrewed(selection).done(function (siteList) {
                        if (!siteList)
                        {
                            FreshPotHubProxy.server.DeleteCoffeeType(selection);
                        }
                        else {
                            var alertString = "Cannot remove type yet, there are still brewed pots with that type. Please remove the pots in the following sites before removing this type. \n\n"
                            for (var i = 0; i < siteList.length; i++)
                            {
                                alertString += siteList[i].SiteTextValue.replace(/\s+/g, " ") + " Floor " + siteList[i].FloorId + '\n';
                            }
                            alert(alertString);
                        }
                    });
                }
                $("#coffeeType2").invisible();
                this.value = "";
            }
        })
    });
}
jQuery.fn.visible = function () {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
var counter = 0;

function notes() {
    alert("For best use of applications:\n\n" +

           "-Google Chrome\n\n" +

           "-Mozilla Fire Fox\n\n" +

           "-IE Edge, 11, 10\n\n" +

           "-Opera\n")
}
function instructions() {
    alert("Add a new pot using either of the brew buttons on the main screen.\n" +

            "A fresh pot will go in the lower left. If a pot is already there, it gets pushed to the upper or lower right locations automagically. \n" +

            "The timer will be red when the coffee is not fully brewed yet, or it is old and expired. \n" +

            "\n" +

            "Enjoy the Fresh Pots! ")
}