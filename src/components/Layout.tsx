import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["/", "Home"],
  ["/scanner", "Scanner"],
  ["/batch", "Batch"],
  ["/history", "History"],
  ["/dashboard", "Dashboard"],
  ["/about", "About"],
];

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="text-xl font-bold text-brand-700">
            🥬 VegGrade <span className="text-slate-800">AI</span>
          </NavLink>
          <nav className="flex gap-1 overflow-x-auto text-sm">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-3 py-1.5 font-medium ${
                    isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-xs text-slate-400">
        VegGrade AI · Smart India Hackathon prototype
      </footer>
    </div>
  );
}