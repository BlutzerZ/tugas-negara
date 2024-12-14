import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import salesData from "../../database/sales.json";

const SalesStores = () => {
    const { id } = useParams();
    const [salesPerson, setSalesPerson] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const findSalesPerson = () => {
            for (const region of Object.values(salesData.regions)) {
                const found = region.sales.find(s => s.id === parseInt(id));
                if (found) {
                    setSalesPerson(found);
                    break;
                }
            }
        };
        findSalesPerson();
    }, [id]);

    const openDrawer = (store) => {
        setSelectedStore(store);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setSelectedStore(null);
        setIsDrawerOpen(false);
    };

    if (!salesPerson) return <div>Loading...</div>;

    return (
        <>
            {/* Header Section */}
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <nav className="flex mb-5" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                <li className="inline-flex items-center">
                                    <Link to="/sales" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                        Sales
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="text-gray-400 ml-1 md:ml-2 dark:text-gray-500" aria-current="page">
                                            {salesPerson.name}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Daftar Toko - {salesPerson.name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Stores Grid */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {salesPerson.stores.map((store) => (
                    <div
                        key={store.id}
                        className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => openDrawer(store)}
                    >
                        <div className="flex flex-col h-full">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {store.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {store.address}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                {store.phone}
                            </p>
                            <div className="mt-auto">
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                        <div className="font-medium text-gray-900 dark:text-white">30ml</div>
                                        <div className="text-gray-500 dark:text-gray-400">{store.stock_30ml}</div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                        <div className="font-medium text-gray-900 dark:text-white">Roll On</div>
                                        <div className="text-gray-500 dark:text-gray-400">{store.stock_roll_on}</div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                        <div className="font-medium text-gray-900 dark:text-white">20ml</div>
                                        <div className="text-gray-500 dark:text-gray-400">{store.stock_20ml}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Drawer */}
            {isDrawerOpen && selectedStore && (
                <div className="fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800">
                    <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
                        Detail Toko
                    </h5>
                    <button
                        onClick={closeDrawer}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <div className="mb-6">
                        <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {selectedStore.name}
                        </h6>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {selectedStore.address}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedStore.phone}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                            Stok Saat Ini
                        </h6>
                        <div className="space-y-3">
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Stok 30ml
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {selectedStore.stock_30ml}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Stok Roll On
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {selectedStore.stock_roll_on}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Stok 20ml
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {selectedStore.stock_20ml}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SalesStores;
