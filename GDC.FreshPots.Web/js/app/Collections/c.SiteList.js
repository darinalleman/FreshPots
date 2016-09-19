var SiteList = Backbone.Collection.extend({
    model: Site,
    url: 'api/sitelist'
});