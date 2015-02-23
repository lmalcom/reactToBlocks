(function(){
	var Component = require(__dirname +'/' +'Component'); 
	//console.log('\n\n\n reading component', Component); 
	var HTMLComponent = Component.extend({ 
		Domnode: 'oh heeeye', 
		init: function(props, parent){
			console.log('html init....', props); 
		}
	}); 

	module.exports = HTMLComponent; 
})() 