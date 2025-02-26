"use client"; 

export default function PedidoCard({ pedido, onDelete, onEdit }) {
  if (!pedido) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow-sm animate-pulse">
        Carregando...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-900">{pedido.cliente}</h3>
      <p className="text-gray-700 mt-2">{pedido.descricao}</p>
      <p className="text-2xl font-bold text-green-600 mt-4">R${pedido.valor}</p>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => onEdit(pedido)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(pedido.id)}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
