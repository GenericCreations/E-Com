import React, { Component } from 'react'
import '../CSS/main.css'
import Products from '../Javascript/class_products'
import Users from '../Javascript/class_users'
import Cart from '../Javascript/class_cart'
import ComponentProducts from './Component_Products'
import ComponentNav from './Component_Nav'
import ComponentCheckout from './Component_Checkout'
import ComponentMenu from './Component_Menu'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:null,
      products:null,
      cart:null,
      offset:'0'
    }
  }
  componentDidMount(){
    let cart, inventory
    cart = new Cart('anonymousUser');
    inventory = new Products()
    cart.addItemToCart(inventory.productList[0],2) // temp
    cart.addItemToCart(inventory.productList[1],3)

    this.setState({products:inventory, cart})
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
  login(){

  }
  logout(){

  }
  render(){
    return (
      <div className='everythingContainer'>
        { this.state.offset === '0' ? <div></div> : this.state.offset !== '50%' ? <div></div> : <ComponentMenu/> }
        <ComponentNav s={this.state} shiftFunc={ this.shiftAnimation } t={ this } offset={this.state.offset} />
        <ComponentProducts prods={ this.state.products } t={ this } shiftFunc={ this.shiftAnimation } offset={this.state.offset}/>
        { this.state.offset === '0' ? <div></div> : this.state.offset !== '-70%' ? <div></div> : <ComponentCheckout t={ this }/> }
    </div>
    );
  }
}
