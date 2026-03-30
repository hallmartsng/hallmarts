import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Space dezyn API',
      version: '1.0.0',
      description: 'API documentation for booking app',
    },
    servers: [{ url: `${process.env['API_BASE_URL']}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['src/routes/**/*.ts', 'src/controllers/**/*.ts'],
};

export const swaggerOpenapiSpecification = swaggerJSDoc(options);

export default swaggerOpenapiSpecification;
