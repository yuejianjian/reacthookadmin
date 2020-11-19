import React from 'react';

import { Form, Input,InputNumber, Button, message, Radio } from 'antd';
import {DepartmentAddApi} from "../../api/account"
import { getToken,getuserName } from "../../utils/cookies"
class AddUser extends React.Component{
  constructor(props){
    super(props)
    this.state={
        formLayout:{
          labelCol:{ span:2 },
          wrapperCol:{ span:22 }
        },
        loading:false,
    }
  }
  onSubmit=(value) =>{
    this.setState({
      loading:true,
    })
      DepartmentAddApi(value).then(res =>{
          message.success(res.data.message);
          console.log(res);
          this.setState({
            loading:false,
          })
          this.refs.form.resetFields();
      }).catch(err =>{
        message.error(err.message);
          console.log(err);
      })
  }
  render(){
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
          <Form.Item 
          label="部门名称"
          name="name"
          rules={[{ required: true, message: '部门名称不能为空!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="人员数量" name="number">
            <InputNumber min={0} max={100}  />
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
            <Button htmlType="submit" type="primary" loading={this.state.loading}>确定</Button>
          </Form.Item>
        </Form>
       
      </div>
    )
  }
}


export default AddUser;