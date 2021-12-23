import React, { Component } from 'react'
import AddToCartIcon from '../Icons/addToBag.png'


export default class Product extends Component{
  constructor(props){  // props.item, props.t
    super(props)
    this.state = {
      size:'small',
      imgSel_new:false,
    }
  }
  addItemToCart_complete(){
    const newProductListInCart = this.props.t.state.cart.addItemToCart(this.props.item,1)
    this.props.t.toggleCartEmpty(this.props.t,false)
  }
  render(){
    const createNew = () => {
      const displaySelectedImage = (e) => {
        console.log('img selected',e.target.value);
        this.setState({imgSel_new:e.target.value})
      }
      return(
        <div className='itemContainer_new'>
          {
            !this.state.imgSel_new ?
              (<span className='item_image_new'><label htmlFor="productImage">Select Images:</label>
            <input required type="file" id="productImage" name="image" onChange={ (e) => displaySelectedImage(e) }/></span>)
              :
              <span className='item_image_new'><input type='image' src={this.state.imgSel_new} alt='image preview'/></span>
          }
          <span className='item_details_new'>
            <input type='text' placeholder='Name of product'/>
            <input type='text' placeholder='Price'/>
          </span>
          <span className='item_description_new'>
            <input type='textfield' placeholder='Enter a description'/>
          </span>
        </div>
    )
    }
    const showExisting = () => {
      return(<div className='itemContainer'>
        <span className='item_image'>
          <img src={this.props.item.image} alt='Item Image'></img>
        </span>
        <span className='item_details'>
          <h3>{this.props.item.name}</h3>
          <h4>${(this.props.item.price/100).toFixed(2)}</h4>
          <span className='item_icons'>
            <img
              src={AddToCartIcon}
              alt='Add To Cart'
              width='35'
              height='35'
              onClick={ () => this.addItemToCart_complete() }
            />
          </span>
        </span>
      </div>)
    }
    const show = this.props.item === 'new' ? createNew() : showExisting()
    return show
  }
}
