//App Router
window.DefaultRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.App = options.App;

    },

    // This is the Route table. Define any URL : name of method that will handle the URL
    routes: {
        "": "home",
        ":site/:floor": "siteChosen"
    },

    // Handler for home page.
    home: function () {
        this.loadApp();
    },

    // Initializes app view
    loadApp: function () {
        $(".container").css('display', 'block');
        $(".st-container").css('display', 'none');
        $(".st-pusher").css('display', 'none');
        var siteList = new SiteList();
        var siteView = new SiteView({ collection: siteList });
        siteList.fetch({ reset: true });
    },
    siteChosen: function (site, floor) {
        $(".container").css('display', 'none');
        $(".st-container").css('display', 'block');
        $(".st-pusher").css('display', 'block');
        var FreshPotHubProxy = $.connection.FreshPotHub;
        $.connection.hub.start().done(function () {
            var resultSite;
            FreshPotHubProxy.server.FindSiteID(site, floor).done(function (siteID) {
                resultSite = siteID;
                FreshPotHubProxy.server.JoinSite(resultSite.toString());
                var potList = new PotList();
                potList.url = "api/potinformation/" + resultSite;
                potList.fetch({
                    reset: true,
                    error: function () { console.log(arguments); },
                    success: function () {
                        this.App.reg('Collections', 'PotList', potList);
                        var containerView = new ContainerView({ collection: potList });
                        this.App.reg('Views', 'ContainerView', containerView);
                        containerView.renderPots();
                    }
                });
                $.connection.hub.stop();
            })
        });
    }
});
