var React = require('react');
var Webpage = require('./Webpage');
var LikeButton = require('./LikeButton');
var ShareButton = require('./ShareButton');
var UserAvatar = require('./UserAvatar');
var timeago = require('../filters').timeago;

var TopicHentry = React.createClass({
    render: function() {
		var topic = this.props.topic;
		var user = this.props.topic.user;
        var cafe = this.props.topic.cafes;
        var webpage;
        if (topic.webpage) {
            webpage = <Webpage webpage={ topic.webpage } />;
        }
        return (
			<div className="hentry">
				<div className="container">
					<h2 className="entry-title">{ topic.title }</h2>
					<div className="entry-meta">
						<a href={ "/c/" } aria-label={ "Published in " }>
							<span className="cafe-logo" style={{"background-color":"#222221"}}></span>
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
								<span className="cafe-logo"></span>
								<div className="column-main">
									<strong></strong>
								</div>
							</a>
							<p></p>
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
