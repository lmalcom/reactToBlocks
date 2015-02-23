/*(function(){
	var React = require('react'); 
	var Navbar = React.createClass({
		render: function(){}
	}); 
	module.exports = React.createFactory(Navbar); 
})()*/

(function(){
	var HTML = require(__dirname +'/' +'html'); 
	//console.log('\n\n\n reading component', Component); 
	var Text = HTML.extend({ 
		text: 'nomnomnomomno', 
		init: function(props, parent){
			console.log('its a text block!');  
		}
	}); 

	module.exports = Text; 
})() 