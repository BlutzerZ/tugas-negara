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
          <Route path="profile" element={<UserProfile />} />
          <Route path="sales/:id" element={<SalesStores />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
