import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  PaymentsPage,
} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<LoginPage />}></Route>
        <Route exact path='login' element={<LoginPage />}></Route>
        <Route exact path='payments' element={<PaymentsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
