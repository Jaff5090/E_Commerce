
import './App.css';
import Register from './Pages/Register/Register';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/login/Login';
import Product from './Pages/Product/Product';
import ListeProduits from './Pages/ListeProduits/ListeProduits';
import Panier from './Pages/Panier/Panier';

import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from './Redux/Reducer/Action';
import { useSelector } from 'react-redux';


function App() {
  const [ping, setPing] = useState(false)
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem("token");
  const user = useSelector((state)=>state.users.current)
  useEffect(() => {
    if (isAuth){
      dispatch(userActions.current(isAuth))
     

    }

    
    
  }, [ping])

  
 
  
  return (
    <div className="App">
     
     <Routes>
       <Route path="/" element={<Home />}/> 
       <Route path="/register" element={<Register ping={ping} setPing = {setPing}/>}/>
       <Route path="/login" element={<Login ping={ping} setPing = {setPing} />}/>
       <Route path="/product/:id" element={<Product  ping={ping} setPing = {setPing} />}/> 
       <Route exact path="/products/:category" element={<ListeProduits />}/>
       <Route path="/panier" element={<Panier ping={ping} setPing = {setPing}  />}/>
     </Routes>
      
    </div>
    
  );
}

export default App;
