import Reflux from 'reflux';
import ContentActions from '../actions/ContentActions';
import api from '../api';

var ContentStore = Reflux.createStore({
  listenables: ContentActions,
  getInitialState() {
    this.content = '';
    return this.content;
  },
  onSync(content) {
    this.content = content;
  },
  onUploadImage(file, cb) {
    var stamp = Date.now().toString(36);
    var mark = '[uploading image ' + stamp + ' ...]';
    this.content += '\n' + mark + '\n';
    this.trigger(this.content);
    api.upload(file, null, (resp) => {
      this.content = this.content.replace(mark, '![image](' + resp.value + ')');
      this.trigger(this.content);
    });
  }
});

export default ContentStore;
