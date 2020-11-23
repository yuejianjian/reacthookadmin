import React from 'react';

import { Form, Input,InputNumber, Button, message, Radio,Select } from 'antd';
import {PositionAddApi,PositionDetailsApi,PositionEditApi,GetDepartmentList} from "../../api/account"
const { Option } = Select;

class PositionAdd extends React.Component{
  constructor(props){
    super(props)
    this.state={
        formLayout:{
          labelCol:{ span:2 },
          wrapperCol:{ span:22 }
        },
        id:null,
        loading:false,
        departmentList:[],
    }
  }

  componentDidMount(){
    console.log(this.props.location.state);
     if(this.props.location.state){
      this.setState({
        id:this.props.location.state.id
      })
      this.getPositionDetails(this.props.location.state.id)
    }
    this.getDepartmentList();
  }
  getDepartmentList=()=>{
    const params={
        pageNumber:1,
        pageSize:20
    }
    GetDepartmentList(params).then(res =>{
        if(res.data.data.data){
          this.setState({
            departmentList:res.data.data.data,
          })
        }
    }).catch(err =>{
      message.error(err.message);
      console.log(err);
    })
  }
  //获取部门详情
  getPositionDetails=(id)=>{
    PositionDetailsApi({id:id}).then(res =>{
      const data = res.data.data;
      this.refs.form.setFieldsValue	({
        parentId:data.parentId,
        jobName: data.jobName,
        status:data.status,
        content:data.content,

      });
  }).catch(err =>{
      this.setState({
        loading:false,
      })
      message.error(err.message);
      console.log(err);
  })
  }
  onSubmit=(value) =>{
      console.log(value);
    this.setState({
      loading:true,
    })
    this.state.id==null?this.addPositionList(value):this.editPositionList(value)
  }
  //提交
  addPositionList=(value)=>{
    console.log(value)
    PositionAddApi(value).then(res =>{
        message.success(res.data.message);
        console.log(res);
        this.setState({
          loading:false,
        })
        this.refs.form.resetFields();
    }).catch(err =>{
        this.setState({
          loading:false,
        })
        message.error(err.message);
        console.log(err);
    })
  }
  //修改
  editPositionList=(value)=>{
    console.log(value)
    value.id =this.state.id
    PositionEditApi(value).then(res =>{
        message.success(res.data.message);
        console.log(res);
        this.setState({
          loading:false,
        })
        this.refs.form.resetFields();
    }).catch(err =>{
        this.setState({
          loading:false,
        })
        message.error(err.message);
        console.log(err);
    })
  }
  render(){
      const { departmentList } =this.state
    return(
      <div >
        <Form 
        ref="form"
        onFinish={this.onSubmit} 
        labelCol={this.state.formLayout.labelCol} 
        wrapperCol={this.state.formLayout.wrapperCol}
        initialValues={{
          number: 1,
          status:true
        }}
        >
          <Form.Item label="选择部门" name="parentId">
            <Select  placeholder="选择部门" style={{ width: 120 }}>
                {
                    departmentList.map((item,index) =>{
                        return <Option value={item.id} key={index}>{item.name}</Option>
                    })
                }
            </Select>
          </Form.Item>
          <Form.Item 
          label="职位名称"
          name="jobName"
          rules={[{ required: true, message: '职位名称不能为空!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item label="禁启用" name="status">
            <Radio.Group  >
              <Radio value={false}>禁用</Radio>
              <Radio value={true}>启用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item 
          label="描述" 
          name="content"
          rules={[{ required: true, message: '描述不能为空!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={this.state.loading}>{this.state.id?"修改":"确定"}</Button>
          </Form.Item>
        </Form>
       
      </div>
    )
  }
}


export default PositionAdd;