import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/Nav';
import Footer from './components/Footer';
import  { Store } from './components/Store';
import {ProductProvider} from './Context/dataContext'
import { CartProvider } from './Context/cartContext';
import { Container } from "react-bootstrap"
import CartItem from './components/CartItem';
import { ShoppingCart } from './components/ShoppingCart';
import { StoreItem } from './components/StoreItem';
import Details from './Pages/Details';


// const productProps = {
//   id: 1,
//   productName: "Product Name",
//   description: "Product Description",
//   price: 10.99,
//   imageURL: "https://example.com/product.jpg",
// };



function App() {
  return (
    <>
     <Router>
     <ProductProvider>
      <Navbar />
      <Container >
      <Routes>

      
        <Route path='/' element={
        <CartProvider>
        <Store />
        </CartProvider>
        }/>

        <Route path='/shoppingcart' element={
        <CartProvider>
        <ShoppingCart isOpen />
        </CartProvider>
        }/>

        {/* <Route path='/storeitem' element={
        <CartProvider>
        <StoreItem />
        </CartProvider>
        }/> */}

        <Route path='/details/:id' element={
        <CartProvider>
          <Details />
        </CartProvider>
        }/>



      </Routes>
      </Container>
      <Footer />
      </ProductProvider>
     </Router>
    </>
  );
}

export default App;
