(function(){
	var React = require('react'); 
	var Page = require('./Page'); 
	var Block = require('./Block'); 


	//creates the text for a page object 
	var sendBlock = function(res, props){
		var text = ''; 
		if(props && props.children){
			props.children = renderReactFromJSON(props.children); 
		}

		//create block and save 
		//var block = new Block("page" ,props); 
		var b = new Block({
			Text: {}
		}); 
		text = React.renderToString(Page(props)); 
		res.send('<!DOCTYPE html>' + text); 
	}


	//renderReactFromJSON 
	/* 
		[...children] 
	*/ 
	//1. if just an object leave it as is 
	//2. if array, check if it is a prop or list 
	//3. if prop, create object and return 
	//4. if list, create all objects in list and return 
	var renderReactFromJSON = function(json){ 
		//Start with array of children or properties for an individual child
		if(Array.isArray(json)){ 

			//if first argument is string, then we are defining a child/children
			if(typeof json[0] == 'string'){
				return loadAndRenderChild(json); 

			//else we have an array of children
			}else{ 
				var ret = []; 
				json.forEach(function(child){
					ret = ret.concat(renderReactFromJSON(child)); 
				}); 
				return ret; 
			}
		}else{
			//leave object as is
			return json; 
		}
	}


	//accept properties for a child/children and render it/them
	var loadAndRenderChild = function(json){
		var name = json.shift(), 
			props = json.shift(),
			children = json, 
			klass = require(__dirname +'/' + name + '.js'); 

		//return array of children or one child
		if(Array.isArray(props)){
			return props.map(function(childProps){
				return createReactChild(klass, childProps, children); 
			}); 
		}else{
			return createReactChild(klass, props, children);
		}
	}

	//we need a function here because we have to make sure that we use 'apply' 
	//to transform the array to a comma separated list 
	var createReactChild = function(klass, props, children){
		if(!klass) return; 

		//transform children to react
		children = renderReactFromJSON(children); 
		if(props && props.children) props.children = renderReactFromJSON(props.children); 
		
		//return instantiated child
		var childJSON = [props].concat(children); 
		return klass.apply({}, childJSON);  
	}


	module.exports = 
	{
		sendBlock: sendBlock, 
		loadAndRenderChild: loadAndRenderChild, 
		renderReactFromJSON: renderReactFromJSON
	}
})()
