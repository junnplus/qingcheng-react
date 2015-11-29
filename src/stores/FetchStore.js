var Reflux = require('reflux');
var FetchActions = require('../actions/FetchActions');

var FetchStore = Reflux.createStore({
    listenables: FetchActions,
    getInitialState: function() {
        this.fetching = true;
        return this.fetching;
    },
    onFetching: function(fetching) {
        this.fetching = fetching;
        this.trigger(this.fetching);
    },
});

module.exports = FetchStore;
