import Reflux from 'reflux';
import MarkdownActions from '../actions/MarkdownActions';
import api from '../api';

var MarkdownStore = Reflux.createStore({
  listenables: MarkdownActions,
  getInitialState() {
    this.html = '';
    return this.html;
  },
  onPreview(content) {
    api.preview(content, (html) => {
      this.html = html;
      this.trigger(this.html);
    });
  }
});

export default MarkdownStore;
