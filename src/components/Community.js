import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Plus, Home, Users, Bell, Scroll, Menu ,Search, Eye, Heart, MessageCircle, ArrowLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Community = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('인기 게시물'); // Default selected category
  const [selectedPost, setSelectedPost] = useState(null);

  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Reset form and exit write mode
    setFormData({ title: '', category: '', content: '' });
    setIsWriting(false);
  };

  const handleCancelWrite = () => {
    if (window.confirm('작성 중인 내용이 저장되지 않습니다. 정말 나가시겠습니까?')) {
      setFormData({ title: '', category: '', content: '' });
      setIsWriting(false);
    }
  };
   // Sample post data
  // Sample post data with full content
  const [posts, setPosts] = useState([
    {
      id: 1,
      category: '취업/고민 Q&A',
      title: '한국 회사 면접 준비 어떻게 하시나요?',
      content: `다음 주에 한국 회사 면접이 있는데 어떻게 준비하면 좋을지 조언 부탁드립니다. 특히 문화적인 차이에서 오는 부분이 걱정되네요.

1. 한국어로 자기소개는 준비했는데, 더 준비해야 할 부분이 있을까요?
2. 회사 문화 관련해서 꼭 알아야 할 점들이 있나요?
3. 면접 시 복장은 어떻게 하는 것이 좋을까요?

현재 중급 정도의 한국어 실력을 가지고 있고, IT 회사 백엔드 개발자 포지션입니다.
경험 있으신 분들의 조언 부탁드립니다.`,
      author: '취준생123',
      views: 245,
      likes: 18,
      comments: 23
    },
    {
      id: 2,
      category: '한국생활 팁',
      title: '원룸 계약할 때 주의할 점',
      content: `처음 원룸 계약하시는 분들을 위해 제가 겪은 경험을 공유합니다.

1. 계약서 작성 전 체크리스트:
- 전기, 수도, 가스 검침표 확인
- 보일러 작동 상태 체크
- 수압 확인
- 벽 곰팡이 여부 확인
- 방음 상태 체크

2. 계약 시 필요한 서류:
- 신분증
- 계약금
- 인감도장 (있으면 좋음)

3. 주변 환경 체크:
- 대중교통 접근성
- 마트, 편의점 위치
- 심야 시간대 안전성

자세한 내용은 댓글로 질문해주세요!`,
      author: '서울살이',
      views: 567,
      // likes: 45,
      // comments: 32
    }, 
    {
      id: 3,
      category: 'IT 개발 Tips',
      title: '프로그래밍 언어 선택을 위한 조언',
      content: `프로그래밍을 처음 시작하거나 전환하고자 할 때 어떤 언어를 선택하는 것이 좋을까요? 다음을 고려해주세요:

1. 사용하고 싶은 분야 (웹 개발, 데이터 분석, 머신 러닝 등)에 적합한 언어 선택
2. 최신 트렌드와 기업의 요구사항 반영
3. 학습 속도와 접근성

저는 현재 Python을 사용 중이며, JavaScript, Java와 같은 다양한 언어에도 익숙합니다. 다양한 조언과 경험 공유 부탁드립니다!`,
      author: '코딩입문자',
      views: 345,
      likes: 22,
      comments: 19
    },
    {
      id: 4,
      category: '취업정보 및 후기',
      title: '면접에서 자신의 강점을 어떻게 잘 어필할 수 있을까요?',
      content: `면접에서 자신을 어떻게 잘 어필할 수 있을지 궁금합니다. 특히 IT 분야에서 자기 강점을 강조할 때 어떤 점을 중점적으로 이야기해야 할까요?

1. 주요 기술 스택을 경험하면서 얻은 성과
2. 팀 협력 경험과 리더십
3. 문제 해결 능력과 창의적 사고

이 외에 추가적으로 준비할 것이 있을까요? 관련된 경험을 공유해 주세요!`,
      author: '경력직 개발자',
      views: 450,
      likes: 30,
      comments: 25
    }
    // ... other posts
  ]);


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

  const categories = [
    '인기 게시물',
    '취업/고민 Q&A',
    '취업 정보 및 후기',
    '한국생활 팁',
    '자유 게시판'
  ];

    // Modified to handle view increment
    const handlePostClick = (post) => {
      // Increment the view count for the clicked post
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === post.id 
            ? { ...p, views: p.views + 1 }
            : p
        )
      );
      
      // Set the selected post with updated view count
      setSelectedPost({
        ...post,
        views: post.views + 1
      });
    };
  
  
 // Filter posts based on selected category
 const filteredPosts = selectedCategory === '인기 게시물' 
 ? posts // Show all posts for '인기 게시물'
 : posts.filter(post => post.category === selectedCategory);

   // Filter posts based on both category and search value
   const getFilteredPosts = () => {
    let filtered = selectedCategory === '인기 게시물' 
      ? posts 
      : posts.filter(post => post.category === selectedCategory);

    if (searchValue.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filtered;
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setSelectedPost(null); // Clear selected post when searching
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
        {/* Section 1: Title */}
        <div className="py-8 text-center">
          <h1 className="text-3xl font-bold text-black">커뮤니티</h1>
        </div>

        {/* Section 2: Categories and Search */}
        <div className="px-8 flex items-center justify-between mb-8">
          {/* Category Buttons */}
          <div className="flex gap-4">
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => {
                setSelectedCategory(category);
                setSelectedPost(null);
                }}
                className={`px-4 py-2 rounded-full border transition-colors
                ${selectedCategory === category 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
                }
                text-sm font-medium`}
                >
                {category}
              </button>
            ))}
          </div>


           {/* Search and Write */}
           <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="검색"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button 
              onClick={() => setIsWriting(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              글쓰기
            </button>
          </div>
        </div>

       {/* Section 3: Content Area */}
<div className="flex-1 px-8 overflow-y-auto">
  {isWriting ? (
    // Write Post Form
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCancelWrite}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            
          </button>
          <h2 className="text-xl font-bold">글쓰기</h2>
        </div>
        
        <button
          onClick={handleSubmitPost}
          disabled={!formData.title || !formData.category || !formData.content}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          등록
        </button>
      </div>

      <form onSubmit={handleSubmitPost} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리 선택
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">카테고리를 선택하세요</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            placeholder="제목을 입력하세요"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Content Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleFormChange}
            placeholder="내용을 입력하세요"
            required
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      </form>
    </div>
  ) : selectedPost ? (
    // Full Post View
<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <button 
        onClick={() => setSelectedPost(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
        {selectedPost.category}
      </button>
    </div>
    <button
      onClick={async () => {
        try {
          const requestData = {
            data: {
              title: selectedPost.title,
              author: selectedPost.author,
              viewCount: selectedPost.views,
              content: selectedPost.content
            }
          };

          const response = await fetch('https://port-0-realthon-m49ojdhzcd6677d6.sel4.cloudtype.app/user/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(requestData)
          });
          
          console.log('Sending data:', requestData);
          
          if (!response.ok) {
            throw new Error('Translation failed');
          }
          
          const translatedData = await response.json();
          // Update the selected post with all translated fields
          setSelectedPost({
            ...selectedPost,
            title: translatedData.data.title,
            author: translatedData.data.author,
            content: translatedData.data.content,
            isTranslated: true // Optional: add a flag to track translation state
          });
        } catch (error) {
          console.error('Translation error:', error);
          alert('번역 중 오류가 발생했습니다.');
        }
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      {selectedPost.isTranslated ? '원문 보기' : '번역'} {/* Optional: toggle button text */}
    </button>
  </div>

  <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
  
  <div className="flex items-center justify-between mb-6">
    <span className="text-gray-600">{selectedPost.author}</span>
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <div className="flex items-center gap-1">
        <Eye className="w-4 h-4" /> 
        <span>{selectedPost.views}</span>
      </div>
    </div>
  </div>
  
  <div className="prose max-w-none">
    <p className="text-gray-800 whitespace-pre-line">
      {selectedPost.content}
    </p>
  </div>
</div>
  ) : (
    // Posts Grid
    <div className="grid grid-cols-2 gap-6">
      {getFilteredPosts().map((post) => (
        <div 
          key={post.id} 
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handlePostClick(post)} 
        >
          <button className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 mb-3">
            {post.category}
          </button>
          
          <h3 className="text-lg font-bold mb-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.content}
          </p>
          
          <p className="text-sm text-gray-500 mb-4">
            {post.author}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> 
               <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              {/* <Heart className="w-4 h-4" />
              <span>{post.likes}</span> */}
            </div>
            <div className="flex items-center gap-1">
              {/* <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span> */}
            </div>
          </div>
        </div>
      ))}
      {getFilteredPosts().length === 0 && (
        <div className="col-span-2 text-center py-8 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  )}
</div>
      </div>
    </div>
  );
};


export default Community;