var Reflux = require('reflux');
var ShowOverlayActions = require('../actions/ShowOverlayActions');

var ShowOverlayStore = Reflux.createStore({
    listenables: ShowOverlayActions,
    getInitialState: function() {
        this.show = false;
        return this.show;
    },
    onShowLogin: function(show) {
        this.show = show; 
        this.trigger(this.show);
    },
    onShowNotifications: function(show) {
        console.log(show);
        this.show = show; 
        this.trigger(this.show);
    }
});

module.exports = ShowOverlayStore;
