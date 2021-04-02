import * as React from 'react'
import './index.css'
import Card from '../../component/card/index'



export default class Slide extends React.Component {
  componentDidMount() {
    // 获取dom
    let child =  document.getElementById('card-container')?.childNodes as NodeListOf<HTMLElement>
    for (var i = 0; i < child.length; i++) {
      // 设置 zIndex
      child[i].style.zIndex = (i+1).toString()
      // 设置偏移量以及大小
      // child[i].style.height = (child[i].clientHeight - (i)).toString() + 'px'
      child[i].style.top = child[i].getBoundingClientRect().top - i * 10 + 'px'
    }
  }
  render() {
    return (
      <div id='card-container' className='card-container'>
        <List num={3}></List>
      </div>
    );
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