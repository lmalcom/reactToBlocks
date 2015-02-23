(function(){ 
	var _ = require('underscore'); 
	var Component = function(type, props, parent){ 
		this.parent =  parent || null,
		this.props = {}; 
		 _.extend(this.props, props, {
			type: type || 'component'
		}); 
		//call init if provided...
		console.log('\n\n props from the component js init...', props); 
		this.init.apply(this, props, parent);
	}; 
	Component.prototype = { 
		//should only be able to get and set the properties 
		//that were listed as "settings.*"
		init: function(props, parent){
			console.log('component class init'); 
			return this; 
		},
		get: function(name){
			if(_.isString(name)){
				return this.props.name
			}else{
				return _.clone(this.props); 
			}
		}, 
		set: function(name){
			if(_.isString(name)){
				return this.props.name
			}else{
				return _.clone(this.props); 
			}
		}, 
		toJSON: function(options){
			return _.clone(this.get()); 
		}
	}; 
	/*
			EXTENDED from BACKBONE.JS extend function for extending all 
			backbone objects 
		*/
	Component.extend =  function(protoProps, staticProps) {
		    var parent = this, 
		    	child, 
		    	oldInit; 
		    

		    if (protoProps && _.has(protoProps, 'constructor')) { 
		      child = protoProps.constructor; 
		    } else { 
		      child = function(){ return parent.apply(this, arguments); };
		    } 
		    _.extend(child, parent, staticProps); 

		    var Surrogate = function(){ this.constructor = child; };
		    Surrogate.prototype = parent.prototype;
		    child.prototype = new Surrogate;

		    
		    /****
				Insert for blocks js 
				Call initialization functions from the
				object's family inheritance tree   
		    ****/
		    child.super = parent.prototype; //changed to "super" instead of "__super__"
		    if (protoProps) _.extend(child.prototype, protoProps, {
		    	init: function(){
		    		//call super init, then child init 
		    		if(_.isFunction(parent.prototype.init)){
		    			parent.prototype.init.apply(this, arguments); 
		    		}
		    		if(_.isFunction(protoProps.init)){
		    			protoProps.init.apply(this, arguments);
		    		} 
		    	}
		    });
		    /**********************************/

		    return child;
		}
	module.exports = Component; 
})() 