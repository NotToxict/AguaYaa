import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Las páginas (Home, Login, etc.) se renderizarán aquí */}
      <Outlet />
    </div>
  );
}

export default App;