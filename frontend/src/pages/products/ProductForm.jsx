import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../../api/productApi";
import { AuthContext } from "../../context/AuthContext";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });

  const cargarProducto = async () => {
    const productos = await getProducts(token);
    const producto = productos.find((p) => p.id == id);
    if (producto) setForm(producto);
  };

  useEffect(() => {
    if (id) cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProduct(id, form, token);
    } else {
      await createProduct(form, token);
    }
    navigate("/productos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {id ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        />

        <button className="bg-blue-600 text-white py-2 px-4 rounded">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
