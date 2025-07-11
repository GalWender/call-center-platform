import { Routes } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';

import renderRoutes from './routes';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <Routes>{renderRoutes()}</Routes>
    </div>
  );
}

export default App;
