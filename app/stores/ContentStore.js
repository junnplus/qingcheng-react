var Reflux = require('reflux');
var ContentActions = require('../actions/ContentActions');
var api = require('../api');

var ContentStore = Reflux.createStore({
    listenables: ContentActions,
	getInitialState: function() {
        this.content = '';
        return this.content;
    },
    onSync: function(content) {
        this.content = content;
    },
    onUploadImage: function(file, cb) {
        var stamp = Date.now().toString(36);
        var mark = '[uploading image ' + stamp + ' ...]';
        this.content += '\n' + mark + '\n';
        this.trigger(this.content);
        api.upload(file, null, function(resp) {
            this.content = this.content.replace(mark, '![image](' + resp.value + ')');
            this.trigger(this.content);
        }.bind(this));
    }
});

module.exports = ContentStore;
