import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/Nav';
import  { Store } from './Pages/Store';
import {ProductProvider} from './Context/dataContext'
import { CartProvider } from './Context/cartContext';
import { Container } from "react-bootstrap"
import Details from './Pages/Details';
import Cart from './components/Cart';
import ProductCreation from './components/ProductCreation';



function App() {
  return (
    <>
     <Router>
     <ProductProvider>
      <CartProvider>
      <Navbar />
      <Container >
      <Routes>
        <Route path='/' element={<Store />}/>
        <Route path='/details/:id' element={<Details  />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/add' element={<ProductCreation />}/>
      </Routes>
      </Container>
      </CartProvider>
      </ProductProvider>
     </Router>
    </>
  );
}

export default App;
