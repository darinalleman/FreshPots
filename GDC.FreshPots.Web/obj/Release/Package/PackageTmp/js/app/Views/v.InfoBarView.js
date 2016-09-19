//var InfoBarView = Backbone.View.extend({
//    //el: $('st-container'),
//    //events: {
//    //    'click #newType': "addCoffeeTypeClick"
//    //},
//    initialize: function () {
//        //this.template = Handlebars.compile($("#createNewType").html());
//    },
//    render: function () {
//        //this.$el.html(this.template());

//        //return this;
//    },

   
//});
var CoffeeTypeSettings = Backbone.View.extend({
    //el: '#coffeeTypeDropdownSettings',
    events: {
        //'click #delType': "deleteCoffeeTypeClick"
    },
    initialize: function () {
        //this.collection.bind("reset", this.render, this);

        //this.template = Handlebars.compile($("#coffeeTypeDropdownSettingsTemplate").html());
    },
    render: function () {
        //this.$el.html(this.template({ coffeeTypes: this.collection.toJSON() }));
    },

    //deleteCoffeeType: function () {
    //    document.getElementById("deleteCoffeeTypeSettings").style.visibility = "visible";
    //    $(function () {
    //        $("#deleteCoffeeTypeSettings2").change(function () {
    //            var selection = document.getElementById("deleteCoffeeTypeSettings2").value;
    //            if (prompt("Are you sure you want to delete " + selection + "?") == "Yes") {
    //                console.log("Deleting " + selection);
    //                var FreshPotHubProxy = $.connection.FreshPotHub;

    //                FreshPotHubProxy.server.DeleteCoffeeType(selection).done(function () {
    //                    console.log('Invocation of DeleteCoffeeType succeeded');
    //                }).fail(function (error) {
    //                    console.log('Invocation of DeleteCoffeeType failed. Error: ' + error);
    //                });
    //                document.getElementById("deleteCoffeeTypeSettings").style.visibility = "hidden";
    //            }

    //        });

    //    })
    //}
});