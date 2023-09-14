import axios from 'axios';
import React, { useState, createContext, ReactNode } from 'react';


const ProductsContext = React.createContext<ProductsContextProps | undefined>(undefined)

export const ProductProvider = ({ children }: ProductsProviderProps) => {

    const [getData, setGetData] = useState<Products[]>([]);
    
    const loadProduct = async () => {
        try {
            const res = await axios.get('http://localhost:2000/api/product/')
            setGetData(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProductsContext.Provider value={{ getData, setGetData, loadProduct }}>
            {children}
        </ProductsContext.Provider>

    )
}

export const useProductContext = () => {
    const useProductContext = React.useContext(ProductsContext)
    if (useProductContext === undefined) {
        throw new Error('the error')
    }
    return useProductContext
}