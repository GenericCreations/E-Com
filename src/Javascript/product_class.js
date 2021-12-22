
export default class Product{
  constructor(name,image,price,id){
    this.name = name
    this.price = price
    this.image = image
    this.id = id
  }
  getPrice(){
    return (this.price / 100).toFixed(2)
  }
}
