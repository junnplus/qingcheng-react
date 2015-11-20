var Reflux = require('reflux');
var FetchActions = require('../actions/FetchActions');
var $ = require('jquery');

var FetchStore = Reflux.createStore({
    init: function() {
        this.listenTo(FetchActions.fetching, this.onFetchComplete);
    },
    getInitialState: function() {
        this.fetching = true;
        return this.fetching;
    },
    onFetchComplete: function() {
        this.fetching = false;
        this.trigger(this.fetching);
    }
});

module.exports = FetchStore;
