(function(){
	var React = require('react'); 
	var CommentForm = React.createClass({
		componentDidMount: function(){
			//insert events here?....wack 
		},
    	render: function(){
	      return(<div>This is a Comment Form :D </div>); 
	    }
	}); 
  	module.exports = React.createFactory(CommentForm); 
})()