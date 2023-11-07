import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import HomeScreen from  './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/home" element={<HomeScreen/>}></Route>
          <Route path='/book/:roomid/:fromDate/:toDate' element={<BookingScreen/>}></Route>
          <Route path='/register' element={<RegisterScreen/>}></Route>
          <Route path='/login' element={<LoginScreen/>}></Route>
          <Route path='/profile' element={<ProfileScreen/>}></Route>
          <Route path='/admin' element={<AdminScreen/>}></Route>
          <Route path='/' element={<LandingScreen/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
