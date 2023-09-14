import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProductContext } from '../Context/dataContext';
import axios from 'axios';

// interface Products{
//     id: number
//     productName: string;
//     description: string;
//     price: number;
//     imageURL: string
// }

const Details = () => {


    const { id } = useParams<{ id: string }>();
    const { getData } = useProductContext();
    const [product, setProduct] = useState<Products | null>(null);
  
    useEffect(() => {
      loadProducts();
    }, [id]);


  const loadProducts = async () => {
    const result = await axios.get('http://localhost:2000/api/product/' + id)
    if (result.data) {
        setProduct(result.data);
    }
  }

   if(!product){
    return <div>Product not found</div>

   }

   return (
    <div>
        <h1>product Detail</h1>
        <div>Name: {product?.productName}</div>
        <p>description{product?.description}</p>
        <p>price{product?.price}</p>
        <img 
        src={product?.imageURL}
        alt={product?.productName}/>
    </div>
   )

}


export default Details