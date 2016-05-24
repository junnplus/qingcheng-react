import React from 'react';
import Reflux from 'reflux';
import CafeCardList from './CafeCardList';
import CafesStore from '../stores/CafesStore';
import CafesActions from '../actions/CafesActions';
import FetchStore from '../stores/FetchStore';
import FollowingCafesStore from '../stores/FollowingCafesStore';
import Logo from './Logo';

var CafesPage = React.createClass({
  mixins: [
    Reflux.connect(CafesStore, "cafes"),
    Reflux.connect(FetchStore, "fetching"),
    Reflux.connect(FollowingCafesStore, "following")
  ],
  componentDidMount(){
    CafesActions.fetchCafes();
  },
  render() {
    return (
      <div className="body cafe-list">
        {
          ((obj) => {
            if ( obj.state.fetching ) {
              return <Logo clazz={ "loading center" } />;
            }
          })(this)
        }
        {
          ((obj) => {
            if ( obj.state.following.length ) {
              return (
                <div className="section container">
                  <h2 className="section-title">Following</h2>
                  <CafeCardList cafes={obj.state.following}/>
                </div>
              );
            }
          })(this)
        }
        <div className="section container">
          <h2 className="section-title">Cafes</h2>
          <CafeCardList cafes={this.state.cafes}/>
        </div>
      </div>
    );
  }
});

module.exports = CafesPage;
