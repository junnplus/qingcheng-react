var React = require('react');
var Webpage = require('./Webpage');
var LikeButton = require('./LikeButton');
var ShareButton = require('./ShareButton');
var UserAvatar = require('./UserAvatar');
var timeago = require('../filters').timeago;
var urlize = require('../filters').urlize;

var TopicHentry = React.createClass({
	topicStyle: function() {
		var cover = this.props.topic.info.cover;
		if (!cover) return null;
		return {'backgroundImage': 'url(' + cover + ')'};
	},
	cafeStyle: function() {
		var style = this.props.topic.cafes[0].style;
		var rv = {'backgroundColor': style.color || '#222221'};
		if (style.logo) {
		  rv.backgroundImage = 'url(' + style.logo + ')';
		}
		return rv;
	},
    render: function() {
		var topic = this.props.topic;
		var user = this.props.topic.user;
        var cafe = this.props.topic.cafes[0];
        var webpage;
        if (topic.webpage) {
            webpage = <Webpage webpage={ topic.webpage } />;
        }
        return (
			<div className="hentry">

				<div className="container">
					<h2 className="entry-title">{ topic.title }</h2>
					<div className="entry-meta">
						<a href={ "/c/" } aria-label={ "Published in " + cafe.name }>
							<span className="cafe-logo" style={ this.cafeStyle() }></span>
						</a>
						<time title={ "Updated at " + topic.updated_at }>{ timeago(topic.created_at) }</time>
						<a href={ "/u/" + user.username } aria-label={ "Published by " + user.username }>@{ user.username }</a>
					</div>
                    { webpage }
                    <div className="entry-content yue" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
                    <div className="entry-actions clearfix">
                        <LikeButton />
						<div className="more-actions">
                            <ShareButton />
							<span>
								<button className="button button--white tip" aria-label="Show edit options">
								<i className="qc-icon-quill"></i> </button> </span>
						</div>
                    </div>

					<div className="entry-footer clearfix">
						<div className="topic-cafe column">
                            <div className="column-title">Published In</div>
							<a href={ "/c/" } className="column-header">
								<span className="cafe-logo" style={ this.cafeStyle() }></span>
								<div className="column-main">
									<strong>{ cafe.name }</strong>
								</div>
							</a>
							<p>{ urlize(cafe.description) }</p>
						</div>

						<div className="topic-author column">
							<div className="column-title">Created By</div>
							<div className="column-header">
                                <UserAvatar user={user} />
								<a className="column-main" href={ "/u/" + user.username }>
								<strong>{ user.username }</strong>
								<div>#{ user.id }</div>
								</a>
							</div>
							<p>{ user.description }</p>
						</div>
					</div>
				</div>
			</div>
        );
    }
});

module.exports = TopicHentry;
