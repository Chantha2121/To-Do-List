import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignUp from './SignUp';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import Home from './Home';
function App() {
  const [count, setCount] = useState(0);

  return (
    
      <BrowserRouter >
        <Routes>
          <Route path='/register' element={<SignUp/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
