(function(){
	var Component = require(__dirname +'/' +'Component'); 
	//console.log('\n\n\n reading component', Component); 
	var ChildrenComponent = Component.extend({ 
		init: function(props, parent){
			console.log('Children component init....', arguments); 
		}
	}); 

	module.exports = ChildrenComponent; 
})() 