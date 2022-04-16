import './App.css';
import LoginPage from './pages/loginPage/loginPage';
import SignupPage from './pages/signupPage/signupPage';
import HomePage from './pages/homePage/homePage';
import { useEffect, useState } from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {AuthContext, authContext} from './helper/authContext';
import BorrowRequest from './pages/borrowRequest/borrowRequest';

function App() {

  const [authState,setAuthState]=useState();

  useEffect(()=>{
       if(sessionStorage.getItem("accessToken"))setAuthState(true);
       else setAuthState(false);
  },[])

  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
        <Routes>
          <Route path="/loginPage"  element={< LoginPage />} />
          <Route path="/signupPage"  element={< SignupPage />} />
          <Route path="/"  element={< HomePage />} />
          <Route path="/borrow-request"  element={< BorrowRequest />} />
        </Routes>
      </Router>

      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
