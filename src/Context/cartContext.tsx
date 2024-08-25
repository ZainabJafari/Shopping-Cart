import { type } from 'os'
import {ReactNode, createContext, useContext, useState } from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'
type CartProviderProps = {
    children: ReactNode
}

type CartItem = {
    _id : string
    quantity: number
}

// Define the shape of the CartContext
type CartContextType = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    cartQuantity: number
    cartItems: CartItem[]
}



const CartContextType = createContext({} as CartContextType )

export function useCart () {
    return useContext(CartContextType)
}

// CartProvider component to manage the cart state and provide context
export const CartProvider = ({children}: CartProviderProps) => {

    const [isOpen , setIsOpen] = useState(false)

    // State to manage cart items, stored in local storage
    const [cartItems , setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )

    // Calculate the total quantity of items in the cart
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)


    // Function to get the quantity of a specific item in the cart
    const getItemQuantity = (id: string) => {
        return cartItems.find(item => item._id === id)?.quantity || 0
    }

    // Function to increase the quantity of a specific item in the cart
    function increaseCartQuantity(id: string){
        setCartItems(prevItem => {
            if(prevItem.find(item => item._id === id) == null){
                return [...prevItem, {_id: id , quantity: 1}]
            }else{
                return prevItem.map(item => {
                    if(item._id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }

                })
            }
        })
    }

    // Function to decrease the quantity of a specific item in the cart
    function decreaseCartQuantity(id: string){
        setCartItems(prevItem => {
            if(prevItem.find(item => item._id === id)?.quantity === 1){
                return prevItem.filter(item => item._id !== id)
            }else{
                return prevItem.map(item => {
                    if(item._id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }

                })
            }
        })
    }

    function removeFromCart(id: string){
        setCartItems(currItem => {
            return currItem.filter(item => item._id !== id)
        })
    }


    return (
        <CartContextType.Provider value={{getItemQuantity , increaseCartQuantity , decreaseCartQuantity , removeFromCart , openCart , closeCart , cartItems , cartQuantity}}>
        {children}
        </CartContextType.Provider>
    )
}