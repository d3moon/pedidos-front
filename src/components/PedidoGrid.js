"use client"; 

import PedidoCard from "./PedidoCard";

export default function PedidoGrid({ pedidos, onDelete, onEdit }) {
  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-gray-600">Sem pedidos disponíveis</h2>
        <p className="text-gray-400">Não há pedidos para exibir no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {pedidos.map((pedido) => (
        <PedidoCard
          key={pedido.id}
          pedido={pedido}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
