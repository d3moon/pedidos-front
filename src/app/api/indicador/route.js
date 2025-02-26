const API_URL_INDICADOR = "http://localhost:8000/indicador";

export async function GET() {
  try {
    const response = await fetch(API_URL_INDICADOR);
    if (!response.ok) {
      throw new Error('Falha ao carregar indicador');
    }
    const indicadorData = await response.json();
    return new Response(JSON.stringify(indicadorData));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
