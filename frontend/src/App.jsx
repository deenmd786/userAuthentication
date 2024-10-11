// App.jsx
import AppRouter from "./routes/AppRoutes"; // Import the AppRouter
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
   <>
    <ErrorBoundary>
      <AppRouter/>
    </ErrorBoundary>
      
   </>
  );
};

export default App;
