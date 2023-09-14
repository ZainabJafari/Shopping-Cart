import { type } from 'os'
import {ReactNode, createContext, useContext, useState } from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'
import { ShoppingCart } from '../components/ShoppingCart'
type CartProviderProps = {
    children: ReactNode
}

type CartItem = {
    _id : string
    quantity: number
}

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

export const CartProvider = ({children}: CartProviderProps) => {

    const [isOpen , setIsOpen] = useState(false)

    const [cartItems , setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)



    const getItemQuantity = (id: string) => {
        return cartItems.find(item => item._id === id)?.quantity || 0
    }

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
        <ShoppingCart isOpen={isOpen}/>
        </CartContextType.Provider>
    )
}