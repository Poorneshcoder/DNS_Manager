import {Routes, Route} from 'react-router-dom';

import Account from "./components/Account";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {

  const isUserSignedIn = !!localStorage.getItem('token')
  return(
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        {isUserSignedIn && <Route path='/account' element={<Account/>} />}
      </Routes>
      
    </div>
  )
}

export default App;

