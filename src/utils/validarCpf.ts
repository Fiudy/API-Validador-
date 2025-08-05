export function validarCpf(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calc = (base: number) => {
    let sum = 0;
    for (let i = 0; i < base; i++) {
      sum += parseInt(cpf.charAt(i)) * (base + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const digit1 = calc(9);
  const digit2 = calc(10);

  return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
}
