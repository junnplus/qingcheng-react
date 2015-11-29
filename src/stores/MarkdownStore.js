var Reflux = require('reflux');
var MarkdownActions = require('../actions/MarkdownActions');
var api = require('../api');

var MarkdownStore = Reflux.createStore({
    listenables: MarkdownActions,
    getInitialState: function() {
        this.html = '';
        return this.html;
    },
    onPreview: function(content) {
        api.preview(content, function(html) {
          	this.html = html;
            this.trigger(this.html);
        }.bind(this));
    }
});

module.exports = MarkdownStore;
