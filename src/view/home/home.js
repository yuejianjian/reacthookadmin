import React from 'react';
import { Input , Row, Col ,Button,Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  store from '../../store/index'

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
      msg:'内容怒放'
    }
    store.dispatch(action);
    this.setState({
      value:value
    })
    console.log(this.state.dataSource);
  }
  render(){
    const columns= [
      {
        title: '未完成的事',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align:"center",
        key: 'name',
        render:(text,rowData,index)=>{
          return (
            <div key={index}>
              <Button type="primary"  style={{marginRight:'10px'}} onClick={() => this.finishList(rowData,index)}>
                完成
              </Button>
              <Button type="default" onClick={() => this.DeleteList(rowData,index)}>删除</Button>
            </div>
          )
        }
      },
      
    ]
    const columnstwo= [
      {
        title: '已完成的事',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align:"center",
        key: 'operation',
        render:(text,rowData,index)=>{
          return (
            <div key={index}>
              <Button type="default" onClick={() => this.DeleteListTwo(rowData,index)}>删除</Button>
            </div>
          )
        }
      },
    ]
    return(
      <div >
         <Row>
            <Col span={18}>
              <Input placeholder="想做点什么" value={this.state.value} onChange={this.onChange} prefix={<PlusOutlined style={{color:'#BFBFBF'}} />}/>
            </Col>
            <Col span={2} offset={2}>
              <Button type="primary" onClick={()=>this.handleBtnCLick()}>新增</Button>
            </Col>
          </Row>
      
          <Table
            rowKey="name"
            dataSource={this.state.list}
            columns={columns}
            style={{marginTop:'20px'}}
            pagination={ false }
            bordered
          />
          <Table
            dataSource={this.state.dolist}
            columns={columnstwo}
            style={{marginTop:'20px'}}
            pagination={ false }
            bordered
          />
      </div>
    )
  }
}


export default Home;