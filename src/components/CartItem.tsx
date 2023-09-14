import { useCart } from "../Context/cartContext"
import { useProductContext } from "../Context/dataContext"
import {Button , Stack} from 'react-bootstrap'
import {formatCurrency} from '../utilities/formatCurrency'

type CartItemProps = {
  _id: string
  quantity: number
}

export function CartItem({ _id, quantity }: CartItemProps) {
  const { removeFromCart } = useCart()

  const {getData} = useProductContext()
  const item = getData.find(i => i._id === _id)
  if (item == null) return null

  return (
      
      <Stack direction="horizontal" gap={2} className="d-flex">
      <img
        src={item.imageURL}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.productName}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)} 
          </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item._id)}
      >
        &times;
      </Button>
      </Stack>
  )
}

export default CartItem