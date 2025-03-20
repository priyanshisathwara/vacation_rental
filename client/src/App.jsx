import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Forgot from './components/Forgot';
import OTPVerification from './components/OTPInput';
import ResetPassword from './components/Reset';



function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home />}/>
    <Route path='/register' element={<Signup />}></Route>
    <Route path="/login" element={<Login />} />
    <Route path='/forgot' element={<Forgot />}/>
    <Route path='/send_recovery_email' element={<OTPVerification />}/>
    <Route path='/reset-password' element={<ResetPassword />}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
