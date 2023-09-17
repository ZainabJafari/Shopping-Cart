import React from 'react'
import { useCart } from '../Context/cartContext'
import { useProductContext } from '../Context/dataContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';



const Cart = () => {

    const { cartItems, decreaseCartQuantity, increaseCartQuantity, getItemQuantity, removeFromCart } = useCart()
    const { getData } = useProductContext()


    return (
        <div>
            <div>
                <h2 className='rubric'>Order Summary</h2>
                {getData.map((p) => {
                    if (cartItems.some((i) => i._id === p._id && i.quantity > 0)) {
                        return (
                            <div className='container-cart'>
                                <div className='product-list'>
                                    <p key={p._id}></p>
                                    <div className='product-style'><h5 className='name-style'>Name:</h5>{p.productName}</div>
                                    <div className='product-style'><h5>Description:</h5>{p.description}</div>
                                    <div className='product-style'><h5>Price:</h5> {p.price} $</div>
                                    <img
                                        src={p.imageURL}
                                        alt={p.productName}
                                        style={{ display: "block", maxWidth: "20%" }} />
                                <button className='btn-order' onClick={() => increaseCartQuantity(p._id)}>+</button>                                 <span className="fs-4">{getItemQuantity(p._id)}</span>
                                <button className='btn-order' onClick={() => decreaseCartQuantity(p._id)}>-</button>
                                <br /><br />
                                <button className='btn-order-remove' onClick={() => removeFromCart(p._id)}>remove</button>
                                </div>
                                <br /><br /><br />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Cart