import React, {Component} from 'react'
const commaNumber = require('comma-number')

 // "1,000"

export default class Checkout extends Component{
  constructor(props){ // props.t available
    super(props)
    this.state = {
      page:0,
      cartTotal:0,
      cart:this.props.t.state.cart
    }
  }
  modifyItemQuantity(e,item){

    const val = e.target.value
    let newQuantity = Number(val), newCartTotal
    const zeroQuantityDelay = 3000

    if(val === '') return

    else if(newQuantity <= 0){
      if(newQuantity < 0){
        e.target.value = 0
        newQuantity = 0
      }
      // newQuantity can/will only be zero ( 0 )!!

      setTimeout(() => { // takes this product out of cart and rerenders
        this.state.cart.changeQuantity(item.id,newQuantity)
        newCartTotal = this.state.cart.findCartTotal()
        this.props.t.toggleCartEmpty(this.props.t,true)
        this.setState({cartTotal:newCartTotal})
      },1500)
    }
    else{
      this.state.cart.changeQuantity(item.id,newQuantity)
      newCartTotal = this.state.cart.findCartTotal()
      this.setState({cartTotal:newCartTotal})
    }

  }
  componentDidMount(){
    const list = this.state.cart?.productList
    const cartTotal = list?.length >= 1 ? this.state.cart.findCartTotal() : 0
    this.setState({cartTotal})
  }
  recalculateCartTotal(){
    const cartTotal = this.state.cart.findCartTotal()
    this.setState({cartTotal})
  }
  render(){
    const cartPage = () => {
      const loadCart = () => {
        const list = this.state.cart?.productList

        if(!list?.length >= 1) return <div>Only you and me in here</div>

        return (
          <ul>
            { list.map(( Item, i ) => {
              // console.log('item: ',Item.item);
              const item = Item.item
              const quant = Item.quantity
              const _price = item.getPrice()
              return (
                <li key={i}>
                  <div className='checkoutItem'>
                    <span><img src={item.image} alt={item.name} /> </span>
                    <span>
                      <h2>{item.name}</h2>
                      <h3>
                        ${_price} *
                        <input
                          className='quantityInput'
                          type='number'
                          defaultValue={quant}
                          onChange={ (e) => this.modifyItemQuantity(e,item) }
                        />
                      </h3>
                    </span>
                    <span className='itemTotals'>
                      <h2>{commaNumber( (_price * quant).toFixed(2) )}</h2>
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        )
      }
      const collectInfo = (th) => {
        const productList = th.props.t.state.cart.productList
        th.setState({productList,page:1})
      }
      const _cart = loadCart()
      return (

        <div className='checkoutContainer'>
          <h1>Cart</h1>
          { _cart }
          <h1>
            { this.state.cartTotal > 0 ? '$'+commaNumber(this.state.cartTotal.toFixed(2)) : null }
          </h1>
          {
            this.state.cartTotal > 0 ?
              <input type='button' value='Proceed to checkout' onClick={ () => collectInfo(this) }/> :
              null
          }
      </div>
      )
    } // done
    const checkoutPage = () => {
      const makeTableForCheckout = (cart) => {
        const _list = cart.productList
        const taxRate = 0.08625 // long island, suffolk tax rate
        const shippingRate = 5.99
        const cartSubtotal = cart.findCartTotal()
        const cartTax = cartSubtotal * taxRate

        return (
          <table className='checkoutTable'>
            <tbody>
              { _list.map((Item, i) => {
                const item = Item.item
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{Item.quantity} @ {item.getPrice()} / each</td>
                    <td>{ ((item.price * Item.quantity)/100).toFixed(2) }</td>
                  </tr>
                )
              }) }
            </tbody>
            <tfoot className='checkoutTotals'>
              <tr>
                <td>Subtotal:</td>
                <td>{ cartSubtotal.toFixed(2) }</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>{ shippingRate.toFixed(2) }</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td>{ (cartTax).toFixed(2) }</td>
              </tr>
              <tr style={{borderTop:'2px solid black'}}>
                <td>Total:</td>
                <td>{ (cartSubtotal + cartTax + shippingRate).toFixed(2) }</td>
              </tr>
            </tfoot>
          </table>
        )
      }
      const shippingAddressForm = () => {

        return (
          <div className='ShippingAddressForm'>
            <h2>Shipping Address</h2>
            <span>
              <label htmlFor='address'>Address:</label>
              <input type='text' htmlFor='address'/>
            </span>
            <span>
              <label htmlFor='town'>Town / City:</label>
              <input type='text' htmlFor='town'/>
            </span>
            <span>
              <label htmlFor='state'>State:</label>
              <input type='text' htmlFor='state'/>
            </span>
            <span>
              <label htmlFor='zip'>Zip Code:</label>
              <input type='number' htmlFor='zip'/>
            </span>
            <span>
              <label htmlFor='phone'>Phone:</label>
              <input type='number' htmlFor='phone'/>
            </span>
          </div>
        )
      }
      const billingAddressForm = () => {
        return (
          <div className='BillingAddressForm'>
            <h2>Billing Address</h2>
            <span>
              <label htmlFor='address'>Address:</label>
              <input type='text' htmlFor='address'/>
            </span>
            <span>
              <label htmlFor='town'>Town / City:</label>
              <input type='text' htmlFor='town'/>
            </span>
            <span>
              <label htmlFor='state'>State:</label>
              <input type='text' htmlFor='state'/>
            </span>
            <span>
              <label htmlFor='zip'>Zip Code:</label>
              <input type='number' htmlFor='zip'/>
            </span>
          </div>
        )
      }
      const paymentMethodForm = () => {

        return (
          <div className='PaymentMethodForm'>
            <h2>Payment Method</h2>
            <span>
              <label htmlFor='name'>Name On Card:</label>
              <input type='text' htmlFor='name'/>
            </span>
            <span>
              <label htmlFor='cardNumber'>Card Number:</label>
              <input type='number' htmlFor='cardNumber'/>
            </span>
            <span>
              <label htmlFor='exp'>Expiration Date:</label>
              <input type='text' htmlFor='exp'/>
            </span>
            <span>
              <label htmlFor='cvc'>CVC:</label>
              <input type='text' htmlFor='cvc'/>
            </span>
          </div>
        )
      }
      const backToCart = () => {
        this.setState({page:0})
      }

      const cart = this.state.cart

      if(cart.productList < 1) this.setState({page:0})

      return (
        <div className='checkoutContainer pageTwo'>
          <h1>
            <input type='button' value='Edit Cart' onClick={ () => backToCart()}/>
            <input type='button' value='Place order'/>
          </h1>
          { makeTableForCheckout(cart) }
          { shippingAddressForm() }
          { billingAddressForm() }
          { paymentMethodForm() }
          <input type='button' value='Place order'/>
        </div>
      )
    }

    let func;
    switch (this.state.page) {
      case 0:
        return cartPage()
        break;
      case 1:
        return checkoutPage()
        break;
    }
    return func
  }
}
