import React ,{Component,Fragment}from 'react';

import "../index.scss"
import { MenuFoldOutlined } from "@ant-design/icons"
class Header extends Component{
  constructor(props){
    super(props)
    this.state={
      collapsed:props.collapsed
    }
  }
  componentWillReceiveProps({collapsed}){
    console.log(collapsed);
    this.setState({
      collapsed:collapsed
    })
  }
  toggleMenu =() =>{
    this.props.toggle();
  }
  render(){
    const { collapsed } =this.state;
    return(
      <Fragment>
        <div className={collapsed? "collapsed-close":"" }>
          <div className="logo-img">
            <span>logo</span>
          </div>
          <div className="header-wrap">
            <span className="collapsed-icon" onClick={this.toggleMenu}><MenuFoldOutlined /></span>
          </div>
       
        </div>
        
      </Fragment>
    )
  }
}


export default Header;