import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SaleForm from "./pages/sales/SaleForm";
import SaleList from "./pages/sales/SaleList";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import ClientList from "./pages/clients/ClientList";
import ClientForm from "./pages/clients/ClientForm";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { checkAuth } from "./api/authApi";

function App() {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            
              <Route path="/ventas" element={<SaleList />} />
              <Route path="/ventas/nueva" element={<SaleForm />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/productos/nuevo" element={<ProductForm />} />
              <Route path="/clientes" element={<ClientList />} />
              <Route path="/clientes/nuevo" element={<ClientForm />} />
            
            <Route path="/" element={<SaleList />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
