import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Layout from "./Component/Layout/Layout.jsx";
import Home from "./Component/Home/Home.jsx";
import Login from './Component/Login/Login.jsx';
import All from './Component/All/All.jsx';
import Categories from './Component/Categories/Categories.jsx';
import Platform from "./Component/Platform/Platform.jsx";
import SortBy from './Component/Sort by/SortBy.jsx';
import Register from './Component/Register/Register.jsx'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Profile from './Component/Profile/Profile';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import GameDetails from './Component/GameDetails/GameDetails';
import {Offline} from 'react-detect-offline'




function App() {
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])
  const[userData,setUserData]=useState(null);
  function saveUserData(){
    let encodeToken = localStorage.getItem("userToken");
    let decodeToken = jwtDecode(encodeToken);
    console.log(decodeToken);
    setUserData(decodeToken);
  }
  
  let routers= createBrowserRouter([{
    path:'/',element:<Layout setUserData= {setUserData} userData= {userData}/>,children:[
      {index:true,element: <ProtectedRoute userData= {userData}><Home/></ProtectedRoute>},
      { path:"login",element:<Login saveUserData={saveUserData}/>},
      {path:'all',element:<ProtectedRoute userData= {userData}><All/></ProtectedRoute>},
      {path:'GameDetails/:id',element:<ProtectedRoute  userData= {userData}><GameDetails/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute userData= {userData}><Categories/></ProtectedRoute>},
      {path:'platform',element:<ProtectedRoute userData= {userData}><Platform/></ProtectedRoute>},
      {path:'sort-by',element:<ProtectedRoute userData= {userData}><SortBy/></ProtectedRoute>},
      {path:'profile',element:<ProtectedRoute userData= {userData}><Profile userData = {userData}/></ProtectedRoute> },
     {path:"register" , element:<Register/>}
  
    ]}
  ])
  
  return<>
   <div>
 
    <Offline className= "offline"><div>you are offline</div></Offline>
  </div>
  <RouterProvider router = {routers}/>
  </>
   
}

export default App;
