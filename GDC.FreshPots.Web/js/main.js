$(document).ready(function () {
    //Cache buster for IE7/8/9
    $.ajaxSetup({ cache: false });
    App.bootup();
});

var locationEnum = {
    UPPER: { id: 1, text: "Upper" },
    LOWERLEFT: { id: 2, text: "LowerLeft" },
    LOWERRIGHT: { id: 3, text: "LowerRight" }
};
var statusEnum = {
    EMPTY: 1,
    BREWED: 2,
    EXPIRED: 3
};

var site;



var App = (function () {
    // Internal obj to hold App definition until returned
    var _shim = {};

    // ###########################
    // ###  Public Properties  ###
    // ###########################

    // Scoped array to manage UI components
    _shim.UI = {
        Routers: {},
        Collections: {},
        Models: {},
        Views: {}
    };

    // Scoped array to manage Config components
    _shim.Config = {
        Paths: {}
    };

    // ###########################
    // ###   Public Functions  ###
    // ###########################

    // Initialize the application
    _shim.bootup = function () {
        initRouters();

        Backbone.history.start();
    };

    // Registers object into the scoped array
    _shim.reg = function (type, name, C) {
        _shim.UI[type][name] = C;
    };

    // Registers path into the scoped array
    _shim.registerPath = function (name, p) {
        _shim.Config.Paths[name] = p;
    };

    // Return cloned instance of a particular UI object
    _shim.inst = function (type, C, attrs) {
        return new _shim.UI[type][C](attrs || {});
    };

    // ###########################
    // ###  Private Functions  ###
    // ###########################

    

    // Initialize router
    function initRouters() {
        var r = new DefaultRouter({ App: _shim });
        _shim.reg('Routers', 'DefaultRouter', r);
    }

    return _shim;
} ());