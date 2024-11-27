import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RBACProvider } from './context/RBACContext';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';
import DashboardPage from './pages/DashBoardPage';


const App: React.FC = () => {
  return (
    <RBACProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
        </Routes>
      </Router>
    </RBACProvider>
  );
};

export default App;
