var PotView = Backbone.View.extend({
    events: {
        'click #deleteButton': "deletePot"
    },
    initialize: function () {
        this.template = Handlebars.compile($("#potTemplate").html());
        this.model.on('change', this.render, this);
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    deletePot: function () {
        this.model.set({ type: 'Empty' });
        this.model.set({ TypeTextValue: 'Empty' });
        this.model.set({ status: 'Empty' });
        this.model.set({ StatusTextValue: 'Empty' });
        this.model.set({ seconds: 0 });
        this.model.set({ track: false });

        var now = new Date();

        var postPot = {
            Id: this.model.get('Id'), TypeTextValue: this.model.get('type'),
            LocationTextValue: this.model.get('location'), StatusTextValue: this.model.get('status'),
            AuditModifiedDate: this.model.get('AuditModifiedDate'), UpdateTime: true
        };

        var FreshPotHubProxy = $.connection.FreshPotHub;

        FreshPotHubProxy.server.UpdatePot(postPot).done(function () {
            console.log('Invocation of DeletePot succeeded. ');
        }).fail(function (error) {
            console.log('Invocation of DeletePot failed. Error: ' + error);
        });

    }
});