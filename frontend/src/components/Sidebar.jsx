import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <div className="w-[250px] bg-gray-900 text-white h-screen p-5">

      <h2 className="text-2xl font-bold mb-10">
        Dashboard
      </h2>

      <div className="flex flex-col gap-4">

        <Link to="/dashboard">
          Home
        </Link>

        <Link to="/report-lost">
          Report Lost
        </Link>

        <Link to="/report-found">
          Report Found
        </Link>

        <Link to="/all-items">
          All Items
        </Link>

        <Link to="/my-items">
          My Reports
        </Link>

      </div>

    </div>
  );
}