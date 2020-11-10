import React from 'react';

import "../index.scss"
class Header extends React.Component{
  constructor(props){
    super(props)
    this.state={
      msg:'顶部导航'
    }
  }
  
  render(){
    return(
      <div id="app">
        <div className="logo-img">
           <span>logo</span>
        </div>
        <p>{this.state.msg}</p>
       
      </div>
    )
  }
}


export default Header;