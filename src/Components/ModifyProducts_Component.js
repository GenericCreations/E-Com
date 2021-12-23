import React, { Component } from 'react'
import Product from './Product_Component'

export default class ModifyProducts extends Component{
  constructor(props){
    super(props)
    this.state = {
      productList:this.props.t.state.products.productList,
      displayProduct:null
    }
  }
  render(){
    const select_onChange = (e) => {
      const val = e.target.value
      const chosenItem = val === 'new' ? 'new' : this.state.productList.find( item => {return Number(e.target.value) === item.id })
      this.setState({displayProduct:chosenItem})
    }
    return(
      <div className='products_container modifyProductsContainer' style={{left:this.props.t.state.offset}}>
        { this.props.t.state.offset === '0' ? null : <div onClick={ () => this.props.t.shiftAnimation('none',this.props.t)} className='coverForOffset'></div>}
        <h1>Modify Products</h1>
        <select onChange={ (e) => select_onChange(e)}>
          <option>Select an item</option>
          <option value='new' >Add new item</option>
          {this.state.productList.map(( item, i ) => {
            return <option key={i} value={item.id}>{item.name}</option>
          })}
        </select>
        { this.state.displayProduct ? <Product item={this.state.displayProduct} t={this.props.t} /> : null }

      </div>
    )
  }
}
