import Axios from "axios";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { setValue } from "./redux/cashierSlice";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPass";
import { ResetPassword } from "./pages/resetPass";
import { Homepage } from './pages/homepage';
import { Navbar } from './components/landingPage/navbar';
import { Detailpage } from './pages/detailpage';
import { CreateProduct } from './components/admin/createProduct';
// import { DashboardProduct } from './components/admin/dashboardProduct';
import { useEffect, useState } from "react";
import { AdminDashboard } from "./pages/adminDashboard";
import { Cashier } from "./components/dashboard/manageCashier/cashier";
import { AdminHome } from "./components/dashboard/home/adminHome";
import { ChangeProfilePicture } from "./components/imgProfle";
// import { DashboardProduct } from './components/admin/dashboardProduct';
import { DashboardCashier } from "./components/admin/dashboardCashier";
import { TransHistory } from "./pages/transHistory";
import { AdminReport } from "./components/dashboard/report/transTable";

function App() {
const router = createBrowserRouter([
  
  { path: "/login", element: <Login /> },
  { path: "/forgotpass", element: <ForgotPassword /> },
  { path: '/admin', element: <AdminDashboard />, children: [
    { path: '', element: <AdminHome />},
    { path: 'cashier', element: <Cashier />},
    { path: 'report', element: <AdminReport />}
  ]},
  {path:"/", element:<Navbar onSearchQueryChange={handleSearchQueryChange} />, children:[
    {path: "/",element:<Homepage/>},
    {path: "detail",element:<Detailpage/>},
    {path: "create",element:<CreateProduct/>},
    {path: "transaction",element: <TransHistory />}
    // {path: "dashboard",element:<DashboardProduct/>},
  ]},
  { path: "/resetpass/:token", element: <ResetPassword /> },
  { path: "/changeprofilepicture", element: <ChangeProfilePicture /> },
  { path: "/footer", element: <Footer /> },
   { path: '/admin', element: <AdminDashboard />, children: [
      { path: '', element: <AdminHome />},
      { path: 'cashier', element: <Cashier />}
   ]},
   
    {path:"/",
    element:<Navbar/>,
    children:[
      {path: "/",element:<Homepage searchQuery={searchQuery} />},
    ]
  },
  {path: "/dashboardproduct",element:<DashboardProduct/>},
  {path: "/dashboardcashier",element:<DashboardCashier/>},
    ]
)
  
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState('');

  
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/auth/login", {
        headers,
      });
      dispatch(setValue(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token")
     

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
