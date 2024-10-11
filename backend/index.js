const initApp = require('./loaders');
const gracefulShutdown = require('./utils/gracefulShutdown');

const startServer = async () => {
  try {
    const app = await initApp(); // Await the app initialization

    // Start server with graceful shutdown
    const port = process.env.PORT || 8080;
    const server = app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
    gracefulShutdown(server);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit with failure
  }
};

startServer();
