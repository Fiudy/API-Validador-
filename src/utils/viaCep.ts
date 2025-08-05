import axios from 'axios';

export async function consultarCep(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch {
    return { erro: true, mensagem: 'CEP inválido ou fora do ar' };
  }
}
