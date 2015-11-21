var Reflux = require('reflux');
var ShowLoginActions = require('../actions/ShowLoginActions');

var ShowLoginStore = Reflux.createStore({
    listenables: ShowLoginActions,
    getInitialState: function() {
        this.show = false;
        return this.show;
    },
    onShowLogin: function(show) {
        this.show = show; 
        this.trigger(this.show);
    }
});

module.exports = ShowLoginStore;
