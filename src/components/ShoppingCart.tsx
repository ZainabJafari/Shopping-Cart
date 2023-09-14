
import { useCart } from "../Context/cartContext"
import { useProductContext } from "../Context/dataContext"
import { formatCurrency } from "../utilities/formatCurrency"
import {CartItem} from './CartItem'
import { Offcanvas, Stack } from "react-bootstrap"


type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useCart()

  const {getData} = useProductContext()
  return (
                
          <Offcanvas show={isOpen} onHide={closeCart} placement="end" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item._id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                    const item = getData.find(i => i._id === cartItem._id)
                    return total + (item?.price || 0 ) * cartItem.quantity

                }, 0)
            )}
          </div>
                </Stack>
            </Offcanvas.Body>
          </Offcanvas>

  )
}
