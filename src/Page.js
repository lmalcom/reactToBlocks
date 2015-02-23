(function(){
	var React = require('react'),
		Panel = require('./Panel'),
		Page = React.createClass({
			getDefaultProps: function() {
			    return {
			      title: 'Reactage!!!'
			    };
			},
		  	render: function(){
		  		var i = 0; 
		  		var children = 
			      	(this.props.children && this.props.children.length)?  	this.props.children: 
			      	(this.props.children)?                                	[this.props.children]: 
			                                                           		[];  

		  		return (
		  			<html>
						<head>
						  	<title>{this.props.title}</title>
						  	<script src="build/react.js"></script>
						  	<script src="build/JSXTransformer.js"></script>
						    <script src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
						    
						</head> 
						<body>
						    {
					            children.map(function(child){
					           		child.props.key = i++; 
					            	return child; 
					            })
		  					}
						</body>
					</html>
		  		)
		  	}
		}); 

	module.exports = React.createFactory(Page); 
})()
