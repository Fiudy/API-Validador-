export function validarEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      valido: false,
      motivo: 'Formato de email inválido',
    };
  }

  const dominiosComuns = new Set([
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'live.com',
    'uol.com.br',
    'bol.com.br',
    'protonmail.com',
    'zoho.com',
    'mail.com',
    'aol.com',
    'me.com',
    'msn.com',
    'terra.com.br',
    'ig.com.br',
    'r7.com',
    'yahoo.com.br',
    'fastmail.com',
    'tutanota.com',
    'labcmi.org.br',
  ]);

  const dominiosSuspeitos = new Set([
    'tempmail.com',
    'mailinator.com',
    '10minutemail.com',
    'guerrillamail.com',
    'trashmail.com',
    'yopmail.com',
    'dispostable.com',
    'maildrop.cc',
    'getnada.com',
    'temp-mail.org',
    'fakeinbox.com',
    'throwawaymail.com',
    'tempail.com',
    'mytemp.email',
    'tempemail.net',
    'tempmailo.com',
    'tmpmail.org',
    'mailnesia.com',
    '33mail.com',
    'anonbox.net',
    'jetable.org',
    'disposable-email.ml',
  ]);

  const dominio = email.split('@')[1]?.toLowerCase();

  if (!dominio) {
    return {
      valido: false,
      motivo: 'Domínio ausente',
    };
  }

  if (dominiosComuns.has(dominio)) {
    return {
      valido: true,
      dominioComum: true,
    };
  }

  if (dominiosSuspeitos.has(dominio)) {
    return {
      valido: false,
      motivo: 'Domínio suspeito ou temporário',
    };
  }

  return {
    valido: false,
    motivo: 'Domínio incomum ou digitado incorretamente',
  };
}
