require('dotenv').config();
const path = require('path');
const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);

// Start server after DB connection & sync
(async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log(`✅ Database synced successfully: ${process.env.DB_NAME}`);

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
      console.log(`📄 Swagger Docs available at http://localhost:${process.env.PORT || 5000}/api-docs`);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
})();
