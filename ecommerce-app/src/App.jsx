import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AppLayout from "./layout/AppLayout";
import Products from "./pages/Products/Products";
import Error from "./pages/Error/Error";
import RequireAuth from "./components/RequireAuth";
import ProductsProvider from "./context/ProductsProvider";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Navigate to="/products" replace />,
            },
            {
                path: "/products",
                element: <RequireAuth><Products /></RequireAuth>,
            },
        ],
    },
]);

function App() {
    return <ProductsProvider><RouterProvider router={router} /></ProductsProvider>;
}

export default App;
