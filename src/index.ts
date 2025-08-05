import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import validateRoutes from './routes/validate';

async function bootstrap() {
    const app = Fastify();

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

    await app.listen({ port: 3001 });
    console.log('API rodando em http://localhost:3001');
    console.log('Documentação Swagger em http://localhost:3001/docs');
}

bootstrap();
