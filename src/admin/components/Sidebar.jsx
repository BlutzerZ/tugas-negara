import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onLinkClick }) => {
  const location = useLocation();
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  const regions = [
    "Jakarta",
    "Banten",
    "Bandung",
    "Bogor",
    "Cianjur",
    "Garut",
    "Karawang",
    "Subang",
    "Sukabumi",
    "Lampung",
    "Palembang",
    "Semarang",
  ];

  if (localStorage.getItem("role") == "ADMIN") {
    return (
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          <ul className="pb-2 space-y-2">
            {/* Dashboard Link */}
            <li>
              <Link
                to="/"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            {/* Wilayah Dropdown */}
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsRegionOpen(!isRegionOpen)}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Wilayah
                </span>
                <svg
                  className={`w-6 h-6 ${isRegionOpen ? "rotate-180" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {isRegionOpen && (
                <ul className="py-2 space-y-2">
                  {regions.map((region, index) => (
                    <li key={index}>
                      <Link
                        to={`/sales?region=${region}`}
                        onClick={onLinkClick}
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        {region}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/sales"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Sales</span>
              </Link>
            </li>
            {/* Sales Stock Link */}
            <li>
              <Link
                to="/sales-edit"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales-edit"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Update Sales</span>
              </Link>
            </li>
            <li>
              <Link
                to="/sales-delete"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales-delete"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Delete Sales</span>
              </Link>
            </li>
            {/* Sales Stock Link */}
            <li>
              <Link
                to="/sales-stock"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales-stock"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Stok Sales</span>
              </Link>
            </li>
            <li>
              <Link
                to="/supervisor"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/supervisor"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3zm7-12a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1V7a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Supervisor</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-supervisor"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/add-supervisor"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3zm7-12a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1V7a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Tambah Supervisor</span>
              </Link>
            </li>
            <li>
              <Link
                to="/supervisor-edit"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/supervisor-edit"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Update Supervisor</span>
              </Link>
            </li>
            <li>
              <Link
                to="/supervisor-delete"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/supervisor-delete"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Delete Supervisor</span>
              </Link>
            </li>
            <li>
              <Link
                to="/returns"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/returns"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Return Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/sold-management"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sold-management"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Sold Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/stores"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/stores"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Update Toko</span>
              </Link>
            </li>
            <li>
              <Link
                to="/store-migration"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/store-migration"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
                <span className="ml-3">Migrasi Toko</span>
              </Link>
            </li>
            <li>
              <Link
                to="/store-delete"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/stores-delete"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Delete Toko</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (localStorage.getItem("role") == "SUPERVISOR") {
    return (
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          <ul className="pb-2 space-y-2">
            {/* Dashboard Link */}
            <li>
              <Link
                to="/"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            {/* Sales Link */}
            <li>
              <Link
                to="/sales"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Sales</span>
              </Link>
            </li>
            {/* Sales Stock Link */}
            <li>
              <Link
                to="/sales-edit"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales-edit"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Update Sales</span>
              </Link>
            </li>
            {/* Sales Stock Link */}
            <li>
              <Link
                to="/sales-delete"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales-delete"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Delete Sales</span>
              </Link>
            </li>
            {/* Sales Stock Link */}
            <li>
              <Link
                to="/sales-stock"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sales-stock"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Stok Sales</span>
              </Link>
            </li>
            <li>
              <Link
                to="/returns"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/returns"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Return Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/sold-management"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sold-management"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Sold Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/stores"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/stores"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Update Toko</span>
              </Link>
            </li>
            <li>
              <Link
                to="/store-migration"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/store-migration"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
                <span className="ml-3">Migrasi Toko</span>
              </Link>
            </li>
            <li>
              <Link
                to="/store-delete"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/stores-delete"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Delete Toko</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          <ul className="pb-2 space-y-2">
            {/* Dashboard Link */}
            <li>
              <Link
                to="/"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            {/* My Stock Link */}
            <li>
              <Link
                to="/my-stock"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/my-stock"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Stok Saya</span>
              </Link>
            </li>

            <li>
              <Link
                to="/sold"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/sold"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Terjual</span>
              </Link>
            </li>

            {/* Return Link */}
            <li>
              <Link
                to="/return"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/return"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Return</span>
              </Link>
            </li>

            {/* Store Management Links */}
            <li>
              <Link
                to="/stores/add"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/stores/add"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Tambah Toko</span>
              </Link>
            </li>
            <li>
              <Link
                to="/stores"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/stores"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Update Toko</span>
              </Link>
            </li>
            <li>
              <Link
                to="/stores-stock"
                onClick={onLinkClick}
                className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                  location.pathname === "/stores-stock"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Update Stock</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Sidebar;
