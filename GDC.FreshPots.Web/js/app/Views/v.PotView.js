var PotView = Backbone.View.extend({
    events: {
        'click #deleteButton': "deletePot"
    },
    initialize: function () {
        this.template = Handlebars.compile($("#potTemplate").html());
        this.model.on('change', this.render, this);
        $.connection.hub.start();
    },
    render: function () {
        this.$el.html(this.template(JSON.parse(JSON.stringify(this.model))));
        return this;
    },
    /*
    Set the model this pot view to empty and stuff, and update the pot in the hub. 
    */
    deletePot: function () {
        this.model.set({ TypeTextValue: 'Empty' });
        this.model.set({ StatusId: statusEnum.EMPTY });
        this.model.set({ seconds: 0 });
        this.model.set({ track: false });

        var postPot = {
            Id: this.model.get('Id'), TypeTextValue: this.model.get('TypeTextValue'),
            LocationId: this.model.get('LocationId'), StatusId: this.model.get('StatusId'),
            AuditModifiedDate: this.model.get('AuditModifiedDate'), UpdateTime: true,
            SiteId: this.model.get('SiteId')
        };

        var FreshPotHubProxy = $.connection.FreshPotHub;

        FreshPotHubProxy.server.UpdatePot(postPot, this.model.get('SiteId'));

    }
});