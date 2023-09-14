
interface FormProduct {
    productName: string;
    description: string;
    price: number;
    imageURL: string
}

interface Products extends FormProduct{
    _id: string
   
}

interface CartItem extends Products{
    quantity: number
}