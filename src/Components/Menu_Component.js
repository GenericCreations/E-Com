import React, {Component} from 'react'

export default class Menu extends Component{
  constructor(props){
    super(props)
    this.state = {
      user:this.props.t.state.user
    }
  }

  render(){
    const loadModifyProductsPage = () => {
      this.props.t.setState({offset:'0', mainPage:'modifyProducts'})
    }
    const loadProductsPage = () => {
      this.props.t.setState({offset:'0', mainPage:'products'})
    }
    return (
      <div className='menuContainer'>
        <ul>
          { this.state.user.type === 'admin' ? <li onClick={ () => loadModifyProductsPage() }>Modify Products</li> : null}
          <li>Services</li>
          <li  onClick={ () => loadProductsPage() }>Products</li>
          <li>About</li>
        </ul>
      </div>
    )
  }
}
