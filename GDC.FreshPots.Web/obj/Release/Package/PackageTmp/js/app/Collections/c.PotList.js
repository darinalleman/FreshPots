var PotList = Backbone.Collection.extend({
    model: Pot,
    url: 'api/potinformation'
});