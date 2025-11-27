import './App.css';
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import Login from "./page/Auth/Login";
import Register from "./page/Auth/Register";
import {Routes,Route} from "react-router-dom";
import Loading from "../src/components/Layout/Loading"
import { Suspense, lazy } from "react";
import Main from './components/Outlet/Main';
import AuthLayout from './components/Outlet/Auth';
import Other from './page/Other';



function App() {

  return (
    <>
    <Suspense fallback={<Loading/>}>
      <Routes>

        <Route element={<Main/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Route>
          <Route path='/other' element={<Other/>}/>
        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        

        </Route>

      </Routes>
    </Suspense>
    </>
  )
}

export default App
