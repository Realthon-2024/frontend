import {React,useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Calendar, Bookmark, Home, Users, Bell, Scroll, Menu ,Search, Eye, Heart, RotateCcw, ArrowLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Job = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const dropdownRef = useRef(null);


  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState({
    직무: '',
    비자: '',
    지역: '',
    언어: '',
    경력: '',
    고용형태: ''
  });

  const handleReset = () => {
    setSelectedFilters({
      직무: '',
      비자: '',
      지역: '',
      언어: '',
      경력: '',
      고용형태: ''
    });
    setSearchValue('');
    setSelectedPost(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const jobPosts = [
    {
      id: 1,
      company: {
        name: '삼성전자',
        logo: 'https://images.samsung.com/kdp/aboutsamsung/brand_identity/logo/256_144_1.png?$512_288_PNG$'
      },
      title: '전자부품 조립원',
      location: '서울 구로구',
      dueDate: '2024.12.31',
      views: 1520,
      scraps: 80,
      isScraped: false,
      직무: '조립',
      비자: 'H-2',
      지역: '서울',
      언어: ['한국어 (기본)'],
      경력: '무관',
      고용형태: '정규직',
      description: `주요업무
    - 전자부품 조립 및 검사
    - 공정 기준에 따른 작업 수행
    
    자격요건
    - 기본적인 한국어 소통 가능
    - 팀워크를 중요하게 생각하는 분
    
    우대사항
    - 관련 경력자 우대
    - 성실하고 책임감 있는 분`
    },
    {
      id: 2,
      company: {
        name: '쿠팡',
        logo: 'https://play-lh.googleusercontent.com/X5-X2S0t7G9dTGrPftk-5hXijqRDhwWKxGDs2gBm_kNPcAlO3re4exC_8nekvDhz-H0'
      },
      title: '물류 창고 관리자',
      location: '경기도 평택',
      dueDate: '2024.12.20',
      views: 1320,
      scraps: 75,
      isScraped: true,
      직무: '물류',
      비자: 'F-2',
      지역: '경기',
      언어: ['한국어 (기본)', '영어 (우대)'],
      경력: '1년 이상',
      고용형태: '계약직',
      description: `주요업무
    - 물류 창고 재고 관리
    - 물품 입출고 및 분류
    
    자격요건
    - 한국어 기초 소통 가능
    - 체력적으로 문제가 없는 분
    
    우대사항
    - 물류 관리 시스템 경험자
    - 컴퓨터 활용 가능`
    },
    {
      id: 3,
      company: {
        name: '쿠팡',
        logo: 'https://play-lh.googleusercontent.com/X5-X2S0t7G9dTGrPftk-5hXijqRDhwWKxGDs2gBm_kNPcAlO3re4exC_8nekvDhz-H0'
      },
      title: '제과 제조 보조원',
      location: '부산 사하구',
      dueDate: '2024.11.30',
      views: 1540,
      scraps: 90,
      isScraped: false,
      직무: '제조',
      비자: 'E-9',
      지역: '부산',
      언어: ['한국어 (기본)'],
      경력: '무관',
      고용형태: '정규직',
      description: `주요업무
    - 제과 제조 공정 보조
    - 생산 라인 청결 및 위생 관리
    
    자격요건
    - 한국어 기초 소통 가능
    - 야간 근무 가능자
    
    우대사항
    - 관련 경험자 우대
    - 성실하고 꼼꼼한 분`
    },
    {
      id: 4,
      company: {
        name: '쿠팡',
        logo: 'https://play-lh.googleusercontent.com/X5-X2S0t7G9dTGrPftk-5hXijqRDhwWKxGDs2gBm_kNPcAlO3re4exC_8nekvDhz-H0'
      },
      title: '청소 및 시설 관리',
      location: '서울 강남구',
      dueDate: '2024.12.15',
      views: 1230,
      scraps: 50,
      isScraped: true,
      직무: '시설 관리',
      비자: 'H-2',
      지역: '서울',
      언어: ['한국어 (기본)'],
      경력: '무관',
      고용형태: '계약직',
      description: `주요업무
    - 공장 및 사무실 청소
    - 시설 내 위생 관리
    
    자격요건
    - 기본적인 한국어 가능
    - 성실하고 신체 건강한 분
    
    우대사항
    - 관련 직무 경험자
    - 팀 작업에 익숙한 분`
    },
    {
      id: 5,
      company: {
        name: '쿠팡',
        logo: 'https://play-lh.googleusercontent.com/X5-X2S0t7G9dTGrPftk-5hXijqRDhwWKxGDs2gBm_kNPcAlO3re4exC_8nekvDhz-H0'
      },
      title: '건설 현장 보조원',
      location: '인천 연수구',
      dueDate: '2024.12.10',
      views: 1650,
      scraps: 110,
      isScraped: false,
      직무: '건설',
      비자: 'E-10',
      지역: '인천',
      언어: ['한국어 (기본)'],
      경력: '무관',
      고용형태: '정규직',
      description: `주요업무
    - 건설 현장 작업 보조
    - 현장 정리 및 자재 운반
    
    자격요건
    - 한국어 기초 소통 가능
    - 신체 건강하고 체력 좋은 분
    
    우대사항
    - 관련 작업 경험자
    - 안전 장비 사용 경험`
    }
  ];
  const [jobs, setJobs] = useState(jobPosts);


  const filterOptions = {
    '직무': ['개발', '건설', '시설관리', '제조', '경영'],
    '비자': ['F-2-1', 'F-4', 'F-5', 'E-7', 'D-2'],
    '지역': ['서울', '부산', '대구', '인천', '광주'],
    '언어': ['한국어', '영어', '일본어', '중국어'],
    '경력': ['신입', '1~3년', '3~5년', '5~10년', '10년 이상'],
    '고용형태': ['정규직', '계약직', '인턴', '파견직']
  };

  const handleScrap = (e, id) => {
    e.stopPropagation(); // Prevent triggering the job post click
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === id 
          ? { 
              ...job, 
              isScraped: !job.isScraped,
              scraps: job.isScraped ? job.scraps - 1 : job.scraps + 1 
            }
          : job
      )
    );
  };
  
  const handleJobClick = (jobId) => {
    // Increment view count
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId
          ? { ...job, views: job.views + 1 }
          : job
      )
    );
    // Set selected post
    setSelectedPost(selectedPost?.id === jobId ? null : jobs.find(job => job.id === jobId));
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

  const categories = [
    '직무',
    '비자',
    '지역',
    '언어',
    '경력',
    '고용형태'
  ];

  const handleFilterSelect = (category, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === option ? '' : option // Toggle filter if clicking the same option
    }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  const getFilteredJobs = () => {
    return jobs.filter(job => {
      // Check if job matches all selected filters
      return Object.entries(selectedFilters).every(([category, selectedValue]) => {
        if (!selectedValue) return true; // Skip empty filters
        
        if (category === '언어') {
          // Special handling for languages array
          return job[category].includes(selectedValue);
        }
        
        return job[category] === selectedValue;
      });
    }).filter(job => {
      // Apply search filter if search value exists
      if (!searchValue.trim()) return true;
      return job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
             job.company.name.toLowerCase().includes(searchValue.toLowerCase());
    });
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
        {/* Title */}
        <div className="py-8 text-center">
          <h1 className="text-3xl font-bold text-black">채용공고</h1>
        </div>

        {/* Filters and Search */}
        <div className="px-8 flex items-center justify-between mb-8">
          {/* Filter Dropdowns */}
          <div className="flex gap-4" ref={dropdownRef}>
  {Object.entries(filterOptions).map(([category, options]) => (
    <div key={category} className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === category ? null : category)}
        className={`px-4 py-2 rounded-full border ${
          selectedFilters[category] 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : 'border-gray-300 bg-white text-gray-700'
        } hover:bg-gray-50 text-sm font-medium flex items-center gap-2`}
      >
        {selectedFilters[category] || category}
        <ChevronDown className="w-4 h-4" />
      </button>
      {openDropdown === category && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                selectedFilters[category] === option ? 'bg-blue-50 text-blue-700' : ''
              }`}
              onClick={() => handleFilterSelect(category, option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

          {/* Search */}
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
    onClick={handleReset}
    className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
  >
    <RotateCcw className="w-4 h-4" />
  </button>
        </div>

     {/* Job Listings */}
{/* Job Listings */}
<div className="flex-1 px-8 overflow-y-auto">
  <div className="space-y-4">
    {getFilteredJobs().map((job) => (

      <div 
        key={job.id}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleJobClick(job.id)}
      >
        <div className="flex items-center gap-6">
          {/* Company Logo */}
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-16 h-16 rounded-lg object-cover"
          />

          {/* Job Details */}
          <div className="flex-1">
            <div className="text-gray-600 mb-1">{job.company.name}</div>
            <h3 className="text-lg font-bold mb-2">{job.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>~{job.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{job.views}</span>
            </div>
            <button
              onClick={(e) => handleScrap(e, job.id)}
              className={`flex items-center gap-1 ${
                job.isScraped ? 'text-blue-500' : 'text-gray-500'
              } hover:scale-110 transition-transform`}
            >
              <Bookmark className={`w-4 h-4 ${job.isScraped ? 'fill-current' : ''}`} />
              <span>{job.scraps}</span>
            </button>
          </div>
        </div>

        {/* Expanded Description */}
        {selectedPost?.id === job.id && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <pre className="whitespace-pre-line text-gray-700 font-sans">
              {job.description}
            </pre>
            <div className="mt-6 flex justify-end">
              {/* <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add application logic here
                }}
              >
                지원하기
              </button> */}
            </div>
          </div>
        )}
      </div>
    ))}
    {getFilteredJobs().length === 0 && (
      <div className="text-center py-8 text-gray-500">
        검색 결과가 없습니다.
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default Job;