import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "./helpers/lib/ProtectedRoute";
import { Login } from "./pages/login";
import HomePage from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
