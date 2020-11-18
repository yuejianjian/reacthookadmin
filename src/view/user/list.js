import React from 'react';

import { Breadcrumb, Menu } from 'antd';
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        General
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Layout
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    </Menu.Item>
  </Menu>
);
class User extends React.Component{
  constructor(props){
    super(props)
    this.state={
      msg:'内容怒放'
    }
  }
  
  render(){
    return(
      <div >
        <Breadcrumb>
          <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Component</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item overlay={menu}>
            <a href="">General</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Button</Breadcrumb.Item>
        </Breadcrumb>
       
      </div>
    )
  }
}


export default User;