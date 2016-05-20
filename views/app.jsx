import React from 'react'
// import {Button} from 'antd'
// import moment from 'moment'
import superagent from 'superagent'
import { SERVER_HOST, tabs} from '../settings.js'
import Navbar from './Navbar'
// const Moment=moment.locale('zh-cn')

module.exports = React.createClass({
  getInitialState(){
    return {
      check: false
    }
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount(){
    const token = localStorage.getItem('token')
    this.verification(token)
    document.title = tabs.home
  },

  verification(token){
    if(token !== null){
      superagent
      .get(SERVER_HOST+'/demands?token='+token)
      .end((err,response) => {
        const text = JSON.parse(response.text)
        if(text.message || err){
          localStorage.removeItem('token')
          this.context.router.replace('/')
        }else{
          this.setState({check: true})
        }
      }
      )
    }else{
      this.context.router.replace('/')
    }
  },

  render() {
    if(this.state.check == true){
      return (
        <div>
          <Navbar verification={this.verification}/>
          {this.props.children}
        </div>
      )
    }else{
      return <div></div>
    }
  }
})
