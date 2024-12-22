import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./admin/Layouts/Layout";
import Dashboard from "./admin/pages/Dashboard";
import StoreList from "./sales/pages/StoreList";
import StoreListStock from "./sales/pages/StoreListStock";
import SalesList from "./admin/pages/SalesList";
import AddStore from "./sales/pages/AddStore";
import Login from "./akun/pages/Login";
import Register from "./akun/pages/Register";
import UserProfile from "./akun/pages/UserProfile";
import SalesStores from "./admin/pages/SalesStores";
import EditStoreStock from "./sales/pages/EditStoreStock";
import EditStore from "./sales/pages/EditStore";
import Setting from "./akun/pages/Setting";
import SalesStock from "./sales/pages/SalesStock";
import EditSalesStock from "./sales/pages/EditSalesStock";
import MyStock from "./sales/pages/MyStock";
import Return from "./sales/pages/Return";
import ReturnManagement from "./admin/pages/ReturnManagement";
import SalesReturnDetail from "./admin/pages/SalesReturnDetail";
import Sold from "./sales/pages/Sold";
import SoldManagement from "./admin/pages/SoldManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stores" element={<StoreList />} />
          <Route path="stores-stock" element={<StoreListStock />} />
          <Route path="stores/add" element={<AddStore />} />
          <Route
            path="stores/:store_id/edit-stock"
            element={<EditStoreStock />}
          />
          <Route path="stores/:store_id/edit" element={<EditStore />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="sales/:sales_id" element={<SalesStores />} />
          <Route path="sales-stock" element={<SalesStock />} />
          <Route path="sales-stock/:id/edit" element={<EditSalesStock />} />
          <Route path="my-stock" element={<MyStock />} />
          <Route path="sold" element={<Sold />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="setting" element={<Setting />} />
          <Route path="returns" element={<ReturnManagement />} />
          <Route path="sold-management" element={<SoldManagement />} />

          <Route
            path="returns/sales/:user_id"
            element={<SalesReturnDetail />}
          />
          <Route path="return" element={<Return />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
