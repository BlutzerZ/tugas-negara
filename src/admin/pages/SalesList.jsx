import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import salesData from "../../database/sales.json";

const SalesList = () => {
    const [searchParams] = useSearchParams();
    const [sales, setSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentRegion, setCurrentRegion] = useState("");

    useEffect(() => {
        const region = searchParams.get('region');
        if (region) {
            setCurrentRegion(region);
            const salesInRegion = salesData.regions[region]?.sales || [];
            setSales(salesInRegion);
        } else {
            const allSales = Object.values(salesData.regions).flatMap(region => 
                region.sales
            );
            setSales(allSales);
        }
    }, [searchParams]);

    const calculateTotalStocks = (stores) => {
        return stores.reduce((acc, store) => ({
            stock_30ml: acc.stock_30ml + store.stock_30ml,
            stock_roll_on: acc.stock_roll_on + store.stock_roll_on,
            stock_20ml: acc.stock_20ml + store.stock_20ml
        }), {
            stock_30ml: 0,
            stock_roll_on: 0,
            stock_20ml: 0
        });
    };

    const filteredSales = sales.filter(sale => 
        sale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.stores.some(store => 
            store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>
            {/* Header Section */}
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            {currentRegion ? `Sales - ${currentRegion}` : 'Semua Sales'}
                        </h1>
                    </div>
                    <div className="flex flex-col items-center md:flex-row md:space-x-4">
                        <form className="flex items-center w-full md:w-1/2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Cari sales, area, atau toko..."
                            />
                        </form>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Nama Sales
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Jumlah Toko
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Total Stok
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {filteredSales.map((salesPerson) => {
                                        const totalStocks = calculateTotalStocks(salesPerson.stores);
                                        return (
                                            <tr key={salesPerson.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4">
													
                                                    <div className="font-semibold text-gray-900 dark:text-white">
                                                        {salesPerson.name}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-gray-700 dark:text-gray-300">
                                                    {salesPerson.stores.length} Toko
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm">
                                                        <div>30ml: {totalStocks.stock_30ml}</div>
                                                        <div>Roll On: {totalStocks.stock_roll_on}</div>
                                                        <div>20ml: {totalStocks.stock_20ml}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Link
                                                        to={`/sales/${salesPerson.id}`}
                                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                                    >
                                                        Lihat Toko
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesList;
