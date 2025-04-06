import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getClients, deleteClient } from "../../api/clientApi";
import { AuthContext } from "../../context/AuthContext";

export default function ClientList() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const cargarClientes = async () => {
    const data = await getClients(token);
    setClients(data);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleDelete = async (id) => {
    await deleteClient(id, token);
    cargarClientes();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <button
          onClick={() => navigate("/clientes/nuevo")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nuevo Cliente
        </button>
      </div>

      <table className="w-full border shadow-md">
        <thead className="">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="text-center border-t">
              <td className="p-2">{c.nombre}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.telefono}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => navigate(`/clientes/editar/${c.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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
