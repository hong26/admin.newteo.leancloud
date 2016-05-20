import React from 'react'
import {Row, Col} from 'antd'
require('./style.sass')

let Navbar = React.createClass({
  componentDidMount(){
    console.log('test')
    this.props.verification(localStorage.getItem('token'))
  },

  render(){
    return (
      <Row type='flex' align='middle' className='head'>
        <Col span={24} ><img src='../../materials/card.png'/></Col>
      </Row>
    )
  }
})

export default Navbar
