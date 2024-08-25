import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/Nav/Nav';
import  { Store } from './Pages/Store';
import {ProductProvider} from './Context/dataContext'
import { CartProvider } from './Context/cartContext';
import Details from './Pages/Details';
import Cart from './components/Cart/Cart';



function App() {
  return (
    <>
     <Router>
     <ProductProvider>
      <CartProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Store />}/>
        <Route path='/details/:id' element={<Details  />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
      </CartProvider>
      </ProductProvider>
     </Router>
    </>
  );
}

export default App;
