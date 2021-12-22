import Cart from '../Javascript/cart_class'

export default class User{
  constructor(options){
    if(options.type !== 'anonymous'){
      this.name = options.name // object please {fname, lname}
      this.email = options.email
      this.id = options.id
      this.plainTextPassword = options.plainTextPassword
    }
    this.type = options.type // 'admin', 'user', 'anonymous'
    this.myCart = new Cart()
  }
  thisUserInfo(){
    console.log('this user: ',this);
  }

}
