import React, { Component } from 'react'
import '../CSS/Products_Component.css'
import FilterIcon from '../Icons/filter.png'
import SearchIcon from '../Icons/search.png'
// import AddToCartIcon from '../Icons/addToBag.png'
import Product from './Product_Component'


export default class Products extends Component{
  constructor(props){
    super(props)
  }

  createListToShow(list){
    return list.map( (item, i) => {
      return <Product item={item} t={this.props.t} key={i}/>
    })
  }
  render(){
    let list;
    const productList = this.props.t.state.products?.productList
    if(productList && productList.length >= 1){
      list = this.createListToShow(productList)
    } else {
      list = <div>No Products To Show</div>
    }
    return(
        <div className='products_container' style={{left:this.props.t.state.offset}}>
          { this.props.t.state.offset === '0' ? null : <div onClick={ () => this.props.t.shiftAnimation('none',this.props.t)} className='coverForOffset'></div>}
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
