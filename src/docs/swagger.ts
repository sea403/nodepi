import swaggerJsdoc from 'swagger-jsdoc';

export function getSwaggerSpec() {
  try {
    const spec = swaggerJsdoc({
      definition: {
        openapi: '3.0.3',
        info: { title: 'NodePI API', version: '1.0.0' },
        components: {
          securitySchemes: {
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          },
        },
        security: [{ bearerAuth: [] }],
      },
      // Ensure a correct, **relative** glob. The leading ./ matters for ESM + tsx.
      apis: ['./src/routes/**/*.ts'],
    });

    return spec;
  } catch (err) {
    // If something is wrong in JSDoc, we don’t crash the app.
    console.error('Swagger build failed:', err);
    return {
      openapi: '3.0.3',
      info: { title: 'NodePI API (Docs failed to build)', version: '1.0.0' },
      paths: {},
    };
  }
}
