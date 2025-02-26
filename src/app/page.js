"use client";

import { useState, useEffect } from "react";
import PedidoForm from "../components/PedidoForm";
import PedidoGrid from "../components/PedidoGrid";

export default function PedidoPage() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoAtual, setPedidoAtual] = useState(null);
  const [mediaPedidos, setMediaPedidos] = useState(null);

  useEffect(() => {
    const loadPedidosAndIndicadores = async () => {
      try {
        const pedidosResponse = await fetch("/api/pedidos");
        if (pedidosResponse.ok) {
          const pedidosData = await pedidosResponse.json();
          setPedidos(pedidosData);
        } else {
          console.error("Failed to fetch pedidos", pedidosResponse);
        }

        const indicadorResponse = await fetch("/api/indicador");
        if (indicadorResponse.ok) {
          const indicadorData = await indicadorResponse.json();
          setMediaPedidos(indicadorData.media_pedidos_por_cliente);
        } else {
          console.error("Failed to fetch indicador", indicadorResponse);
        }
      } catch (error) {
        console.error("Error loading pedidos and indicadores:", error);
      }
    };

    loadPedidosAndIndicadores();
  }, []);

  const handleCreatePedido = async (pedido) => {
    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
      });

      if (response.ok) {
        const novoPedido = await response.json();
        setPedidos((prevPedidos) => [...prevPedidos, novoPedido]);
      } else {
        console.error("Failed to create pedido", response);
      }
    } catch (error) {
      console.error("Error creating pedido:", error);
    }
  };

  const handleUpdatePedido = async (pedido) => {
    try {
      const response = await fetch(`/api/pedidos/${pedido.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
      });

      if (response.ok) {
        const pedidoAtualizado = await response.json();
        setPedidos((prevPedidos) =>
          prevPedidos.map((p) =>
            p.id === pedidoAtualizado.id ? pedidoAtualizado : p
          )
        );
        setPedidoAtual(null);
      } else {
        console.error("Failed to update pedido", response);
      }
    } catch (error) {
      console.error("Error updating pedido:", error);
    }
  };

  const handleDeletePedido = async (id) => {
    try {
      await fetch(`api/pedidos/${id}`, {
        method: "DELETE"
      });

      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
    }
  };
  const handleEditPedido = (pedido) => {
    setPedidoAtual(pedido);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          Gestão de Pedidos
        </h1>
      </header>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Indicadores</h2>
        {mediaPedidos !== null ? (
          <p className="text-lg text-gray-600">
            Média de pedidos por cliente:{" "}
            <span className="font-bold">{mediaPedidos}</span>
          </p>
        ) : (
          <p className="text-gray-500">Carregando média de pedidos...</p>
        )}
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <PedidoForm
          pedido={pedidoAtual}
          onSave={pedidoAtual ? handleUpdatePedido : handleCreatePedido}
        />
      </section>

      <section>
        <PedidoGrid
          pedidos={pedidos}
          onDelete={handleDeletePedido}
          onEdit={handleEditPedido}
        />
      </section>
    </div>
  );
}
