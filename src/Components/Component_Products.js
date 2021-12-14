import React, { Component } from 'react'
import '../CSS/Component_Products.css'
import FilterIcon from '../Icons/filter.png'
import SearchIcon from '../Icons/search.png'
import AddToCartIcon from '../Icons/addToBag.png'


export default class Products extends Component{
  constructor(props){
    super(props)
  }

  createListToShow(list){
    return list.map( (item, i) => {
      // console.log('item object: ',item);
      return (
        <div className='itemContainer' key={i}>
          <span className='item_image'>
            <img src={item.image} alt='Item Image'></img>
          </span>
          <span className='item_details'>
            <h3>{item.name}name</h3>
            <h4>${(item.price/100).toFixed(2)}</h4>
            <span className='item_icons'>
              <img
                src={AddToCartIcon}
                alt='Add To Cart'
                width='35'
                height='35'
                onClick={ () =>  this.props.t.state.cart.addItemToCart(item,1) }
              />
            </span>
          </span>
        </div>
      )
    })
  }
  render(){
    let list;
    const productList = this.props?.prods?.productList
    if(productList && productList.length >= 1){
      list = this.createListToShow(productList)
    } else {
      list = <div>No Products To Show</div>
    }
    return(
        <div className='products_container' style={{left:this.props.offset}}>
          { this.props.offset === '0' ? null : <div onClick={ () => this.props.shiftFunc('none',this.props.t)} className='coverForOffset'></div>}
          <div className='filterProducts'>
            <span className='filterInput'><input type='text' autoComplete='off' /></span>
            <span><img src={SearchIcon} alt='filter'/></span>
            <span><img src={FilterIcon} alt='filter'/></span>
          </div>
          { list }
        </div>
      )
  }
}
