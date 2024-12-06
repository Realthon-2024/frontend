import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClaudeInterface from './components/ClaudeInterface';
import Community from './components/Community';
import Profile from './components/Profile'; 
import Job from './components/Job';
import Login from './components/Login';
import Documents from './components/Documents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<ClaudeInterface />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Job />} />
        <Route path='/documents' element={<Documents />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;