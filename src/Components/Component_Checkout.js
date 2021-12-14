import React, {Component} from 'react'
const commaNumber = require('comma-number')

 // "1,000"

export default class Checkout extends Component{
  constructor(props){ // props.t available
    super(props)
    this.state = {
      page:0,
      productList:[],
      cartTotal:0,
    }
  }

  render(){
    const cartPage = () => {
      const loadCart = () => {
        const cart = this.props.t.state.cart
        const list = cart.productList

        if(list < 1) return <div>noCart</div>
        let cartTotalCost

        return (
          <ul>
            { list.map(( Item, i ) => {
              console.log('item: ',Item.item);
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
                          onChange={(e)=>{

                          }}
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
      return (
        <div className='checkoutContainer'>
          <h1>Cart - edit?</h1>
          { loadCart() }
          <h1>${commaNumber(this.state.cartTotal === 0 ? this.props.t.state.cart.findCartTotal().toFixed(2) : this.state.cartTotal.toFixed(2))}</h1>
          <input type='button' value='Proceed to checkout' onClick={ () => collectInfo(this) }/>
      </div>
      )
    }
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
                  <tr>
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
              <label for='address'>Address:</label>
              <input type='text' for='address'/>
            </span>
            <span>
              <label for='town'>Town / City:</label>
              <input type='text' for='town'/>
            </span>
            <span>
              <label for='state'>State:</label>
              <input type='text' for='state'/>
            </span>
            <span>
              <label for='zip'>Zip Code:</label>
              <input type='number' for='zip'/>
            </span>
            <span>
              <label for='phone'>Phone:</label>
              <input type='number' for='phone'/>
            </span>
          </div>
        )
      }
      const billingAddressForm = () => {
        return (
          <div className='BillingAddressForm'>
            <h2>Billing Address</h2>
            <span>
              <label for='address'>Address:</label>
              <input type='text' for='address'/>
            </span>
            <span>
              <label for='town'>Town / City:</label>
              <input type='text' for='town'/>
            </span>
            <span>
              <label for='state'>State:</label>
              <input type='text' for='state'/>
            </span>
            <span>
              <label for='zip'>Zip Code:</label>
              <input type='number' for='zip'/>
            </span>
          </div>
        )
      }
      const paymentMethodForm = () => {

        return (
          <div className='PaymentMethodForm'>
            <h2>Payment Method</h2>
            <span>
              <label for='name'>Name On Card:</label>
              <input type='text' for='name'/>
            </span>
            <span>
              <label for='cardNumber'>Card Number:</label>
              <input type='number' for='cardNumber'/>
            </span>
            <span>
              <label for='exp'>Expiration Date:</label>
              <input type='text' for='exp'/>
            </span>
            <span>
              <label for='cvc'>CVC:</label>
              <input type='text' for='cvc'/>
            </span>
          </div>
        )
      }

      const cart = this.props.t.state.cart

      if(cart.productList < 1) return <div>noItems</div>

      return (
        <div className='checkoutContainer pageTwo'>
          <h1><input type='button' value='Place order'/> </h1>
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
