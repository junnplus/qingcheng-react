import Reflux from 'reflux';
import CafeActions from '../actions/CafeActions';
import api from '../api';

var CafeStore = Reflux.createStore({
  listenables: CafeActions,
  getInitialState() {
    this.cafe = {};
    return this.cafe;
  },
  onLoad(slug, cb) {
    api.cafe.view(slug, (resp) => {
      this.cafe = resp;
      this.trigger(this.cafe);
      cb && cb();
    });
  },
});

export default CafeStore;
