import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getSales, generateInvoicePDF } from "../../api/saleApi";
import { AuthContext } from "../../context/AuthContext";

export default function SaleList() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const loadSales = async () => {
    try {
      const data = await getSales(token);
      setSales(data);
    } catch (error) {
      setAlert({
        message: "Error al cargar las ventas.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  const handleDownloadInvoice = async (id) => {
    try {
      const pdfBlob = await generateInvoicePDF(id, token);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `factura-${id}.pdf`;
      link.click();
      setAlert({
        message: "Factura descargada con éxito.",
        type: "success",
      });
    } catch (error) {
      setAlert({
        message: "Error al generar la factura.",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6">
      {alert.message && (
        <div
          className={`p-4 mb-4 rounded ${
            alert.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Ventas</h2>
        <button
          onClick={() => navigate("/ventas/nueva")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nueva Venta
        </button>
      </div>

      <table className="w-full border shadow-md">
        <thead className="">
          <tr>
            <th className="p-2">Fecha</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Total</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="text-center border-t">
              <td className="p-2">{new Date(sale.fecha).toLocaleDateString()}</td>
              <td className="p-2">{sale.cliente}</td>
              <td className="p-2">${sale.total}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleDownloadInvoice(sale.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Descargar Factura
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
