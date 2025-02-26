import { NextResponse } from 'next/server';

const API_URL_PEDIDOS = "http://localhost:8000/pedidos";

export async function GET() {
  try {
    const response = await fetch(API_URL_PEDIDOS);
    if (!response.ok) {
      throw new Error('Falha ao carregar pedidos');
    }
    const pedidosData = await response.json();
    return NextResponse.json(pedidosData);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  const pedido = await request.json();
  try {
    const response = await fetch(API_URL_PEDIDOS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      throw new Error('Falha ao criar pedido');
    }

    const novoPedido = await response.json();
    return NextResponse.json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.error();
  }
}
