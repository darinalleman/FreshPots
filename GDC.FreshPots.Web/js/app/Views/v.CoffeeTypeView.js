var CoffeeTypeView = Backbone.View.extend({
    el: '#coffeeTypeDropdown',
    initialize: function () {
        this.collection.bind("reset", this.render, this);

        this.template = Handlebars.compile($("#coffeeTypeDropdownTemplate").html());
    },
    render: function () {
        this.$el.html(this.template({ coffeeTypes: this.collection.toJSON() }));
    }
});