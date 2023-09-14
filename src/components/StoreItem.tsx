import { useCart } from "../Context/cartContext"
import {Button , Card} from 'react-bootstrap'
import {formatCurrency} from '../utilities/formatCurrency'
import { Link } from "react-router-dom"

export function StoreItem({_id , productName , price , imageURL}: Products){

    const {
        getItemQuantity, increaseCartQuantity , decreaseCartQuantity , removeFromCart
 
    } = useCart()

    const quantity = getItemQuantity(_id)

    return(
        <Card className="h-100">
        <Card.Img
          variant="top"
          src={imageURL}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{productName}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Link to='/cart'><Button className="w-100" onClick={() => increaseCartQuantity(_id)}>
              + Add To Cart
            </Button></Link>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCartQuantity(_id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span> in cart
                  </div>
                  <Button onClick={() => increaseCartQuantity(_id)}>+</Button>
                </div>
                <Button
                  onClick={() => removeFromCart(_id)}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    )


}

export default StoreItem

