// tests/cpf.test.ts
import { describe, it, expect } from 'vitest';
import { validarCpf } from '../src/utils/validarCpf';

describe('validação de CPF', () => {
  it('deve validar um CPF correto', () => {
    expect(validarCpf('52998224725')).toBe(true);
  });

  it('deve rejeitar um CPF inválido', () => {
    expect(validarCpf('11111111111')).toBe(false);
  });

  it('deve rejeitar um CPF com menos de 11 dígitos', () => {
    expect(validarCpf('123456789')).toBe(false);
  });
});
