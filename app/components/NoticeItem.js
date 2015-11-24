var React = require('react');

var NoticeItem = React.createClass({
    render: function() {
		var notice = this.props.notice;
        return (
			<div className="item-container">
			  	<UserAvatar user={ notice.sender} />
			  	<div className="item-content">
					<div className="item-info">{ notice.category|message }</div>
					<a className="topic-title" href="/t/${notice.topic.id}">{ notice.topic.title }</a>
			  	</div>
			</div>
        );
    }
});

module.exports = NoticeItem;
