import { NextResponse } from 'next/server';

const API_URL_PEDIDOS = "http://localhost:8000/pedidos";

export async function PUT(request, { params }) {
  const { id } = params;
  const pedido = await request.json();

  if (!pedido || !id) {
    return NextResponse.json({ error: 'Pedido ou ID não informados' }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL_PEDIDOS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao atualizar pedido:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const pedidoAtualizado = await response.json();
    return NextResponse.json(pedidoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID do pedido não informado' }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL_PEDIDOS}/${id}`, {
      method: 'DELETE',
    });

    console.log(response)

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao deletar pedido:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    return NextResponse.json({ message: 'Pedido deletado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}