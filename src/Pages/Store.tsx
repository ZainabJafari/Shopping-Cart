import { useEffect } from "react"
import { useProductContext } from '../Context/dataContext'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'


export function Store() {
  const { getData, loadProduct } = useProductContext()
  useEffect(() => {
    loadProduct()
  }, [])

  return (
    <div>
      <div >
        {getData.map(product => (
         <Link to={`/details/${product._id}`} className="nav-link">

           <div className='product-list'>
            <div key={product._id}></div>
          <div className='product-style'><h5 className='name-style'>Name:</h5>{product.productName}</div>
           <div className='product-style'><h5>Description:</h5>{product.description}</div>
           <div className='product-style'><h5>Price:</h5> {product.price} $</div>
           <img
                  src={product.imageURL}
                  alt={product.productName}
                  style={{ display: "block", maxWidth: "20%" }} />
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


export default Store
