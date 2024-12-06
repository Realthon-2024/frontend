import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Plus, Home, Users, Bell, Scroll, Menu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TypeWriter from './TypeWriter';  // Make sure to import the TypeWriter component
import { useNavigate } from 'react-router-dom';
import Community from './Community';

const ClaudeInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        console.log('No tokens found');
        navigate('/');
        return;
      }
      console.log(accessToken)

  
    };

    verifyToken();
  }, [navigate]);
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
//   const getClaudeResponse = async (userMessage) => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const response = `I understand you said: "${userMessage}"\n\nHere's a markdown example response:
    
// ## Sample Response
// - This is a bullet point
// - Here's some *italic* and **bold** text

// \`\`\`python
// def hello_world():
//     print("Hello from Claude!")
// \`\`\`
// `;
//     setIsLoading(false);
//     return response;
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!inputValue.trim() || isLoading || isTyping) return;

  const userMessage = {
    role: 'user',
    content: inputValue,
    id: messages.length + 1
  };
  
  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setIsSearchMode(false);
  setIsLoading(true);

  try {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      throw new Error('No access token found. Please log in again.');
    }

    const requestPayload = {
      content: userMessage.content,
      chatRoomId: 1
    };

    const response = await fetch('https://port-0-realthon-m49ojdhzcd6677d6.sel4.cloudtype.app/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.trim()}`
      },
      body: JSON.stringify(requestPayload)
    });

    if (response.status === 500) {
      throw new Error('Server error. Please try again later.');
    }

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('accessToken');
      navigate('/');
      throw new Error('Authentication failed. Please log in again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the actual content from the response
    const assistantContent = data.content || data.response || 'No response content available';
    
    // Add Claude's response with typing animation
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: assistantContent,
      id: prev.length + 1,
      isTyping: true
    }]);
    setIsTyping(true);

  } catch (error) {
    console.error('Error sending message:', error);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Error: ${error.message}. Please try again or contact support if the issue persists.`,
      id: prev.length + 1,
      isTyping: true
    }]);
    setIsTyping(true);

    if (error.message.includes('authentication') || error.message.includes('log in')) {
      setTimeout(() => navigate('/'), 2000);
    }
  } finally {
    setIsLoading(false);
  }
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
    <div className="flex h-screen bg-gray-50">
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

  {/* Profile Button */}
  <button 
  className="w-full p-4 flex items-center gap-3 hover:bg-gray-800 transition-colors border-t border-gray-700"
  onClick={() => handleNavigation('profile')}
>
  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
    J
  </div>
  {isSidebarOpen && (
    <span>John Doe</span>
  )}
</button>
</nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {!isSearchMode && (
          <header className="flex items-center px-6 py-4 border-b bg-white">
            <MessageSquare className="w-6 h-6 text-black mr-2" />
            <h1 className="text-xl font-semibold">Chat</h1>
          </header>
        )}

        {isSearchMode ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-2xl space-y-6">
              <h1 className="text-4xl font-bold text-center mb-8">무엇을 도와드릴까요?</h1>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Message Claude..."
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      '&::-webkit-scrollbar': {
                        display: 'none'
                      }
                    }}
                    className="w-full rounded-lg border border-gray-300 pl-4 pr-12 py-3 focus:outline-none focus:border-primary resize-none h-12"
                    rows={1}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-2 text-primary hover:bg-primary/10 rounded-lg"
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
               <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user' 
                      ? 'bg-primary text-black' 
                      : 'bg-white border shadow-sm'
                  }`}
                >
                  {message.role === 'assistant' && message.isTyping ? (
                    <TypeWriter 
                      content={message.content}
                      components={components}
                      onComplete={() => handleTypingComplete(message.id)}
                    />
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={components}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  {message.role === 'assistant' && !message.isTyping && (
                    <div className="flex items-center gap-2 mt-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ThumbsUp className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ThumbsDown className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-white border shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
            <div className="border-t bg-white p-4">
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Message Claude..."
                    className="w-full rounded-lg border border-gray-300 pl-4 pr-12 py-3 focus:outline-none focus:border-primary resize-none h-12"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      '&::-webkit-scrollbar': {
                        display: 'none'
                      }
                    }}
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-2 text-primary hover:bg-primary/10 rounded-lg"
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClaudeInterface;