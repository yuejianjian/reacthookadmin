import React ,{Component,Fragment}from 'react';
import {withRouter} from 'react-router-dom'
import { Menu ,Avatar, Dropdown,Button,message } from 'antd'
import "../index.scss"
import { MenuFoldOutlined,DownOutlined } from "@ant-design/icons"
import userimage from "../../../image/timg.jpg"
class Header extends Component{
  constructor(props){
    super(props)
    this.state={
      collapsed:props.collapsed
    }
  }
  handleMenuClick = (item) => {
    console.log(item);
    const { key } = item
    if (key === 'logout') {
      this.props.history.push("/")
    }else{
      message.success('正在开发中!')
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
    const userDropdownMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="basic-info">基本资料</Menu.Item>
        <Menu.Item key="modify-password">修改密码</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">退出</Menu.Item>
      </Menu>
    )
    return(
      <Fragment>
        <div className={collapsed? "collapsed-close":"" }>
          <div className="logo-img">
            <span>logo</span>
          </div>
          <div className="header-wrap">
            <span className="collapsed-icon" onClick={this.toggleMenu}><MenuFoldOutlined /></span>
          </div>

          <div className='header-right'>
            <div className="info mr-20">
              <Avatar src={userimage} />
              <Dropdown overlay={userDropdownMenu}
                trigger="['click']"
                getPopupContainer={() => document.getElementsByClassName('info')[0]}>
                <Button type="link" className='btn-user'>
                  德善<DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

        </div>
        
      </Fragment>
    )
  }
}


export default withRouter(Header);