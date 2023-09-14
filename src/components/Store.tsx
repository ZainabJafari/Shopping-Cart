import { useEffect } from "react"
import { useProductContext } from '../Context/dataContext'
import { Link } from "react-router-dom"
import {Col} from 'react-bootstrap'
import { StoreItem } from './StoreItem'

export function Store() {
  const { getData, loadProduct } = useProductContext()
  useEffect(() => {
    loadProduct()
  }, [])

  return (
    <div>
      <div >
        {getData.map(product => (

          <div key={product._id}>
            <Link to={`/details/${product._id}`}>
            <div className='product-list'>
              <div className='product-style'><h5 className='name-style'>Name:</h5>{product.productName}</div>
              <div className='product-style'><h5>Description:</h5>{product.description}</div>
              <div className='product-style'><h5>Price:</h5> {product.price} $</div>
              <img
                src={product.imageURL}
                alt={product.productName}
                style={{ display: "block", maxWidth: "10%" }} />
              </div>
              </Link>

{/* 
              <Link to='/storeitem'>
              <Col>
                <StoreItem
                  id={product.id}
                  productName={product.productName}
                  description={product.description}
                  price={product.price}
                  imageURL={product.imageURL}
                />
              </Col>
              <button>add to </button>
              </Link> */}
            </div>


        ))}
      </div>
    </div>
  )
}


export default Store
