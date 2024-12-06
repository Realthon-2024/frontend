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
      title: '프론트엔드 개발자 (React)',
      location: '서울 서초구',
      dueDate: '2024.12.31',
      views: 1234,
      scraps: 56,
      isScraped: false,
      직무: '개발',
      비자: 'F-4',
      지역: '서울',
      언어: ['한국어', '영어'],
      경력: '3~5년',
      고용형태: '정규직',
      description: `주요업무
  - React 기반의 웹 애플리케이션 개발
  - 사용자 인터페이스 구현 및 개선
  - 성능 최적화 및 테스트 코드 작성
  
  자격요건
  - 3년 이상의 React 개발 경험
  - JavaScript/TypeScript 능숙자
  - RESTful API 연동 경험
  
  우대사항
  - Next.js, Redux 사용 경험
  - 웹 접근성 및 반응형 디자인 이해
  - Git 버전 관리 시스템 사용 경험`
    },
    {
      id: 2,
      company: {
        name: '네이버',
        logo: 'https://media.licdn.com/dms/image/v2/C560BAQECT6Sd8Jz7Ug/company-logo_200_200/company-logo_200_200/0/1659403404968/naver_logo?e=2147483647&v=beta&t=Zsz4jSjjBr6BH5KWGZOlQXPGfpSk4uc8-10cL23N11Q'
      },
      title: '클라우드 개발자',
      location: '부산 서구',
      dueDate: '2024.12.31',
      views: 985,
      scraps: 78,
      isScraped: true,
      직무: '클라우드',
      비자: 'E-2',
      지역: '부산',
      언어: ['한국어', '영어'],
      경력: '1~3년',
      고용형태: '인턴',
      description: `주요업무
  - 클라우드 서비스 유지보수 및 개발
  - 신규 클라우드 인프라 설계 및 구축
  - DevOps 환경 개선
  
  자격요건
  - 클라우드 관련 경험 (AWS, Azure 등)
  - Linux 서버 관리 능숙자
  - Bash 및 Python 스크립트 작성 가능
  
  우대사항
  - Terraform, Ansible 사용 경험
  - 대규모 시스템 설계 경험
  - Kubernetes 관리 경험`
    },
    {
      id: 3,
      company: {
        name: '카카오',
        logo: 'https://img.icons8.com/color/200/kakao-talk.png'
      },
      title: '백엔드 개발자 (Java)',
      location: '경기도 판교',
      dueDate: '2024.12.15',
      views: 2034,
      scraps: 112,
      isScraped: false,
      직무: '개발',
      비자: 'H-1',
      지역: '경기',
      언어: ['한국어', '영어'],
      경력: '5년 이상',
      고용형태: '정규직',
      description: `주요업무
  - Java 기반 백엔드 API 개발 및 유지보수
  - 대규모 데이터 처리 및 최적화
  - 데이터베이스 설계 및 관리
  
  자격요건
  - Java와 Spring Framework에 능숙
  - SQL 및 데이터베이스 최적화 경험
  - RESTful API 설계 경험
  
  우대사항
  - Kafka, RabbitMQ 경험
  - Docker 및 컨테이너 활용 경험
  - 시스템 아키텍처 설계 경험`
    },
    {
      id: 4,
      company: {
        name: 'LG전자',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/LG_logo_%282015%29.svg/1200px-LG_logo_%282015%29.svg.png'
      },
      title: '데이터 분석가',
      location: '서울 강남구',
      dueDate: '2024.11.30',
      views: 1450,
      scraps: 65,
      isScraped: false,
      직무: '데이터 분석',
      비자: 'F-5',
      지역: '서울',
      언어: ['한국어', '영어'],
      경력: '2~4년',
      고용형태: '계약직',
      description: `주요업무
  - 대규모 데이터 분석 및 시각화
  - 머신러닝 모델 개발 및 유지보수
  - 데이터 기반의 비즈니스 인사이트 도출
  
  자격요건
  - Python 및 R에 능숙
  - SQL 데이터 처리 경험
  - 데이터 시각화 도구(Tableau, Power BI) 활용 가능
  
  우대사항
  - 머신러닝 프로젝트 경험
  - Hadoop/Spark 사용 경험
  - 통계학/수학 배경 지식`
    },
    {
      id: 5,
      company: {
        name: '라인',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/LINE_logo.svg/1200px-LINE_logo.svg.png'
      },
      title: '모바일 앱 개발자 (iOS)',
      location: '인천 송도구',
      dueDate: '2024.12.20',
      views: 1890,
      scraps: 92,
      isScraped: true,
      직무: '모바일 개발',
      비자: 'D-2',
      지역: '인천',
      언어: ['한국어', '영어'],
      경력: '3~5년',
      고용형태: '정규직',
      description: `주요업무
  - iOS 플랫폼용 모바일 애플리케이션 개발
  - UI/UX 개선 및 유지보수
  - 최신 Apple 기술 적용
  
  자격요건
  - Swift 및 Objective-C에 능숙
  - iOS 앱 출시 경험
  - MVVM 아키텍처 이해
  
  우대사항
  - SwiftUI 및 Combine 사용 경험
  - 모바일 성능 최적화 경험
  - 코어 데이터 또는 Realm 사용 경험`
    }
  ];
  
  const [jobs, setJobs] = useState(jobPosts);


  const filterOptions = {
    '직무': ['개발', '디자인', '마케팅', '영업', '경영'],
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
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add application logic here
                }}
              >
                지원하기
              </button>
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