import {FaBeer} from 'react-icons/fa'
import './App.css'
import Products from './components/products/Products'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/shared/Navbar'
import About from './components/About'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Cart from './components/cart/Cart'
import Login from './components/auth/Login'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/auth/Register'
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/PaymentConfirmation'
import Order from './components/order/Order'
import NotFound from './components/NotFound'

function App() {

  return (
    <React.Fragment>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
          
          <Route path='/' element={<PrivateRoute/>}>
              <Route path='/profile/orders' element={<Order/>}/>
              <Route path='/profile' element={<Home/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/order-confirm' element={<PaymentConfirmation/>}/>
          </Route>
          <Route path='/' element={<PrivateRoute publicPage/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
