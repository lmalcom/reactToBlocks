(function(){
	//start
		var pm = React.createElement(Panel, {}, CommentBox(), CommentList(), CommentBox()); 
      	console.log('\n\n page react object...', pm); 

    //render?
      React.render(pm, document.getElementById('content')); 
})()