import NewUser from './user_class.js'

export default class Users{
  constructor(){
    this.userList = []
    this.userCount = 0

    // create admin
    const createAdminUserWithThisData = {
      name:{
        fname:'Pat',
        lname:'Cannon'
      },
      email:'xxxtrfunnyy@yahoo.com',
      type:'admin',
      plainTextPassword:'plainTextPassword'
    }
    this.createNewUser(createAdminUserWithThisData)
  }
  createNewUser(options){
    // need this in options = {
    //   fname,
    //   lname,
    //   email,
    //   type,
    //   plainTextPassword
    // }
    const newb = new NewUser({
      name:{
        fname: options.name.fname,
        lname: options.name.lname
      },
      email: options.email,
      type: options.type,
      id: this.userCount,
      plainTextPassword: options.plainTextPassword
    })
    this.userList.push(newb)
    this.userCount = this.userCount + 1
  }
}
