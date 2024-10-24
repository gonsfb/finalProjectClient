
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import MyPage from './components/MyPage';  // Import MyPage
import TemplateBuilder from './components/TemplateBuilder';
import TemplatePage from './components/TemplatePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mypage" element={<MyPage />} /> {/* Add MyPage Route */}
          <Route path="/templatebuilder" element={<TemplateBuilder/>} />
          <Route path="/templates/:id" element={<TemplatePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


