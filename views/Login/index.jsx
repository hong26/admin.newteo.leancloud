import React from 'react'
import superagent from 'superagent'
import { Row,Col,Form, Input, Button, message } from 'antd'
import { SERVER_HOST, tabs} from '../../settings.js'
require('./style')

const FormItem = Form.Item

let Login = React.createClass({
  getInitialState(){
    return {
      token: null
    }
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    document.title = tabs.login
    this.setState({token:localStorage.getItem('token')})
    const token = localStorage.getItem('token')
    if(token!==null){
      superagent
      .get(SERVER_HOST+'/demands?token='+token)
      .end((err,response) => {
        const text = JSON.parse(response.text)
        if(!text.message && !err){
          this.context.router.replace('/admin')
        }else{
          this.setState({token: null})
          localStorage.removeItem('token')
        }
      }
      )
    }
  },

  handleSubmit(e) {
    e.preventDefault()
    const data=JSON.stringify(this.props.form.getFieldsValue())
    superagent
    .post(SERVER_HOST+'sessions')
    .set("content-type", "application/json")
    .send(data)
    .end((error,response) => {
      const text=JSON.parse(response.text)
      if(text.token){
        message.success('登陆成功')
        localStorage.setItem('token',text.token)
        this.context.router.replace('/admin')
      }else{
        message.error('账户名或密码错误,请重新输入!')
      }
    })
  },

  render() {
    const { getFieldProps } = this.props.form
    if(this.state.token == null){
      return (
        <div>
          <Row type='flex' justify='center' align='middle' gutter={16}   className='login'>
            <Col xs={16} lg={8} className='login-panel'>
              <Form onSubmit={this.handleSubmit}>
                <Col span={14} offset={5} className='table-cell-1'>Admin Beta2.1</Col>
                <FormItem
                  wrapperCol={{span:14, offset:5}}>
                  <Input placeholder='请输入账户名' {...getFieldProps("username")} className='table-cell-2'/>
                </FormItem>
                <FormItem
                  wrapperCol={{span:14, offset:5}}>
                  <Input type="password" placeholder='请输入密码' {...getFieldProps("password")} className='table-cell-3'/>
                </FormItem>
                <Col span={14} offset={5}>
                  <Button type="primary" htmlType="submit" className='table-cell-4' >登录</Button>
                </Col>
              </Form>
            </Col>
          </Row>
        </div>
      )
    }else{return <div></div>}
  }
})

Login = Form.create()(Login)
export default Login
