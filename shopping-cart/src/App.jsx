import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import Context from "./context/Context";
import Cart from "./components/Cart";

// Configure browser paths using declarative nesting properties
const router = createBrowserRouter([
  {
    element: <AppLayout />, // Standard layout outer shell (persistent across pages)
    children: [
      {
        path: "/",
        element: <Home />, // Injected inside AppLayout's <Outlet /> at root URL
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return (
    // Wrap everything in the global Context Provider so all components can access state
    <Context>
      <RouterProvider router={router} />
    </Context>
  );
}

export default App;
