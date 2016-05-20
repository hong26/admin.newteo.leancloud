import React from 'react'
import {Button} from 'antd'
import QueueAnim from 'rc-queue-anim'
import moment from 'moment'
const Moment=moment.locale('zh-cn')

module.exports = React.createClass({
  getInitialState(){
    return {
      time: moment().format('LTS')
    }
  },
  componentDidMount(){
    setInterval(()=>{this.setState({time:moment().format('LTS')})},1000)
  },
  render() {
    return (
      <QueueAnim delay={500} >
        <p key='dome1'>moment前面时间到后面时间:{moment("20130517","YYYYMMDD").fromNow()}</p>
        <p key='dome2'>moment前面时间到后面时间:{moment("2016-05-17T05:06:07",moment.ISO_8601).fromNow()}</p>
        <p key='dome3' style={{backgroundColor:'blue',color:'red'}}>{this.state.time}</p>
        <p key='dome4'>以当天零时开始计算到现在的小时数:{moment().startOf('day').fromNow()}</p>
        <p key='dome5'>以moment里面的日期开始计算到现在的天数:{moment('20160516').startOf('day').fromNow()}</p>
        <p key='dome6'>以moment里面的日期结束计算到现在的天数:{moment('20160516').endOf('day').fromNow()}</p>
        <Button type="primary" key='dome7'>1111</Button>
        </QueueAnim>
    )
  }
})
