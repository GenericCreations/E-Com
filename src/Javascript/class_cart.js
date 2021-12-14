

export default class Cart{
  constructor(username){
    this.owner = username
    this.productList = [/* { item, quantity } */]
  }

  addItemToCart(item,quantity){ // if first item , make sure to turn cart icon into full cart !!!!!


    // is item in cart already ? increase quantity
    // if not, just push it to the list

    const cart = this.productList
    let existing = undefined

    cart.forEach((Item, i) => {
      if( item.id === Item.item.id ){
        const oldquant = this.productList[i].quantity
        this.productList[i].quantity += quantity
        existing = true;
      }
    })

    if(existing) return this.productList

    this.productList.push({item,quantity})
    const len = this.productList.length
    if(this.productList.length <= 1) // TURN ON FULL CART ICON

    return this.productList
  }
  rmItemFromCart(item,quantity){

  }
  adjustItemQuantity(item,quantity){
    this.productList.forEach((cartItem, i) => {
      console.log({cartItem,item,quantity});
      if(cartItem.item.id === item.id){
        this.productList[i].quantity = quantity
      }
    });
    console.log('quantity adjusted');


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
  toggleCartIcon(){
    
  }

}
