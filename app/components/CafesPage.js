var React = require('react');
var Reflux = require('reflux');
var CafeCardList = require('./CafeCardList');
var $ = require('jquery');
var CafesStore = require('../stores/CafesStore');
var CafesActions = require('../actions/CafesActions');
var FetchStore = require('../stores/FetchStore');
var Logo = require('./Logo');

var CafesPage = React.createClass({
    mixins: [
        Reflux.connect(CafesStore, "cafes"),
        Reflux.connect(FetchStore, "fetching")
    ],
	componentDidMount: function(){
        CafesActions.fetchCafes();
	},
    render: function() {
        var logo;
        if ( this.state.fetching ) {
            logo = <Logo clazz={ "loading center" } />;
        }
        return (
            <div className="body cafe-list">
                { logo }
				<div className="section container">
					  <h2 className="section-title">Cafes</h2>
                      <CafeCardList cafes={this.state.cafes}/>
				</div>
            </div>
        );
    }
});

module.exports = CafesPage;
