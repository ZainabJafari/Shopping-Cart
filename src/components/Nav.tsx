import React from 'react'
import { useCart } from '../Context/cartContext';
import { Link, NavLink } from 'react-router-dom'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'


const Navbar = () => {

  const {cartQuantity } = useCart()
  return (
    <div>
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <div className='container'>
          <ul className='navbar-nav'>
            <li className='home'><Link  className='nav-link' to='/'>Home</Link>
            </li>
            <h2 className='heder'>Clock.com</h2>
            <li className='cart'><Link className='nav-link' to={'/cart'}><FontAwesomeIcon icon={faShoppingCart} />{cartQuantity > 0 && <span className='cart-items-count'>{cartQuantity}</span>}</Link>
          
            </li>
          </ul>
        </div>
      </nav>

    </div>
  )
}

export default Navbar