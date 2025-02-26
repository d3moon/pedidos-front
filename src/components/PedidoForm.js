
'use client'

import { useState, useEffect } from "react";

export default function PedidoForm({ pedido, onSave }) {
  const [formData, setFormData] = useState({
    cliente: "",
    valor: "",
    descricao: "",
  });
  const [errors, setErrors] = useState({
    cliente: "",
    valor: "",
    descricao: "",
  });

  useEffect(() => {
    if (pedido) {
      setFormData({
        cliente: pedido.cliente,
        valor: pedido.valor,
        descricao: pedido.descricao,
      });
    }
  }, [pedido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.cliente) newErrors.cliente = "O nome do cliente é obrigatório.";
    if (!formData.valor) newErrors.valor = "O valor do pedido é obrigatório.";
    else if (isNaN(formData.valor) || formData.valor <= 0) newErrors.valor = "O valor deve ser um número positivo.";
    if (!formData.descricao) newErrors.descricao = "A descrição é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const pedidoComId = pedido ? { ...formData, id: pedido.id } : formData;
      onSave(pedidoComId);
      setFormData({ cliente: "", valor: "", descricao: "" });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {pedido ? "Editar Pedido" : "Criar Novo Pedido"}
      </h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="cliente">Cliente</label>
        <input
          id="cliente"
          name="cliente"
          type="text"
          value={formData.cliente}
          onChange={handleChange}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Nome do cliente"
        />
        {errors.cliente && <p className="text-red-500 text-sm mt-1">{errors.cliente}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="valor">Valor</label>
        <input
          id="valor"
          name="valor"
          type="number"
          value={formData.valor}
          onChange={handleChange}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Valor do pedido"
        />
        {errors.valor && <p className="text-red-500 text-sm mt-1">{errors.valor}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="descricao">Descrição</label>
        <input
          id="descricao"
          name="descricao"
          type="text"
          value={formData.descricao}
          onChange={handleChange}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Descrição do pedido"
        />
        {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-200">
        {pedido ? "Atualizar Pedido" : "Criar Pedido"}
      </button>
    </form>
  );
}
