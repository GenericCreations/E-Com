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
    this.state = {
      loggedIn:false
    }
  }

  render(){
    const logoutUserFunction = async () => { // logs out admin
      // needs to be async, probably
      this.props.t.logoutUser(this.props.t)
    }
    const loginUserFunction = async () => { // logs in admin
      // need to pass user here unless it will be anonymous user
      const user = null;
      this.props.t.loginUser(this.props.t,user)
    }
    const cartHasItems = this.props.t.state.cart?.productList.length >= 1
    return(
      <div className='navContainer'>
        { this.props.t.state.offset === '0' ? null : <div onClick={ () => this.props.t.shiftAnimation('none',this.props.t)} className='coverForOffset'></div>}
        <span>
          <img
            src={Menu}
            alt='menu'
            onClick={ () =>  this.props.t.shiftAnimation('menu',this.props.t) }
          />
        </span>
        <span className='navIntro'><h3>Welcome to buddies</h3></span>
        <span><img src={SearchIcon} alt='filter'/></span>
        { this.props.t.state.user  && this.props.t.state.user.name ?
            <span><img src={Profile} alt='logout' onClick={ () => logoutUserFunction()} /></span>
            :
            <span><img src={NoProfile} alt='login' onClick={ () => loginUserFunction()}/></span>}
        { this.props.t.state.cartEmpty ?
          <span>
            <img
              src={Cart}
              alt='Cart without items'
              onClick={ () =>  this.props.t.shiftAnimation('cart',this.props.t) }
            />
          </span>
          :
          <span>
            <img
              src={FullCart}
              alt='Cart with items'
              onClick={ () =>  this.props.t.shiftAnimation('cart',this.props.t) }
            />
          </span>
        }


      </div>
    )
  }
}
