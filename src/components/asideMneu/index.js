import React, {Component, Fragment} from 'react';

import { Link,withRouter } from 'react-router-dom'
import {  Menu } from 'antd';
import "../../view/index/index.scss"
import {
    MailOutlined,
  } from '@ant-design/icons'
import Router from '../../routes/index'
const { SubMenu } = Menu

class AsideMneu extends Component{
  constructor(props){
    super(props)
    console.log(Router)
    this.state={
      msg:'左侧导航',
      selectedKeys:[],
      openKeys:[],
      collapsed:props.collapsed
    }
  }
  componentDidMount(){
    console.log(this.props);
    const pathname = this.props.location.pathname;
    const menuKey =pathname.split("/").slice(0,3).join("/");

    const menuHigh ={
      selectedKeys:pathname,
      openKeys:menuKey
    }
    this.selectMenuHigh(menuHigh);
  }
  //打开菜单关闭菜单
  openChangeMenu=(key)=>{
    console.log(key)
    this.setState({
      openKeys:[key[key.length-1]]
    })
  }
  //选择菜单
  selectMenu =({ item, key, keyPath, domEvent}) =>{
    console.log(key)
    console.log(keyPath)
    const menuHigh ={
      selectedKeys:key,
      openKeys:keyPath[keyPath.length-1]
    }
    this.selectMenuHigh(menuHigh);

  }
  // 菜单高光封装
  selectMenuHigh=({selectedKeys,openKeys})=>{
    this.setState({
      selectedKeys:[selectedKeys],
      openKeys:[openKeys]
    })
  }
  //无子级菜单处理
  renderMenu=({title ,key}) =>{
    return (
    <Menu.Item key={key}>
      <Link to={key}><span>{title}</span></Link>
    </Menu.Item>
    )
  }
  //子级菜单处理
  renderSubMenu =({title ,key ,child}) =>{
    return(
        <SubMenu key={key} icon={<MailOutlined />} title={title}>
            {   
                child&&child.map(item =>{
                    return item.child &&item.child.length>0?this.renderSubMenu(item) : this.renderMenu(item);
                })
            }
            
        </SubMenu>   
    )
  }
  render(){
    const {selectedKeys,openKeys,collapsed} = this.state
    return(
      <Fragment>
          <Menu
          onOpenChange ={this.openChangeMenu}
          onClick ={this.selectMenu}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          theme="dark"
         
        >


            {
                Router &&Router.map(firstItem =>{
                    return firstItem.child&&firstItem.child.length>0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem);
                })
            }
            {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </SubMenu> */}
        </Menu>
      </Fragment>
    )
  }
}


export default withRouter(AsideMneu);