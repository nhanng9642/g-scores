import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-4 px-6 text-center text-2xl font-bold shadow">
        G-Scores
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-gradient-to-b from-yellow-400 via-green-400 to-teal-500 p-6">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold text-black" : "text-black"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "font-bold text-black" : "text-black"
              }
            >
              Search Scores
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "font-bold text-black" : "text-black"
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "font-bold text-black" : "text-black"
              }
            >
              Settings
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}