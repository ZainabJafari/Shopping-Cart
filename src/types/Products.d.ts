interface Products{
    id: number
    productName: string;
    description: string;
    price: number;
    imageURL: string
}

interface CartItem extends Products{
    quantity: number
}