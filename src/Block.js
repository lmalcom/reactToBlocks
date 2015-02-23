(function(){
	var _ = require('underscore'); 
	require('../deepExtend'); 
	var Component = require('./Component'); 
	var uuid = require('node-uuid').v1; 

	var Block = function(){ 
		var props = Array.prototype.slice(arguments);
		var block = this; 
			block.blockId = uuid(); 
			this.components = {}; 
		var settings = {},
			classProps, 
			className; 

		//if ("ClassName", settings [, children...])
		if(typeof props[0] == 'string'){
			className = props[0]; 
			settings = props[1]; 

			//load class and extend it with updated properties
			//THIS SHOULD BE AN EXTENDED VERSION OF THE CLASS JSON
			//classProps = createJSONFromLineage(JSON.parse(require(__dirname +'/' + props[0] + '.json'))); 
			classProps = JSON.parse(require(__dirname +'/block_components/' + className + '.json')); 
			
		}else{
			className = "block"; 
			settings = arguments[0]; 
			classProps = {}
		}
		var completeSettings = _.deepExtend(classProps, settings); 
		//var completeSettings = _.deepExtendWithSettings(classProps, settings); 
		/*
			at this point should only be...
			{
				html: {...}, 
				css: {...}
			}
		*/
		console.log('\n\n\n complete settings for block...', completeSettings); 
		this.initComponents(completeSettings); 
		
	}; 
	Block.prototype = {
		initComponents: function(settings){
			var block = this; 
			//initializes components with settings 
			_.each(settings, function(val, type){
				var klass = require(__dirname +'/' + type.toLowerCase() + '.js'); 
				console.log('\n\ncreating a  ' + type + ' component in block', val); 
				this[type] = new klass(val, block);
			}); 

			//setup done event 
			//this.trigger('done'); 

			return this;
		},
		addComponent: function(component){
			this.components.push(component); 
		}, 
		hasComponent: function(str){

		}
	}; 

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

	module.exports = Block; 
})()