import { useEffect } from "react";
import { useProductContext } from "../Context/dataContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Store.css"
import Hero from "../components/Hero/Hero";

export function Store() {
  const { getData, loadProduct } = useProductContext();

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <>
    <Hero />
    <div className="container mt-5">
      <div className="row justify-content-center">
        {getData.map((product) => (
          <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch" key={product._id}>
            <Link to={`/details/${product._id}`} className="text-decoration-none w-100">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imageURL}
                  alt={product.productName}
                  className="card-img-top img-fluid"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text text-muted flex-grow-1">{product.description}</p>
                  <p className="card-text">
                    <strong>Price: </strong> {product.price} $
                  </p>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Store;
