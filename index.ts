import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors'
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import validateRoutes from './src/routes/validate';

const app = Fastify();

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
})

app.get("/live", (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
        code: 200,
        message: "Server is online"
    })
})

async function bootstrap() {

    await app.register(swagger, {
        swagger: {
            info: {
                title: 'Validador de Dados',
                description: 'API que valida CPF, CEP e Email',
                version: '1.0',
                contact: {
                    name: 'Luis Guilherme',
                    url: 'https://github.com/Fiudy'
                },
            },

        },
    });

    await app.register(swaggerUI, {
        routePrefix: '/docs',
    });

    await app.register(validateRoutes);

    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log('API rodando em http://localhost:3001');
    console.log('Documentação Swagger em http://localhost:3001/docs');
}

bootstrap();
