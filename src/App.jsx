import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import SearchScores from "./pages/SearchScores";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "search", element: <SearchScores /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
    ],
  }
], {
  basename: "/g-scores/",
});

export default function App() {
  return <RouterProvider router={router} />;
}