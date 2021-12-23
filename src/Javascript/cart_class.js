import React, { Component} from 'react'

export default class Cart{
  constructor(){
    this.productList = [/* { item, quantity } */]
  }
  findItemWithId(id){
    if(this.productList.length < 1){
      return undefined;
    }
    return this.productList.find( (item) => { return item.item.id === id })
  }
  addItemToCart(item,quantity){ // if first item , make sure to turn cart icon into full cart !!!!!
    // is item in cart already ? increase quantity
    // if not, just push it to the list

    const cart = this.productList
    let existing = undefined

    cart.forEach((Item, i) => {
      if( item.id === Item.item.id ){
        this.productList[i].quantity += quantity
        existing = true;
      }
    })

    if(existing) return this.productList

    this.productList.push({item,quantity})
    const len = this.productList.length
    if(this.productList.length <= 1) {// TURN ON FULL CART ICON
      console.log('Cart now has items');
    }
    return this.productList
  }
  rmItemFromCart(item,quantity){
    const cart = this.productList
    let noMoreInCart = false, index, existing
    cart.forEach((Item, i) => {
      if( item.id === Item.item.id ){
        this.productList[i].quantity = Number(this.productList[i].quantity) >= quantity ? Number(this.productList[i].quantity) - quantity : 0
        if(Number(this.productList[i].quantity) === 0) noMoreInCart = true
        index = i
        existing = true;
      }
    })
    if(existing && noMoreInCart){
      if(!this.productList.splice(index,1)) console.error('FAILED TO REMOVE PRODUCT FROM CART',this.productList[index])
      // remove it from this.productList
    }
    console.log('should be gone from cart: ',cart);
  }
  adjustItemQuantity(item,quantity){
    this.productList.forEach((cartItem, i) => {
      console.log({cartItem,item,quantity});
      if(cartItem.item.id === item.id){
        this.productList[i].quantity = quantity
      }
    });
    console.log('quantity adjusted to ',quantity);
  }
  findCartTotal(){
    const list = this.productList
    let acc = 0;

    if (list.length < 1) return 0

    list.forEach(( item, i ) => {
      const I = item
      const price = I.item.price
      const quant = I.quantity
      acc += price * quant
    })

    return acc/100
  }
  changeQuantity(itemID,newQuantity){

    const thisItem = this.findItemWithId(itemID)
    thisItem.quantity = newQuantity
    console.log('changing quantity,',thisItem);

    if(thisItem.quantity === 0){
      this.rmItemFromCart(thisItem.item,thisItem.quantity)
    }
  }
}
