import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getClients,
  createClient,
  updateClient,
} from "../../api/clientApi";
import { AuthContext } from "../../context/AuthContext";

export default function ClientForm() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  useEffect(() => {
    const fetchClient = async () => {
      const data = await getClients(token);
      const cliente = data.find((c) => c.id == id);
      if (cliente) setForm(cliente);
    };
    if (id) fetchClient();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateClient(id, form, token);
    } else {
      await createClient(form, token);
    }
    navigate("/clientes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {id ? "Editar Cliente" : "Nuevo Cliente"}
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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
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
