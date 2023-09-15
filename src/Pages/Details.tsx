import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProductContext } from '../Context/dataContext';
import axios from 'axios';
import { useCart } from '../Context/cartContext';
import 'bootstrap/dist/css/bootstrap.min.css'

const Details = () => {


  const { id } = useParams<{ id: string }>() || ''
  const { getData } = useProductContext();
  const [product, setProduct] = useState<Products | null>(null);

  const {increaseCartQuantity , cartItems, removeFromCart, getItemQuantity, decreaseCartQuantity} = useCart()


  useEffect(() => {
    loadProducts();
  }, [id]);


  const loadProducts = async () => {
    const result = await axios.get('http://localhost:2000/api/product/' + id)
    if (result.data) {
      setProduct(result.data);
    }
  }

  if (!product || !id) {
    return <div>Product not found</div>

  }

  const quantity = getItemQuantity(id)


  return (
    <div>
      <div className='product-list-detail'>
        <img
          src={product.imageURL}
          alt={product.productName}
          style={{ display: "block", maxWidth: "50%" }} />
          <div className='display'>
        <h5 className='product-style'>{product.productName}</h5>
        <h5 className='product-style'>{product.description}</h5><br /><p><ul><li>Fri frakt</li><li>Snabba leveranser</li></ul></p>
        <h5 className='product-style'>{product.price} $</h5>
        </div>
        <button className='detail-btn' onClick={() => increaseCartQuantity(product._id)}>Add to cart</button>
      </div>
    </div>
  )

}


export default Details