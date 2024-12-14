import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
	const location = useLocation();

	return (
		<div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
			<div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
				<ul className="pb-2 space-y-2">
					<li>
						<form action="#" method="GET" className="lg:hidden">
							<label htmlFor="mobile-search" className="sr-only">
								Search
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg
										className="w-5 h-5 text-gray-500"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
											clipRule="evenodd"
										></path>
									</svg>
								</div>
								<input
									type="text"
									name="email"
									id="mobile-search"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Search"
								/>
							</div>
						</form>
					</li>
					<li>
						<Link
							to="/"
							className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
								location.pathname === "/" ? "bg-gray-100 dark:bg-gray-700" : ""
							}`}
						>
							<svg
								className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
								<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
							</svg>
							<span className="ml-3">Dashboard</span>
						</Link>
					</li>
					<li>
						<Link
							to="/stores"
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
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="ml-3">Stores</span>
						</Link>
					</li>
					<li>
						<Link
							to="/sales"
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
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="ml-3">Sales</span>
						</Link>

						<Link
							to="/stores/add"
							className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
									clipRule="evenodd"
								/>
							</svg>
							Tambah Toko
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
