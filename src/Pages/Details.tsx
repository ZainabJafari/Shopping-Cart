import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../Context/dataContext';
import axios from 'axios';
import { useCart } from '../Context/cartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Detail.css'; 

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { getData } = useProductContext();
  const [product, setProduct] = useState<Products | null>(null);

  const { increaseCartQuantity, getItemQuantity } = useCart();

  useEffect(() => {
    loadProducts();
  }, [id]);

  const loadProducts = async () => {
    const result = await axios.get('http://localhost:2000/api/product/' + id);
    if (result.data) {
      setProduct(result.data);
    }
  };

  if (!product || !id) {
    return <div className="text-center mt-5">Product not found</div>;
  }

  const quantity = getItemQuantity(id);

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4">
          <img
            src={product.imageURL}
            alt={product.productName}
            className="img-fluid rounded shadow-sm product-image"
          />
        </div>
        <div className="col-md-6">
          <h2 className="product-title">{product.productName}</h2>
          <p className="product-description">{product.description}</p>
          <ul className="list-unstyled product-benefits">
            <li><i className="bi bi-truck"></i> Fri frakt</li>
            <li><i className="bi bi-clock"></i> Snabba leveranser</li>
          </ul>
          <h4 className="product-price">{product.price} $</h4>

          <button
            className="btn btn-primary btn-lg w-100 my-3"
            onClick={() => increaseCartQuantity(product._id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
