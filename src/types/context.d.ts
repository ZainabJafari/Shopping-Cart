
interface ProductsContextProps {
    getData: Products[];
    setGetData: React.Dispatch<React.SetStateAction<Products[]>>;
    loadProduct: () => Promise<void>;
}

interface ProductsProviderProps{
    children: ReactNode
}

