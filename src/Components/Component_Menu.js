import React, {Component} from 'react'

export default class Menu extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='menuContainer'>
        <ul>
          <li>Services</li>
          <li>Products</li>
          <li>About</li>
        </ul>
      </div>
    )
  }
}
