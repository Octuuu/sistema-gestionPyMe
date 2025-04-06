import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getProducts, deleteProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    const data = await getProducts(token);
    setProductos(data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id, token);
    cargarProductos();
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <button
          onClick={() => navigate("/productos/nuevo")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear nuevo
        </button>
      </div>

      <table className="w-full border bg-white shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="text-center border-t">
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">{p.precio}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => navigate(`/productos/editar/${p.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
