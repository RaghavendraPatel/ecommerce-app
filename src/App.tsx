import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch } from 'react-redux'
import { fetchFail,fetchStart,fetchSuccess } from './reducers/productSlice'


import Home from './pages/Home'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Sell from './pages/Sell';
import Product from './pages/Product';
import Checkout from './pages/Checkout';

function App() {
  const dispatch = useDispatch()
  // fetch products
  const fetchProducts = async () => {
    try {
      dispatch(fetchStart());
      const response = await axios.get('https://my-json-server.typicode.com/raghavendraPatel/db/products');
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      dispatch(fetchFail(error.message));
    }
  }
  useEffect(() => {
    fetchProducts();
  }
  , []);

  return (
    <div className="App">
      <ToastContainer 
        style={{top: '80px'}}
        autoClose={1500}
      />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
