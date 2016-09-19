var SiteView = Backbone.View.extend({
    el: '#container',
    events: {
        'click #createSiteButton': "addSite",
        'click #deleteSiteButton': "deleteSite",
        'click #adminSettingsButton': "passwordCheck",
    },
    deleteSiteDropdownTemplate: null,
    initialize: function () {
        //compile both dropdown templates
        this.template = Handlebars.compile($("#coffeeSiteDropdownTemplate").html());
        this.deleteSiteDropdownTemplate = Handlebars.compile($("#deleteCoffeeSiteDropdownTemplate").html());
        //any time the site collection is reset (only on a fetch), call render
        this.collection.bind("reset", this.render, this);
        var self = this;
        //connect to the hub and listen for updates
        $.connection.hub.start();
        //this comparator makes sure that the sitelist is always in order, based first by sitetextvalue, secondly by floor id
        this.collection.comparator = function (site) {
            return [site.get("SiteTextValue"), site.get('FloorId')]
        };
        var FreshPotHubProxy = $.connection.FreshPotHub;
        FreshPotHubProxy.client.ReceiveSites = function () {
            //when we get the update that there are new sites available
            self.collection.fetch({ reset: true });
            //fetch and sort the collection, this will trigger a re-render of the dropdowns
            self.collection.sort();
        }
    },
    render: function () {
        //clear the dropdown divs and then reappend the templated dropdown
        $('#coffeeSiteDropdown').empty();
        $('#coffeeSiteDropdown').append(this.template({ siteList: this.collection.toJSON() }));
        $('#deleteCoffeeSiteDropdown').empty();
        $("#deleteCoffeeSiteDropdown").append(this.deleteSiteDropdownTemplate({ siteList: this.collection.toJSON() }));
        $("#coffeeSite2").invisible();
        //when the coffee site dropdown changes, change the url to navigate to that site
        $("#coffeeSite").change(function () {
            //only if the dropdown value that it changed to isn't the blank one (please selet a type)
            if (this.value != "") {
                //hide the dropdown and begin adding the new pot that was selected
                //document.getElementById('#coffeeSite').style.visibility = "hidden";
                var dropdownValue = $('#coffeeSite option:selected').val();
                dropdownValue = dropdownValue.replace(/\s+/g, '');
                //append the site and floor to the url
                var siteTag = location.href + "/#" + dropdownValue;
                this.value = "";
                //go to - check router.siteChosen
                location.href = siteTag;
            }
        });
        $(function () {
            //when coffeesite2 (delete site dropdown) gets changed...
            $("#coffeeSite2").change(function () {
                var selection = $("#coffeeSite2 option:selected").val();
                if (selection != "Please select type") {
                    var string = selection.split("/");
                    var abbr = string[0].replace(/\s+/g, "");
                    var floorId = string[1];
                    var text = $("#coffeeSite2 option:selected").text().replace(/\s+/g, " ");
                    if (confirm("Are you sure you want to delete " + text + "?")) {
                        //delete that site from the DB
                        var FreshPotHubProxy = $.connection.FreshPotHub;
                        FreshPotHubProxy.server.DeleteSite(abbr, floorId);
                    }
                    $("#coffeeSite2").invisible();
                    this.value = "";
                    this.counter = 0;
                }
            })
        });

        return this;
    },
    //prompt the user for a password to access the create and delete site buttons
    passwordCheck: function () {
        var count = 1;
        var pass = prompt('Please enter the super secret admin password.', '');
        while (count < 3) {
            if (pass.toLowerCase() == "darin") {
                $("#createSiteButton").visible();
                $("#deleteSiteButton").visible();
                break;
            }
            count += 1;
            var pass = prompt('Access Denied - Password Incorrect, Please Try Again.', '');
        }
        return " ";
    },

    addSite: function () {
        var userSiteTextValue = prompt("Please enter the full name of the new location.");
        if (!userSiteTextValue) return;
        var userAbbr = prompt("Please enter the abbreviation of the new location.");
        if (!userAbbr) return;
        var userFloorId = prompt("Please enter the floor number of the new location.");
        if (!userFloorId) {
            return;
        }
        if (isNaN(userFloorId)) {
            alert("You entered \"" + userFloorId + "\" which is not a number. Please enter a number.");
            userFloorId = prompt("Please enter the floor number of the new location.");
        }



        //converts the abbr to upper case
        userAbbr = userAbbr.toUpperCase();
        //build a site object and pass it onto the hub to be added to the DB
        var site = {
            Abbreviation: userAbbr, AuditModifiedDate: new Date(), UpdateTime: true,
            SiteTextValue: userSiteTextValue, FloorId: userFloorId
        };
       
        var FreshPotHubProxy = $.connection.FreshPotHub;
        FreshPotHubProxy.server.AddSite(site);
        alert(userSiteTextValue + " has been added.");
    },

    counter: 0,
    //handle the showing and stuff of the delete site dropdown
    deleteSite: function () {
        if (this.counter == 0) {

            $("#coffeeSite2").visible();

            this.counter = 1;
        }
        else if (this.counter == 1) {

            $("#coffeeSite2").invisible();
            this.counter = 0;
        }
    }
});
