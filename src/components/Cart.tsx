import React from 'react'
import { useCart } from '../Context/cartContext'
import { useProductContext } from '../Context/dataContext'

const Cart = () => {

    const {cartItems} = useCart()
    const {getData} = useProductContext()

  return (
    <div>
        <div>
            {getData.map((p) => {
                if(cartItems.some((i) => i._id === p._id && i.quantity > 0))
                return (
                    <div>
                        <p>{p.description}</p>
                        <p>{p.productName}</p>
                        <p>{p.price}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Cart