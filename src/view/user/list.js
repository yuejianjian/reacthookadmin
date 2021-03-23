import React, {useState , useEffect } from 'react';

import { Breadcrumb, Menu } from 'antd';
import { Column } from '@ant-design/charts';
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
    
      var data = [
        {
            type: '家具家电',
            sales: 38
        },
        {
            type: '粮油副食',
            sales: 52
        },
        {
            type: '生鲜水果',
            sales: 61
        },
        {
            type: '美容洗护',
            sales: 145
        },
        {
            type: '母婴用品',
            sales: 48
        },
        {
            type: '进口食品',
            sales: 38
        },
        {
            type: '食品饮料',
            sales: 38
        },
        {
            type: '家庭清洁',
            sales: 38
        }
      ];
      var config = {
        data: data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        meta: {
            type: { alias: '类别' },
            sales: { alias: '销售额' }
        }
    };
    return(
      <div >
        {/* <Breadcrumb>
          <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Component</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item overlay={menu}>
            <a href="">General</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Button</Breadcrumb.Item>
        </Breadcrumb> */}
        <Column {...config} />
      </div>
    )
  }
}


export default User;