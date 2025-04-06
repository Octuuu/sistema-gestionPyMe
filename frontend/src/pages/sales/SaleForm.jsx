import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createSale } from "../../api/saleApi";
import { AuthContext } from "../../context/AuthContext";

export default function SaleForm() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cliente: "",
    productos: [],
    total: 0,
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    setForm({
      ...form,
      productos: [...form.productos, { nombre: "", cantidad: 1, precio: 0 }],
    });
  };

  const handleProductChange = (index, e) => {
    const newProducts = [...form.productos];
    newProducts[index][e.target.name] = e.target.value;
    setForm({ ...form, productos: newProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!form.cliente || form.productos.length === 0) {
      setAlert({
        message: "Todos los campos son obligatorios, especialmente los productos.",
        type: "error",
      });
      return;
    }

    const saleData = {
      cliente: form.cliente,
      productos: form.productos,
      total: form.productos.reduce(
        (total, product) => total + product.cantidad * product.precio,
        0
      ),
    };

    try {
      await createSale(saleData, token);
      setAlert({
        message: "Venta creada con éxito!",
        type: "success",
      });
      navigate("/ventas");
    } catch (error) {
      setAlert({
        message: "Error al crear la venta. Intenta nuevamente.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Nueva Venta</h2>

        {alert.message && (
          <div
            className={`p-4 mb-4 rounded ${
              alert.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            {alert.message}
          </div>
        )}

        <input
          type="text"
          name="cliente"
          placeholder="Nombre del Cliente"
          value={form.cliente}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        />

        <div className="mb-4">
          <h3 className="font-bold">Productos</h3>
          {form.productos.map((producto, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                name="nombre"
                placeholder="Producto"
                value={producto.nombre}
                onChange={(e) => handleProductChange(index, e)}
                className="p-2 border rounded w-1/3"
              />
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={producto.cantidad}
                onChange={(e) => handleProductChange(index, e)}
                className="p-2 border rounded w-1/3"
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={producto.precio}
                onChange={(e) => handleProductChange(index, e)}
                className="p-2 border rounded w-1/3"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Agregar Producto
          </button>
        </div>

        <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4">
          Crear Venta
        </button>
      </form>
    </div>
  );
}
