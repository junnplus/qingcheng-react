var React = require('react');
var Reflux = require('reflux');
var CafeCardList = require('./CafeCardList');
var CafesStore = require('../stores/CafesStore');
var CafesActions = require('../actions/CafesActions');
var FetchStore = require('../stores/FetchStore');
var FollowingCafesStore = require('../stores/FollowingCafesStore');
var Logo = require('./Logo');

var CafesPage = React.createClass({
    mixins: [
        Reflux.connect(CafesStore, "cafes"),
        Reflux.connect(FetchStore, "fetching"),
        Reflux.connect(FollowingCafesStore, "following")
    ],
    componentDidMount: function(){
        CafesActions.fetchCafes();
    },
    render: function() {
        return (
            <div className="body cafe-list">
                { 
                    (function(obj){
                        if ( obj.state.fetching ) {
                            return <Logo clazz={ "loading center" } />;
                        }
                    }(this))
                }
                {
                    (function(obj){
                        if ( obj.state.following.length ) {
                            return (
                                <div className="section container">
                                      <h2 className="section-title">Following</h2>
                                      <CafeCardList cafes={obj.state.following}/>
                                </div>
                            );
                        }
                    }(this))
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
