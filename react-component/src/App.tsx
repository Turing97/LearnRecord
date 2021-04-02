import React from 'react';
import './App.css';
import Slide from './component/slide/index'


class App extends React.Component {
  // rem适配 页面使用rem 文字使用em
  adaptiveScreen() {
    // 获取 html 元素
    let html = document.documentElement;
    // 定义窗口的宽度
    let clientW = html.clientWidth;
    // html 的fontsize 大小
    let htmlRem = clientW * 100 / 375;
    html.style.fontSize = htmlRem + 'px';
    // 重置body的font-size
    document.body.style.fontSize = "16px"
  }
  componentDidMount () {
    this.adaptiveScreen()
  }
  render(){
    return (
      <Slide></Slide>
    )
  }
}

export default App;
