import * as React from 'react'
import './index.css'
import Card from '../../component/card/index'

const data = {
  startLeft: 0,
  startTop: 0,
  left: 0,
  top: 0,
  originLeft: 0,
  originTop: 0,
}
type myProp = {

}
type myState = {
  num: Number
}
export default class Slide extends React.Component<myProp, myState> {
  constructor(props: any) {
    super(props)
    this.state = {
      num:3
    }
    this.touchStart = this.touchStart.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  componentDidMount() {
    // 获取dom
    this.initCard()
    // 绑定点击事件
    this.bindTouch()
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
        <List num={this.state.num}></List>
      </div>
    );
  }
  touchStart(e: any): void {
    var curTouch = e.touches[0];
    if (data.top === 0 && data.left === 0) {
      data.top = ((document.getElementById('card-container')?.clientHeight || 1) / 2) || 0
      data.left = ((document.getElementById('card-container')?.clientWidth || 1) / 2) || 0
      // 保存最初的起点
      data.originLeft = data.left
      data.originTop = data.top
    }
    data.startLeft = curTouch.clientX - data.left;
    data.startTop = curTouch.clientY - data.top;
  }
  touchMove(e: any): void {
    var curTouch = e.touches[0];
    data.left = curTouch.clientX - data.startLeft;
    data.top = curTouch.clientY - data.startTop;
    curTouch.target.style.left = data.left + 'px'
    curTouch.target.style.top = data.top + 'px'
  }
  touchEnd(e: any): void {
    var curTouch = e.changedTouches[0];
    if (Math.abs(data.left - data.originLeft) < 60 && Math.abs(data.top - data.originTop) < 60) {
      data.left = data.originLeft
      data.top = data.originTop
      curTouch.target.style.left = data.left + 'px'
      curTouch.target.style.top = data.top + 'px'

    } else {
      this.setCard()
      data.left = 0
      data.top = 0
      // 设置动画
      // this.setAnima()
      // curTouch.target.classList.add('horizTranslate');
    }
  }
  // 删除顶部card，增加一张card
  setCard() {
    let child = document.getElementById('card-container')?.children as HTMLCollection
    this.setState({num: child.length + 2})
    console.log(this.state)
    // document.getElementById('card-container')?.appendChild(node1)
    document.getElementById('card-container')?.removeChild(child[0])
    this.initCard()
    this.bindTouch()
  }
  // 绑定触摸事件
  bindTouch(){
    // 获取所有卡片的父容器
    let card = document.getElementById('card-container')?.firstChild
    // 绑定事件
    // 1.ontouchStart
    card?.addEventListener("touchstart", this.touchStart)
    // 2.ontouchMove
    card?.addEventListener("touchmove", this.touchMove)
    // 3.ontouchCancel
    card?.addEventListener("touchend", this.touchEnd)
  }
  // 设置动画
  setAnima() {
    let child = document.getElementById('card-container')?.childNodes as NodeListOf<HTMLElement>
    for (var i = child.length-1; i >=0 ; i--) {
      child[i].classList.add('horizTranslate');
    }
  }
  // 初始化卡片
  initCard() {
    let child = document.getElementById('card-container')?.childNodes as NodeListOf<HTMLElement>
    for (var i = 0; i < child.length ; i++) {
      // 设置 zIndex
      child[i].style.zIndex = (10- i).toString()
      // 设置偏移量以及大小
      // child[i].style.transform = "scale("+ (1+0.1*i) +")"
      // child[i].style.top = parseInt(child[i].style.top)+ i*30 + 'px'
    }
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