import { Routes } from 'react-router-dom';

import renderRoutes from './routes';

function App() {
  return (
    <div className="app">
      <Routes>{renderRoutes()}</Routes>
    </div>
  );
}

export default App;
