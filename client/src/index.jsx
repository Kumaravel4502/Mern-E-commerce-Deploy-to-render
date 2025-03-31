// import "../src/style.css";
// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   Navigate,
//   // useNavigate,
//   // useNavigate,
// } from "react-router-dom";
// import store from "./store/store";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import AuthLayout from "./components/Auth/AuthLayout";
// import AdminLayout from "./components/AdminView/AdminLayout";
// import AdminDashBoard from "./pages/AdminView/AdminDashBoard";
// import AdminProducts from "./pages/AdminView/AdminProducts";
// import AdminFeatures from "./pages/AdminView/AdminFeatures";
// import AdminOrders from "./pages/AdminView/AdminOrders";
// import NotFound from "./pages/NotFound/NotFound";
// import ShoppingLayout from "./components/ShoppingView/ShoppingLayout";
// import ShoppingHome from "./pages/ShoppingView/ShoppingHome";
// import ShoppingAccount from "./pages/ShoppingView/ShoppingAccount";
// import ShoppingList from "./pages/ShoppingView/ShoppingList";
// import ShoppingCheckOut from "./pages/ShoppingView/ShoppingCheckOut";
// import { ToastContainer } from "react-toastify";
// import { checkAuth } from "./store/authslice";
// import UnAuthPage from "./pages/unauth-page/UnAuthPage";
// import { Skeleton } from "@/components/ui/skeleton"


// const App = () => {
//   const dispatch = useDispatch();
//   const { isLoading, user, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     dispatch(checkAuth()); // ✅ Ensure authentication check runs on app load
//   }, [dispatch]);

//   if (isLoading) {
//     return  <Skeleton className="w-full bg-black h-[600px] " />

//   }
//   console.log(isLoading, user);

//   return <Outlet />;
// };

// // const App = () => {
// //   const dispatch = useDispatch();
// //   const { isLoading, isAuthenticated, user } = useSelector((state) => state.auth);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     dispatch(checkAuth()); // ✅ Ensure authentication check runs on app load
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (!isLoading) { // Only navigate after loading is complete
// //       if (isAuthenticated) {
// //         if (user?.role === 'admin') {
// //           navigate('/admin/dashboard'); // Redirect admin to admin panel
// //         } else {
// //           navigate('/shop/home'); // Redirect normal users to shopping home
// //         }
// //       } else {
// //         navigate('/auth/login'); // Redirect unauthenticated users to login
// //       }
// //     }
// //   }, [isLoading, isAuthenticated, user, navigate]);

// //   if (isLoading) {
// //     return <h1 className="text-center">Loading...</h1>; // Show loading message while loading
// //   }

// //   return <Outlet />;
// // };

// // ✅ Protected Route Wrapper (Users & Admins)
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

//   if (isLoading) return <h1 className="text-center">Loading...</h1>;
//   return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
// };

// // ✅ Admin Route Wrapper (Admins Only)
// const AdminRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);
//   return user?.role === "admin" ? (
//     children
//   ) : (
//     <Navigate to="/unauth-page" replace />
//   );
// };

// // ✅ Router Configuration (Fixed)
// const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "auth",
//         element: <AuthLayout />,
//         children: [
//           { path: "login", element: <Login /> },
//           { path: "register", element: <Register /> },
//         ],
//       },
//       {
//         path: "admin",
//         element: (
//           <ProtectedRoute>
//             <AdminRoute>
//               <AdminLayout />
//             </AdminRoute>
//           </ProtectedRoute>
//         ),
//         children: [
//           { path: "dashboard", element: <AdminDashBoard /> },
//           { path: "products", element: <AdminProducts /> },
//           { path: "features", element: <AdminFeatures /> },
//           { path: "orders", element: <AdminOrders /> },
//         ],
//       },
//       {
//         path: "shop",
//         element: (
//           <ProtectedRoute>
//             <ShoppingLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { path: "home", element: <ShoppingHome /> },
//           { path: "account", element: <ShoppingAccount /> },
//           { path: "listing", element: <ShoppingList /> }, // ✅ Now works correctly
//           { path: "checkout", element: <ShoppingCheckOut /> },
//         ],
//       },
//       {
//         path: "/unauth-page",
//         element: <UnAuthPage />,
//       },
//       { path: "*", element: <NotFound /> },
//     ],
//   },
// ]);

// // ✅ Mounting React App
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <RouterProvider router={Router} />
//     <ToastContainer />
//   </Provider>
// );
