import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Plus, Home, Users, Bell, Scroll, Menu } from 'lucide-react';

const ClaudeInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, {
      role: 'user',
      content: inputValue,
      id: prev.length + 1
    }]);
    console.log(messages)
    setInputValue('');
    setIsSearchMode(false);
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
        
        {/* <button 
          onClick={handleHomeClick}
          className="mx-4 my-3 flex items-center gap-3 bg-primary text-white rounded-lg p-3 hover:bg-primary/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {isSidebarOpen && <span>New Chat</span>}
        </button> */}

        <nav className="flex-1 mt-4">
          {['홈','채용공고', '커뮤니티', '서류관리'].map((item, index) => (
            <button
              key={item}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-800 transition-colors"
              onClick={index === 0 ? handleHomeClick : undefined}
            >
              {index === 0 && <Home className="w-5 h-5" />}
              {index === 1 && <Bell className="w-5 h-5" />}
              {index === 2 && <Users className="w-5 h-5" />}
              {index === 3 && <Scroll className="w-5 h-5" />}
              {isSidebarOpen && <span>{item}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Rest of the component remains the same */}
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {!isSearchMode && (
          <header className="flex items-center px-6 py-4 border-b bg-white">
            <MessageSquare className="w-6 h-6 text-primary mr-2" />
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
                    className="w-full rounded-lg border border-gray-300 pl-4 pr-12 py-3 focus:outline-none focus:border-primary resize-none h-12"
                    rows={1}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-2 text-primary hover:bg-primary/10 rounded-lg"
                    disabled={!inputValue.trim()}
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
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary textblack' 
                        : 'bg-white border shadow-sm'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.role === 'assistant' && (
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
                    rows={1}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-2 text-primary hover:bg-primary/10 rounded-lg"
                    disabled={!inputValue.trim()}
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