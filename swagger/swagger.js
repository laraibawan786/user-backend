// swagger/swagger.js

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A RESTful API to manage users built with Node.js, Express, PostgreSQL, and Sequelize.',
      contact: {
        name: 'Laraib Batool',
        email: 'laraib@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:1214',
        description: 'Development Server',
      },
    ],
    tags: [
      {
        name: 'Users',
        description: 'Operations related to user management',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to JSDoc comments in routes
};

const swaggerSpec = swaggerJsDoc(options);

// Export function to set up Swagger in index.js
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
