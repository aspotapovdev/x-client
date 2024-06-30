import { ConfirmEmailPage } from '@pages/ConfirmEmailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthPage } from '@pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="*" element="not found" />
      </Routes>
    </Router>
  );
}

export default App;
