import { useCart } from '../../Context/cartContext';
import { useProductContext } from '../../Context/dataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Cart.css'; 

const Cart = () => {
  const { cartItems, decreaseCartQuantity, increaseCartQuantity, getItemQuantity, removeFromCart } = useCart();
  const { getData } = useProductContext();

  return (
    <div className="container mt-5">
      <h2 className="rubric text-center mb-4">Order Summary</h2>
      {getData.map((p) => {
        const quantity = getItemQuantity(p._id);
        if (cartItems.some((i) => i._id === p._id && quantity > 0)) {
          return (
            <Card className="mb-4 shadow-sm cart-item" key={p._id}>
              <div className="row g-0">
                <div className="col-md-4 text-center">
                  <img
                    src={p.imageURL}
                    alt={p.productName}
                    className="img-fluid rounded-start"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column">
                  <Card.Body>
                    <Card.Title className="product-name">{p.productName}</Card.Title>
                    <Card.Text className="product-description">{p.description}</Card.Text>
                    <Card.Text className="product-price">Price: {p.price} $</Card.Text>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => increaseCartQuantity(p._id)}
                      >
                        +
                      </Button>
                      <span className="fs-4">{quantity}</span>
                      <Button
                        variant="outline-secondary"
                        className="ms-2"
                        onClick={() => decreaseCartQuantity(p._id)}
                      >
                        -
                      </Button>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-muted text-end">
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(p._id)}
                    >
                      Remove
                    </Button>
                  </Card.Footer>
                </div>
              </div>
            </Card>
          );
        }
      })}
    </div>
  );
};

export default Cart;
