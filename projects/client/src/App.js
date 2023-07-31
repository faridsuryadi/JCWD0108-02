
import Axios from "axios";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setValue } from "./redux/cashierSlice";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPass";
import { Footer } from "./pages/footer";
import { ChangeProfilePicture } from "./pages/imgProfle";
import { ResetPassword } from "./pages/resetPass";
import { Homepage } from './pages/homepage';
import { Navbar } from './components/landingPage/navbar';
import { Detailpage } from './pages/detailpage';
import { CreateProduct } from './components/admin/createProduct';
import { DashboardProduct } from './components/admin/dashboardProduct';


import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AdminDashboard } from "./pages/adminDashboard";
import { Cashier } from "./components/dashboard/manageCashier/cashier";
import { AdminHome } from "./components/dashboard/home/adminHome";


const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/forgotpass", element: <ForgotPassword /> },
  { path: "resetpass", element: <ResetPassword /> },
  { path: "/changeprofilepicture", element: <ChangeProfilePicture /> },
  { path: "/footer", element: <Footer /> },
   { path: '/admin', element: <AdminDashboard />, children: [
      { path: '', element: <AdminHome />},
      { path: 'cashier', element: <Cashier />}
   ]},
   
    {path:"/",
    element:<Navbar/>,
    children:[
      {path: "/",element:<Homepage/>},
    ]
  },
  {path: "/dashboard",element:<DashboardProduct/>},
  {path: "/cashier",element:<DashboardCashier/>},
    ]
)
  
function App() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      const response = await Axios.get("http://localhost:5001/auth/keeplogin", {
        headers,
      });
      dispatch(setValue(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    keepLogin();
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
