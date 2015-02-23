var express = require('express'); 
var React = require('react'); 
var sendBlock = require('./build/utils').sendBlock; 

var CommentBox = require('./build/CommentBox'); 
var CommentList = require('./build/CommentList'); 
var Panel = require('./build/Panel'); 

module.exports = function(app){ 
	app.get('/', function(req, res){ 
		res.sendFile(__dirname + '/index.html'); 
	}); 
	app.get('/test', function(req, res){
		/*res.send(createPage(res, 
			    	{children: [
			    		CommentBox(), 
			    		CommentList(),
			    		Panel({}, CommentList())
			    	]}
		    	)
		); */
		/*sendBlock(res,
	    	{children: [
	    		["CommentBox", {}], 
	    		["CommentList", {}], 
	    		["Panel", { 
    				children: [ 
    					["CommentList", {}] 
    				] 
    			}, 
    				["CommentForm", {}]] 
	    	]} 
    	); */
    	/*sendBlock(res,
	    	{children: [
	    		["CommentBox", {}], 
	    		["CommentList", {}], 
	    		["Panel", {}, 
	    			["CommentList", {}], 
	    			["CommentList", {}], 
	    			["CommentList", {}]]
	    	]} 
    	); */
    	sendBlock(res,
	    	{children: [
	    		["CommentBox", {
	    			html: {
	    				type: 'oeijfwj', 
	    				header:'oh hey here'
	    			},
	    			css: { 
	    				background:'red' 
	    			}, 
	    		}], 
	    		/*["CommentBox", {
	    			header: 'oh hey there', 
	    			background: 'red'
	    		}], 
	    		["CommentList", {}], 
	    		["Panel", {}, 
	    			["CommentList", {}], 
	    			["CommentList", {}], 
	    			["CommentList", {}]]*/
	    	]} 
    	);
	}); 
	app.use(express.static(__dirname)); 
} 