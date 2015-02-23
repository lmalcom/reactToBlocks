(function(){ 
	var React = require('react'); 
	var CommentList = require('./CommentList'); 
	var CommentForm = require('./CommentForm'); 
	var CommentBox = React.createClass({
    render: function(){
      return(
        <div className= "commentbox">
          <CommentList/>
          <CommentForm/>
        </div>
      )
    }
  });
  module.exports = React.createFactory(CommentBox); 
})()