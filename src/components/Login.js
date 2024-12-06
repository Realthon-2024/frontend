import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Plus, Home, Users, Bell, Scroll, Menu, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TypeWriter from './TypeWriter';  // Make sure to import the TypeWriter component
import { useNavigate } from 'react-router-dom';
import Community from './Community';

const Login = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    lang: '',
    birthdate: '',
    phone: '',
    email: '',
    address: ''
  });
  const languages = [
    "Bulgarian",
    "Chinese",
    "Czech",
    "Danish",
    "Dutch",
    "English (US)",
    "English (GB)",
    "Estonian",
    "Finnish",
    "French",
    "German",
    "Greek",
    "Hungarian",
    "Italian",
    "Japanese",
    "Korean",
    "Latvian",
    "Lithuanian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Slovak",
    "Slovenian",
    "Spanish",
    "Swedish"
  ];
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/signin';
      const response = await fetch(`https://port-0-realthon-m49ojdhzcd6677d6.sel4.cloudtype.app${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isSignup ? {
            username: formData.username,
            password: formData.password,
            birthday: formData.birthday,
            contact: formData.contact,
            email: formData.email,
            address: formData.address,
            language: formData.language
          } : {
            username: formData.username,
            password: formData.password
          }
        )
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `${isSignup ? 'Signup' : 'Login'} failed`);
      }
  
      const data = await response.json();
      console.log(`${isSignup ? 'Signup' : 'Login'} successful:`, data);
      
      if (isSignup) {
        // Reset form and switch to login
        setFormData({
          username: '',
          password: '',
          language: '',
          birthday: '',
          contact: '',
          email: '',
          address: ''
        });
        setIsSignup(false);
      } else {
        // Handle successful login
        if (data.accessToken) {
          // Store both tokens separately
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        // Navigate to home page after successful login
        navigate('/main');
      }
    } catch (error) {
      console.error(`${isSignup ? 'Signup' : 'Login'} error:`, error);
      setError(error.message || `An error occurred during ${isSignup ? 'signup' : 'login'}`);
    }
  };

  const handleNavigation = (path) => {
    switch(path) {
      case '홈':
        navigate('/main');
        break;
      case '커뮤니티':
        navigate('/community');
        break;
      case '채용공고':
        navigate('/jobs');
        break;
      case '서류관리':
        navigate('/documents');
        break;
      case 'profile':  // Add this case
        navigate('/profile');
        break;
      default:
        break;
    }
  };
  // Simulated Claude response function
  const getClaudeResponse = async (userMessage) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = `I understand you said: "${userMessage}"\n\nHere's a markdown example response:
    
## Sample Response
- This is a bullet point
- Here's some *italic* and **bold** text

\`\`\`python
def hello_world():
    print("Hello from Claude!")
\`\`\`
`;
    setIsLoading(false);
    return response;
  };

  // Custom components for ReactMarkdown
  const components = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          className="rounded-md"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${className} bg-gray-100 rounded px-1`} {...props}>
          {children}
        </code>
      );
    }
  };

  const handleTypingComplete = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isTyping: false } : msg
    ));
    setIsTyping(false);
  };

  const handleHomeClick = () => {
    setIsSearchMode(true);
    setMessages([]);
    setInputValue('');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xl font-semibold">Claude</span>}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 mt-4 flex flex-col">
  {/* Main Navigation Items */}
  <div className="flex-1">
    {['홈','채용공고', '커뮤니티', '서류관리'].map((item, index) => (
      <button
        key={item}
        className="w-full p-4 flex items-center gap-3 hover:bg-gray-800 transition-colors"
        onClick={() => handleNavigation(item)}
      >
        {index === 0 && <Home className="w-5 h-5" />}
        {index === 1 && <Bell className="w-5 h-5" />}
        {index === 2 && <Users className="w-5 h-5" />}
        {index === 3 && <Scroll className="w-5 h-5" />}
        {isSidebarOpen && <span>{item}</span>}
      </button>
    ))}
  </div>


</nav>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
        {/* Logo and Tagline */}
        <div className="mb-12 text-center">
          <div className="w-32 h-32 bg-gray-900 rounded-full mb-6 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">로고</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 max-w-md">
            취업부터 권리 보호까지 외국인 노동자를 위한 취업 도우미
          </h1>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login Fields */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="아이디"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>


              {/* Additional Signup Fields */}
              {isSignup && (
                <>
                  <div>
                    <input
                      type="date"
                      name="birthday"
                      placeholder="생년월일"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="전화번호"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="주소"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 appearance-none"
                      required
                    >
                      <option value="">언어 선택</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </>
              )}
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-colors font-medium"
            >
              {isSignup ? '회원가입' : '로그인'}
            </button>

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="w-full text-gray-600 text-sm hover:text-gray-900 transition-colors"
            >
              {isSignup ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;