var ContainerView = Backbone.View.extend({
    el: $('.st-container'),

    render: function (pot, location) {
        var locationID = '#' + location;
        this.setElement(locationID);
        //create a new potview with the model pot input, and render
        //it in the element location.
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
            through  that list. For each object, it creates a new Pot Model 
            and then sends that new pot off to be rendered in it's location.
        */
        FreshPotHubProxy.client.RecieveInfo = function (potList) {
            for (var i = 0; i < potList.length; i++) {
                var m = self.collection.shift();
                m.set({ type: potList[i].TypeTextValue });
                m.set({ TypeTextValue: potList[i].TypeTextValue });
                m.set({ location: potList[i].LocationTextValue });
                m.set({ LocationTextValue: potList[i].LocationTextValue });
                m.set({ status: potList[i].StatusTextValue });
                m.set({ StatusTextValue: potList[i].StatusTextValue });
                m.set({ AuditModifiedDate: potList[i].AuditModifiedDate });
                m.set({ seconds: 0 });
                var nowDate = new Date();
                var postDate = self.convertDate(m.get('AuditModifiedDate'));
                var secondsSinceUpdate = Math.floor((nowDate.getTime() - postDate.getTime()) / 1000);
                if (m.get('status') == "Brewed") {
                    m.set({ track: true });
                    if (secondsSinceUpdate < 0) {
                        m.set({ seconds: 0 });
                    }
                    else {
                        m.set({ seconds: secondsSinceUpdate });
                    }
                } else if (m.get('status') == "Expired") {
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
        FreshPotHubProxy.client.RecieveTypes = function (list) {
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
                    console.log("\tAdded " + list[i].TextValue);
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
                    console.log("\tAdded " + list[i].TextValue);
                }
            }


        }

        $.connection.hub.start().done(function () {
            console.log("Successful connection to hub in containerview");
        }).fail(function (e) {
            console.log("Unable to connect to the hub in conatinerview. " + e);
        });

    },

    renderPots: function () {
        var self = this;
        self.$el.empty();
        _.each(this.collection.models, function (m, i) {
            m.set({ type: m.get('TypeTextValue') });
            m.set({ location: m.get('LocationTextValue') });
            m.set({ status: m.get('StatusTextValue') });
            m.set({ seconds: 0 });

            var nowDate = new Date();
            var postDate = self.convertDate(m.get('AuditModifiedDate'));
            var secondsSinceUpdate = Math.floor((nowDate.getTime() - postDate.getTime()) / 1000);

            if (m.get('status') == "Brewed") {
                m.set({ track: true });
                m.set({ seconds: secondsSinceUpdate });
            } else if (m.get('status') == "Expired") {
                m.set({ seconds: 3600 + secondsSinceUpdate });
                m.set({ track: true });
            } else {
                m.set({ track: false });
            }

            self.render(m, m.get('LocationTextValue'));

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

        this.$el.append(new AddPotView({ collection: this.collection }).render().el);

        this.renderCoffeeTypeDropdown();
    },
    renderCoffeeTypeDropdown: function () {
        var coffeeTypes = new CoffeeTypes();
        var coffeeTypeView = new CoffeeTypeView({ collection: coffeeTypes });

        coffeeTypes.fetch({ reset: true });

        this.interval = setInterval(this.track, 1000);
    },

    track: function () {
        _.each(this.collection.models, function (m, i) {
            if (m.get('track') == true) {
                var seconds = m.get('seconds');

                if (seconds == 3600) {
                    m.set({ StatusTextValue: 'Expired' });
                    m.set({ status: 'Expired' });
                }
                seconds++;
                m.set({ seconds: seconds });
            }
        });
    }

});