(function(){
	var React = require('react'); 
	var CommentList = React.createClass({
	    render: function(){
	      return(<div className = "CommentList">Oh heyyyy this is a list!</div>)
	    }
	});
	module.exports = React.createFactory(CommentList); 
})()