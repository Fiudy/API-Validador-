// tests/email.test.ts
import { describe, it, expect } from 'vitest';
import { validarEmail } from '../src/utils/validarEmail';

describe('validação de email', () => {
  it('deve validar emails com domínios comuns', () => {
    const result = validarEmail('teste@gmail.com');
    expect(result.valido).toBe(true);
    expect(result.dominioComum).toBe(true);
  });

  it('deve retornar erro para domínio digitado errado', () => {
    const result = validarEmail('teste@hotm.com');
    expect(result.valido).toBe(false);
    expect(result.motivo).toBe('Domínio incomum ou digitado incorretamente');
  });

  it('deve retornar erro para formato inválido', () => {
    const result = validarEmail('invalid-email');
    expect(result.valido).toBe(false);
    expect(result.motivo).toBe('Formato de email inválido');
  });

  it('deve rejeitar domínio suspeito', () => {
    const result = validarEmail('teste@tempmail.com');
    expect(result.valido).toBe(false);
    expect(result.motivo).toBe('Domínio suspeito ou temporário');
  });
});
