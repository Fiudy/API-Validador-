import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { validarCpf } from '../utils/validarCpf';
import { consultarCep } from '../utils/viaCep';
import { validarEmail } from '../utils/validarEmail';

export default async function validateRoutes(app: FastifyInstance) {
  const bodySchema = z
    .object({
      cpf: z.string().optional(),
      cep: z.string().optional(),
      email: z.string().optional(),
    })
    .refine((data) => data.cpf || data.cep || data.email, {
      message: 'Pelo menos um dos campos (cpf, cep ou email) deve ser enviado',
    });

  const bodyJsonSchema = {
    type: 'object',
    properties: {
      cpf: { type: 'string', nullable: true },
      cep: { type: 'string', nullable: true },
      email: { type: 'string', nullable: true },
    },
    anyOf: [
      { required: ['cpf'] },
      { required: ['cep'] },
      { required: ['email'] },
    ],
    additionalProperties: false,
  };

  const responseSchema = {
    type: 'object',
    properties: {
      cpf: {
        type: 'object',
        properties: {
          valido: { type: 'boolean' },
        },
        nullable: true,
      },
      cep: {
        type: 'object',
        nullable: true,
        properties: {
          cep: { type: 'string' },
          logradouro: { type: 'string' },
          bairro: { type: 'string' },
          localidade: { type: 'string' },
          uf: { type: 'string' },
          erro: { type: 'string' }, 
        },
      },
      email: {
        type: 'object',
        nullable: true,
        properties: {
          valido: { type: 'boolean' },
          dominioComum: { type: 'boolean' },
          motivo: { type: 'string' },
        },
      },
    },
  };

  app.post(
    '/validate',
    {
      schema: {
        body: bodyJsonSchema,
        response: {
          200: responseSchema,
        },
        description: 'Valida CPF, CEP e Email. Pelo menos um campo deve ser enviado.',
        tags: ['Validação'],
      },
    },
    async (request, reply) => {
      const { cpf, cep, email } = request.body as any;

      const resultado: Record<string, any> = {};

      if (cpf) {
        resultado.cpf = {
          valido: validarCpf(cpf),
        };
      }

      if (cep) {
        try {
          const dadosCep = await consultarCep(cep);
          resultado.cep = dadosCep;
        } catch {
          resultado.cep = { erro: 'CEP inválido ou não encontrado' };
        }
      }

      if (email) {
        const validacaoEmail = validarEmail(email);
        resultado.email = validacaoEmail;
      }

      return reply.send(resultado);
    }
  );
}
