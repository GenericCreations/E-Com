import Product from './product_class'
import WaterPump from '../Images/WaterPump.jpg'
import AirFilter from '../Images/AirFilter.jpg'
import Light from '../Images/Light.jpg'

export default class Products{
  constructor(){
    this.productList = []
    this.productCount = 0

    // adding filler products --->
      const ap = 'https://m.media-amazon.com/images/I/71IriMnkY5L._AC_UL640_FMwebp_QL65_.jpg'
      const tent = 'https://m.media-amazon.com/images/I/61qe90-ODTL._AC_SX679_.jpg'

      this.addNewProduct('MF1000 Grow Light',Light,8000)
      this.addNewProduct('Carbon Filter 4"',AirFilter,4500)
      this.addNewProduct('Water Pump 400GHP',WaterPump,3000)
      this.addNewProduct('Air Pump',ap,5000)
      this.addNewProduct("Mylar Tent, 2'x2'",tent,11000)
    // <---
  }
  addNewProduct(name,img,price){
    const id = this.productCount
    const np = new Product(name,img,price,id)
    this.productList.push(np)
    this.incrementProductCount();
  }
  removeProduct(Item){
    // must be the owner to do this
    let index = -1
    this.productList.forEach((item, i) => {
      if( item.id === Item.id) index = i
    });
    if(index === -1) return false;
    else console.log('item sucessfully removed',this.productList.splice(index,1));

  }
  incrementProductCount(){
    this.productCount += 1
  }
}
