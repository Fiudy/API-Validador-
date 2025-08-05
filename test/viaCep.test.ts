// tests/cep.test.ts
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { consultarCep } from '../src/utils/viaCep';

vi.mock('axios');

describe('consultarCep', () => {
  it('deve retornar os dados corretos de um CEP válido', async () => {
    const mockedResponse = {
      data: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      },
    };

    (axios.get as any).mockResolvedValue(mockedResponse);

    const result = await consultarCep('01001000');

    expect(result).toHaveProperty('logradouro', 'Praça da Sé');
    expect(result).toHaveProperty('cep', '01001-000');
  });

  it('deve retornar erro quando o axios falha', async () => {
    (axios.get as any).mockRejectedValue(new Error('Erro de rede'));

    const result = await consultarCep('00000000');

    expect(result.erro).toBe(true);
    expect(result.mensagem).toBe('CEP inválido ou fora do ar');
  });
});
