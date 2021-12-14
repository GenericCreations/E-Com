import React, { Component } from 'react'
import Cart from '../Icons/shoppingCart.png'
import FullCart from '../Icons/fullShoppingCart.png'
import NoProfile from '../Icons/noProfile.png'
import Profile from '../Icons/profile.png'
import Menu from '../Icons/menuIcon.png'
import SearchIcon from '../Icons/search.png'



export default class Nav extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='navContainer'>
        { this.props.offset === '0' ? null : <div onClick={ () => this.props.shiftFunc('none',this.props.t)} className='coverForOffset'></div>}
        <span>
          <img
            src={Menu}
            alt='menu'
            onClick={ () =>  this.props.shiftFunc('menu',this.props.t) }
          />
        </span>
        <span className='navIntro'><h3>Welcome to buddies</h3></span>
        <span><img src={SearchIcon} alt='filter'/></span>
        { this.props.t.state.user ? <span><img src={Profile} alt='logout'/></span> : <span><img src={NoProfile} alt='login'/></span>}
        { this.props.t.state.cart?.productList < 1 ? <span><img src={Cart} alt='Cart'/></span> : <span>
          <img
            src={FullCart}
            alt='Cart'
            onClick={ () =>  this.props.shiftFunc('cart',this.props.t) }
          />
        </span>}


      </div>
    )
  }
}
