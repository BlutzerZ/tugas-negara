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
import SalesSoldDetail from "./admin/pages/SalesSoldDetail";
import Sold from "./sales/pages/Sold";
import SoldManagement from "./admin/pages/SoldManagement";
import RegisterSupervisor from "./admin/pages/AddSupervisor";
import SupervisorList from "./admin/pages/SupervisorList";
import StoreMigration from "./admin/pages/StoreMigration";
import StoreDelete from "./admin/pages/StoreDelete";
import SalesDelete from "./admin/pages/SalesDelete";
import SupervisorDelete from "./admin/pages/SupervisorDelete";
import SupervisorEdit from "./admin/pages/SupervisorEdit";
import SupervisorEditDetails from "./admin/pages/SupervisorEditDetails";
import SalesEdit from "./admin/pages/SalesEdit";
import SalesEditDetail from "./admin/pages/SalesEditDetails";

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
          <Route path="sales-delete" element={<SalesDelete />} />
          <Route path="sales-stock" element={<SalesStock />} />
          <Route path="sales-edit" element={<SalesEdit />} />
          <Route path="sales-edit/:sales_id" element={<SalesEditDetail />} />

          <Route path="sales-stock/:id/edit" element={<EditSalesStock />} />
          <Route path="my-stock" element={<MyStock />} />
          <Route path="sold" element={<Sold />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="setting" element={<Setting />} />
          <Route path="returns" element={<ReturnManagement />} />
          <Route path="sold-management" element={<SoldManagement />} />
          <Route path="add-supervisor" element={<RegisterSupervisor />} />
          <Route path="supervisor" element={<SupervisorList />} />
          <Route path="supervisor-edit" element={<SupervisorEdit />} />

          <Route
            path="supervisor-edit/:supervisor_id"
            element={<SupervisorEditDetails />}
          />
          <Route path="supervisor-delete" element={<SupervisorDelete />} />
          <Route path="store-migration" element={<StoreMigration />} />
          <Route path="store-delete" element={<StoreDelete />} />

          <Route
            path="returns/sales/:user_id"
            element={<SalesReturnDetail />}
          />
          <Route path="sold/sales/:user_id" element={<SalesSoldDetail />} />
          <Route path="return" element={<Return />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
