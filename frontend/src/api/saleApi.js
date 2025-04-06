import axios from "axios";

const API_URL = "http://localhost:4000/api/sales";

// Obtener todas las ventas
export const getSales = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Crear una venta
export const createSale = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Generar factura en PDF (se invoca en el backend)
export const generateInvoicePDF = async (id, token) => {
  const res = await axios.get(`${API_URL}/factura/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
  return res.data;
};
