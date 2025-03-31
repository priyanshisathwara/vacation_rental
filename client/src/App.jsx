import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import OtpForm from './components/OtpForm';
import Forgot from './components/Forgot';
import AddPlace from './components/AddPlace';
import ResetPassword from './components/ResetPassword';
import PlacesList from './components/PlacesList';
import AboutUs from './components/AboutUs';

function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home />}/>
    <Route path='/register' element={<Signup />}></Route>
    <Route path="/login" element={<Login />} />
    <Route path='/forgot' element={<Forgot />}/>
    <Route path='/otp-form/:email' element={<OtpForm />}/>
    <Route path='/add-places' element={<AddPlace />}/>
    <Route path='/reset-password-form' element={<ResetPassword />}/>
    <Route path='/places' element={<PlacesList />}/>
    <Route path='/about-us' element={<AboutUs />}/>

    
   
   </Routes>
   </BrowserRouter>
  )
}

export default App
