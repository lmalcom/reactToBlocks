(function(){
  var React = require('react'); 
  var Panel = React.createClass({ 
      render: function(){  
        var i = 0; 
        var children = 
        (this.props.children && this.props.children.length)?  this.props.children: 
        (this.props.children)?                                [this.props.children]: 
                                                              [];  
        return (
          <div className = "Panel">
            {
              (children.length > 0)?
                children.map(function(child){
                  return child; 
                }):
                children
            }
          </div>
        )
      }
    }); 
  module.exports = React.createFactory(Panel); 
})()
