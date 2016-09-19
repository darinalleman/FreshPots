//App Router
window.DefaultRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.App = options.App;
    },

    // This is the Route table. Define any URL : name of method that will handle the URL
    routes: {
        "": "home"
    },

    // Handler for home page.
    home: function () {
        this.loadApp();
    },

    // Initializes app view
    loadApp: function () {

        var potList = new PotList();
        this.App.reg('Collections', 'PotList', potList);

        var containerView = new ContainerView({ collection: potList });
        this.App.reg('Views', 'ContainerView', containerView);

        potList.fetch({ reset: true });
    }
});