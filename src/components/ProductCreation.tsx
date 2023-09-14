import axios from 'axios';
import React, { useState , useEffect} from 'react'


interface ProductCreationProps{
    setData: React.Dispatch<React.SetStateAction<Products[]>>;
}

function ProductCreation( {setData}: ProductCreationProps) {

    const [product, setProduct] = useState<Products[]>([])

    const [formData , setFormData] = useState<FormProduct>
    ({
        productName: '',
        description: '',
        price: 123, 
        imageURL: ''
    })

    const Inputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })

    }
    const createProduct = () => {
        axios.post('http://localhost:2000/api/product/add' , formData)
        .then((res) => {
            const newProduct = res.data as Products
            console.log(newProduct);

            setFormData({
                productName: '',
                description: '',
                price: 123, 
                imageURL: ''
            })

            setData((prevProducts) => [...prevProducts, newProduct])
        })
        .catch((error) => {
            console.log(error);
        })


    }

     useEffect(() => {
        axios.get('http://localhost:2000/api/product/')
        .then((res) => {
            const getProducts = res.data
            setProduct(getProducts)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    

  return (
    <div>

            <div className='create-form'>
              <h3 className='create-product-text'>Add a new product</h3>
             <form>
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Produsct</label>
                  <input type="text" className="form-control" id="productName" name="productName" value={formData.productName} onChange={Inputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="title" className="form-label">description:</label>
                  <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={Inputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="title" className="form-label">price:</label>
                  <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={Inputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="form-label">imageURL:</label>
                  <textarea className="form-control" id="imageURL" name="imageURL" value={formData.imageURL} onChange={Inputs}></textarea>
                </div>
                <button className='btn btn-primary' onClick={createProduct}>ADD</button>
              </form>
              </div>
    </div>
  )
}

export default ProductCreation