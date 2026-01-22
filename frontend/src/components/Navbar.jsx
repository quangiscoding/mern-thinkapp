import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <nav className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-primary font-bold font-mono">
            Think App
          </h1>
          <Link to={"/create"} className="btn btn-primary">
            <PlusIcon />
            <span>New Note</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
