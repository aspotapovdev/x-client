import { store } from '@/store';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { PATHNAMES } from '@constants/pathnames.ts';
import { PeoplePage } from '@pages/PeoplePage';
import { Provider } from 'react-redux';
import { ConfirmEmailPage } from '@pages/ConfirmEmailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthPage } from '@pages/AuthPage';
import { AccountPage } from '@pages/AccountPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={PATHNAMES.root} element={<AuthPage />} />
          <Route path={PATHNAMES.confirmEmail} element={<ConfirmEmailPage />} />
          <Route
            path={PATHNAMES.account}
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHNAMES.people}
            element={
              <ProtectedRoute>
                <PeoplePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element="not found" />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
