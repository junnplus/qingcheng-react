var Reflux = require('reflux');
var CafeActions = require('../actions/CafeActions');
var api = require('../api');

var CafeStore = Reflux.createStore({
    listenables: CafeActions,
	getInitialState: function() {
        this.cafe = {};
        return this.cafe;
	},
    onLoad: function(slug, cb) {
		api.cafe.view(slug, function(resp) {
			this.cafe = resp;
            this.trigger(this.cafe);
            cb && cb();
		}.bind(this));
    },
});

module.exports = CafeStore;
