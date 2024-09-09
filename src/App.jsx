import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import AppRoutes from './routes/Routes'; // Importamos las rutas principales

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes /> {/* Definimos todas las rutas en un solo lugar */}
      </Router>
    </AuthProvider>
  );
}

export default App;
