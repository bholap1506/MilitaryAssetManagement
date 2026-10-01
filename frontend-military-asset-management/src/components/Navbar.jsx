import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="border-b border-slate-200 bg-slate-900 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">

        <Link
          to="/dashboard"
          className="text-xl font-bold tracking-tight"
        >
          Military Asset Management
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm">

          <Link
            to="/dashboard"
            className="rounded-lg px-3 py-2 transition hover:bg-slate-700"
          >
            Dashboard
          </Link>

          <Link
            to="/purchases"
            className="rounded-lg px-3 py-2 transition hover:bg-slate-700"
          >
            Purchases
          </Link>

          <Link
            to="/transfers"
            className="rounded-lg px-3 py-2 transition hover:bg-slate-700"
          >
            Transfers
          </Link>

          <Link
            to="/assignments"
            className="rounded-lg px-3 py-2 transition hover:bg-slate-700"
          >
            Assignments
          </Link>

          <Link
            to="/expenditures"
            className="rounded-lg px-3 py-2 transition hover:bg-slate-700"
          >
            Expenditures
          </Link>

          <button
            onClick={handleLogout}
            className="ml-2 rounded-lg bg-red-600 px-4 py-2 font-medium transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
