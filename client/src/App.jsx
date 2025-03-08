import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Home from './assets/Home';



function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home />}/>
    <Route path='/register' element={<Signup />}></Route>
    <Route path="/login" element={<Login />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
