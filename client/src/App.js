import React, { createContext, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import {Switch , Route} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Ads from './components/Ads';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import ResetPassword from './components/ResetPassword';
import Fb from './components/facebook/Fb';
import Show from './components/Show';

import {initialState , reducer} from '../src/reducer/UserReducer';

 // 1. contextAPI

 export const UserContext = createContext();

 const Routing = () => {
     return(
       <Switch>

           <Route exact path="/">
               <Home/>
           </Route>

           <Route  path="/about">
               <About/>
           </Route>

           <Route  path="/contact">
               <Contact/>
           </Route>

           <Route  path="/login">
               <Login/>
           </Route>

           <Route  path="/signup">
               <Signup/>
           </Route>

           <Route exact path="/reset">
               <ResetPassword />
           </Route>

           <Route  path="/logout">
               <Logout />
           </Route>

           <Route  path="/Show">
               <Show />
           </Route>

           <Route  path="/fb">
               <Fb />
           </Route>

           <Route  path="/ads">
               <Ads />
           </Route>

           <Route >
               <ErrorPage  />
           </Route>
           
       </Switch>
     )
 };


const App = () => {

    const [state , dispatch] = useReducer(reducer , initialState);

  return(
    <>

        <UserContext.Provider value={{state , dispatch}}>

            <Navbar/>

            <Routing />
        
        </UserContext.Provider>

    </>
  )
}

export default App;