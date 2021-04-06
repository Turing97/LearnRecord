import * as React from 'react'
import './index.css'
import Card from '../../component/card/index'

const data = {
  startLeft: 0,
  startTop: 0,
  left: 0,
  top: 0
}

export default class Slide extends React.Component {
  constructor(props: any) {

    super(props)

    this.touchStart = this.touchStart.bind(this);
  }

  componentDidMount() {
    // 获取dom
    let child = document.getElementById('card-container')?.childNodes as NodeListOf<HTMLElement>
    for (var i = 0; i < child.length; i++) {
      // 设置 zIndex
      child[i].style.zIndex = (i + 1).toString()
      // 设置偏移量以及大小
      child[i].style.top = child[i].getBoundingClientRect().top - i * 10 + 'px'
    }
    // 获取所有卡片的父容器
    let card = document.getElementById('card-container')?.lastChild
    // 绑定事件
    // 1.ontouchStart
    card?.addEventListener("touchstart", this.touchStart)
    // 1.ontouchStart
    card?.addEventListener("touchmove", this.touchMove)
  }
  componentWillUnmount() {
    // 注销绑定事件
    // 1.ontouchStart
    // card?.removeEventListener("touchstart", this.touchStart)
    // // 1.ontouchStart
    // card?.removeEventListener("touchmove", this.touchMove)
  }
  // @touchstart="touchStart" @touchmove="touchMove" @touchcancel="touchCancel" @touchend="touchCancel"
  render() {
    return (
      <div id='card-container' className='card-container'>
        <List num={3}></List>
      </div>
    );
  }
  touchStart(e: any): void {
    // console.log(11111111111111)
    // console.log(e)
    // if(this.isAnimating)return;

    // this.isDrag=true;
    // this.needBack=false;
    // this.isThrow=false;
    var curTouch = e.touches[0];
    if(data.top === 0 || data.left === 0) {
      data.top = parseInt(curTouch.target.style.top)
      data.left = ((document.getElementById('card-container')?.clientWidth || 1) / 2) || 0
    }
    data.startLeft = curTouch.clientX - data.left;
    data.startTop = curTouch.clientY - data.top;

    // this.onDragStart();
  }
  touchMove(e: any): void {
    var curTouch = e.touches[0];
    data.left = curTouch.clientX - data.startLeft;
    data.top = curTouch.clientY - data.startTop;
    console.log(data)
    curTouch.target.style.left = data.left + 'px'
    curTouch.target.style.top = data.top + 'px'
  }
  touchCancel(e: any): void {
    // if 
    console.log('')
  }
}

function List(prop: any): any {
  let list = []
  for (let i = 0; i < prop.num; i++) {
    list.push(i)
  }
  const lis = list.map((item) => <Card key={item} ></Card>)
  return lis
}