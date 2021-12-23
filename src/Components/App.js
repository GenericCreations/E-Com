import React, { Component } from 'react'
import '../CSS/main.css'
import Products from '../Javascript/products_class'
import Users from '../Javascript/users_class'
import User from '../Javascript/user_class'
import Cart from '../Javascript/cart_class'
import ProductsComponent from './Products_Component'
import NavComponent from './Nav_Component'
import CheckoutComponent from './Checkout_Component'
import MenuComponent from './Menu_Component'
import ModifyProducts from './ModifyProducts_Component'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:null,
      users:null,
      products:null,
      cart:null,
      offset:'0',
      cartEmpty:true,
      mainPage:'products',
    }
  }
  componentDidMount(){
    const inventory = new Products()
    const users = new Users()
    const user = users.userList[0];
    this.loginUser(this,user)


    // const user = users.userList[0]
    // const cart = user.myCart
    this.setState({products:inventory, cart:users.userList[0].myCart, users, user:users.userList[0]})
  }
  shiftAnimation(dir,t){ // 'menu' or 'cart'
    let leftValue;
    const currLeftValue = t.state.offset
    switch (dir) {
      case 'menu':
      leftValue = '50%'
        break
      case 'cart':
      leftValue = '-70%'
        break
      case 'none':
      leftValue = '0'
        break
    }
    t.setState({offset:leftValue === currLeftValue ? '0' : leftValue})
  }
  toggleCartEmpty(appComponent,emptyisTrue){
    appComponent.setState({cartEmpty:emptyisTrue})
  }
  loginUser(appComponent,user){
    // anonymous user? check if stuff in cart ? consolidate : just bring in users saved cart :
    // just remove that cart as active cart and bring in new users
    // logs you in
    // sets your cart as the active cart
    let userToBeLoggedIn,cartEmpty

    if(user){
      userToBeLoggedIn = user
      cartEmpty = user.myCart.productList > 0 ? false : true
      console.log('logging in real user',userToBeLoggedIn);
    }
    else{
      userToBeLoggedIn = new User({type:'anonymous'}) // make this an actual anonymous user
      cartEmpty = true
      console.log('logging in anonymous user',userToBeLoggedIn);
    }

    appComponent.setState({
      user:userToBeLoggedIn,
      cart:userToBeLoggedIn?.myCart || new Cart(),
      cartEmpty
    })
  }
  logoutUser(appComponent){
    const anonymousUser = new User({type:'anonymous'})
    console.log('logging in anonymous user',anonymousUser);
    appComponent.setState({user:anonymousUser, cart:anonymousUser.myCart, cartEmpty:true})
  }
  render(){
    if(this.cart?.productList > 0 && this.state.cartEmpty === true) this.setState({cartEmpty:false})
    else if (this.cart?.productList <= 0 && this.state.cartEmpty === false) this.setState({cartEmpty:true})
    const mainPageSwitch = (mainPageState) => {
      const productsComponent = <ProductsComponent t={ this } />
      const modifyProductsComponent = <ModifyProducts t={ this } />
      let component;
      switch (mainPageState) {
        case 'products':
          component = productsComponent
          break;
        case 'modifyProducts':
          component = modifyProductsComponent
          break;
        default:
          component = productsComponent

      }
      return component
    }
    const checkoutComponent = <CheckoutComponent t={ this } />
    const navComponent = <NavComponent t={ this } />
    const menuComponent = <MenuComponent t={ this } />

    return (
      <div className='everythingContainer'>
        { this.state.offset === '0' ? <div></div> : this.state.offset !== '50%' ? <div></div> : menuComponent }
        {navComponent}
        <div>{mainPageSwitch(this.state.mainPage)}</div>
        { this.state.offset === '0' ? <div></div> : this.state.offset !== '-70%' ? <div></div> : checkoutComponent }
    </div>
    );
  }
}
