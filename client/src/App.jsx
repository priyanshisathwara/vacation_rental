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
import SearchBar from './components/SearchBar';
import CityResult from './components/CityResults';
import Blog from './components/Blog';
import Admin from './components/Admin/AdminDashboard';
import Profile from './components/Profile';
import BookNow from './components/BookNow';
import Experience from './components/Experience';
import UpdatePlace from './components/UpdatePlace';
import StatueOfUnity from './components/home-component/StatueUnity';
import KutchPage from './components/home-component/KutchPage';
import WhiteRannPage from './components/home-component/WhiteRann';
import KalaDungarPage from './components/home-component/KalaDungar';
import BhujPage from './components/home-component/Bhuj';
import MandviPage from './components/home-component/Mandavi';
import KutchMuseumPage from './components/home-component/Kutchmuseum';
import OwnerRequestList from './components/Owner/OwnerRequestList';
import OwnerDashboard from './components/Owner/OwnerDashboard';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Saputara from './components/home-component/Saputara';
import LuxurySpa from './components/home-component/LuxurySpa';
import HikingInGujarat from './components/home-component/HikingInGujarat';
import LocalCuisineInGujarat from './components/home-component/LocalCuisineInGujarat';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';

// axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

function App() {

  return (
   <BrowserRouter>
   <ScrollToTop />
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
    <Route path='/search' element={<SearchBar />}/>
    <Route path="/places/:id" element={<CityResult />} />
    <Route path="/places/name/:city" element={<CityResult />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/admin/*" element={<Admin />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/book-now/:id" element={<BookNow />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/update-place/:id" element={<UpdatePlace />} />
    <Route path="/statue" element={<StatueOfUnity />} />
    <Route path="/kutch" element={<KutchPage />} />
    <Route path="/white-rann" element={<WhiteRannPage />} />
    <Route path="/kala-dungar" element={<KalaDungarPage />} />
    <Route path="/bhuj" element={<BhujPage />} />
    <Route path="/mandavi-beach" element={<MandviPage />} />
    <Route path="/kutch-museum" element={<KutchMuseumPage />} />
    <Route path='/saputara' element={<Saputara/>} />
    <Route path="/owner-dashboard" element={<OwnerDashboard />} />
    <Route path="/owner-request-list" element={<OwnerRequestList />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/spa" element={<LuxurySpa />} />
    <Route path="/hiking" element={<HikingInGujarat />} />
    <Route path="/cusine" element={<LocalCuisineInGujarat />} />


    
    







  
   </Routes>
   </BrowserRouter>
  )
}

export default App
