import {React, useState} from 'react';
import { Home, Users, Bell, Scroll, Menu, Eye, Heart, Bookmark, MapPin, Calendar,Camera, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const Documents = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('이력서 관리');
  const [selectedStatus, setSelectedStatus] = useState('지원현황');
  const [isCreatingResume, setIsCreatingResume] = useState(false);

  

  const navigate = useNavigate();

    // Sample application data with counts
  const applicationStats = {
    '지원현황': 12,
    '지원완료': 5,
    '면접': 3,
    '채용확정': 2,
    '취소/거절': 2
  };


  // Sample resume data
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "신입 프론트엔드 개발자 이력서",
      lastModified: "2024.12.01",
      status: "작성완료",
      views: 45,
      language: "한국어",
      content: {
        basicInfo: {
          name: "홍길동",
          email: "hong@email.com",
          phone: "010-1234-5678"
        },
        education: "서울대학교 컴퓨터공학과",
        experience: [
          "ABC 회사 인턴십 (2023.06 - 2023.12)",
          "대학교 웹 개발 프로젝트 리드"
        ],
        skills: ["React", "JavaScript", "HTML/CSS", "Node.js"]
      }
    },
    {
      id: 2,
      title: "경력직 풀스택 개발자 이력서",
      lastModified: "2024.11.28",
      status: "작성중",
      views: 12,
      language: "영어",
      content: {
        basicInfo: {
          name: "김철수",
          email: "kim@email.com",
          phone: "010-5678-1234"
        },
        education: "한양대학교 소프트웨어학과",
        experience: [
          "XYZ 테크 시니어 개발자 (2020-2023)",
          "DEF 스타트업 풀스택 개발자 (2018-2020)"
        ],
        skills: ["React", "Python", "AWS", "MongoDB"]
      }
    }
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
      case 'profile':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  const handleResumeClick = (resumeId) => {
    setSelectedStatus(selectedStatus?.id === resumeId ? null : resumes.find(resume => resume.id === resumeId));
  };

  const handleDeleteResume = (e, resumeId) => {
    e.stopPropagation();
    if (window.confirm('이력서를 삭제하시겠습니까?')) {
      setResumes(prevResumes => prevResumes.filter(resume => resume.id !== resumeId));
      if (selectedStatus?.id === resumeId) {
        setSelectedStatus(null);
      }
    }
  };

  const renderContent = () => {
    if (selectedCategory === '이력서 관리') {
        if (isCreatingResume) {
            return <ResumeForm onBack={() => setIsCreatingResume(false)} />;
          }
          if (selectedStatus) {
            return (
              <ResumeViewer 
                resume={selectedStatus}
                onBack={() => setSelectedStatus(null)}
                onEdit={(updatedData) => {
                  // Handle the updated resume data here
                  console.log('Updated resume:', updatedData);
                  setSelectedStatus(null);
                }}
              />
            );
          }
      return (
        <div className="space-y-4">
          {/* Add New Resume Button */}
          <button 
          onClick={() => setIsCreatingResume(true)}
            className="w-full p-6 rounded-lg border-2 border-dashed border-gray-300 
                       hover:border-login hover:text-login transition-colors
                       flex items-center justify-center gap-2 text-gray-500"
          >
            <Plus className="w-5 h-5" />
            새 이력서 작성하기
          </button>

          {/* Resume Cards */}
          {resumes.map((resume) => (
            <div 
              key={resume.id}
              onClick={() => handleResumeClick(resume.id)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{resume.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      resume.status === '작성완료' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {resume.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>최종 수정: {resume.lastModified}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* <Eye className="w-4 h-4" />
                      <span>조회수: {resume.views}</span> */}
                    </div>
                    <div className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {resume.language}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add edit logic
                    }}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => handleDeleteResume(e, resume.id)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {selectedStatus?.id === resume.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">기본 정보</h4>
                      <div className="text-gray-600">
                        <p>이름: {resume.content.basicInfo.name}</p>
                        <p>이메일: {resume.content.basicInfo.email}</p>
                        <p>연락처: {resume.content.basicInfo.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">학력</h4>
                      <p className="text-gray-600">{resume.content.education}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">경력</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {resume.content.experience.map((exp, index) => (
                          <li key={index}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">기술 스택</h4>
                      <div className="flex flex-wrap gap-2">
                        {resume.content.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add preview logic
                      }}
                    >
                      미리보기
                    </button>
                    <button
                      className="px-4 py-2 bg-login text-white rounded-lg hover:opacity-90"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add edit logic
                      }}
                    >
                      수정하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (selectedCategory === '지원현황') {
        return (
          <div>
            {/* Status Filter Bar */}
            <div className="flex gap-4 mb-8">
              {Object.entries(applicationStats).map(([status, count]) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex-1 relative px-6 py-3 text-sm font-medium rounded-lg transition-colors
                    ${selectedStatus === status 
                      ? 'bg-login text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{status}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full 
                      ${selectedStatus === status
                        ? 'bg-white text-login'
                        : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
  
            {/* Application List Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center text-gray-500">
                {selectedStatus} 내역이 여기에 표시됩니다.
              </div>
            </div>
          </div>
        );
      }
  
      return (
        <div className="text-center py-8 text-gray-500">
          {selectedCategory} 컨텐츠가 여기에 표시됩니다.
        </div>
      );
    };
  
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white fixed h-full flex flex-col`}>
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
  
            <button 
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-800 transition-colors border-t border-gray-700"
              onClick={() => handleNavigation('profile')}
            >
              <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
                J
              </div>
              {isSidebarOpen && <span>John Doe</span>}
            </button>
          </nav>
        </div>
  
        {/* Main Content */}
        <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {/* Title */}
          <div className="py-8 text-center">
            <h1 className="text-3xl font-bold text-black">나의 취업관리</h1>
          </div>
  
          {/* Category Buttons */}
          <div className="px-8 mb-8">
            <div className="flex gap-4">
              {['이력서 관리', '지원현황', '스크랩'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors
                    ${selectedCategory === category 
                      ? 'bg-login text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
  
          {/* Content Area */}
          <div className="px-8 pb-8">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  };
  const ResumeForm = ({ onBack }) => {
    const [formData, setFormData] = useState({
      personalInfo: {
        name: '',
        birthdate: '',
        nationality: '',
        visaStatus: '',
        phone: '',
        address: '',
        koreanLevel: '',
        languages: '',
      },
      education: '',
      experience: '',
      motivation: ''
    });
  
    const [profileImage, setProfileImage] = useState(null);
    const koreanLevels = ['초급', '중급', '고급', '원어민'];
  
    const handleInputChange = (section, field, value) => {
      setFormData(prev => ({
        ...prev,
        [section]: section === 'personalInfo' 
          ? { ...prev.personalInfo, [field]: value }
          : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      onBack();  // Return to resume list after submission
    };
  
    return (
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-6">인적정보</h3>
            
            <div className="grid grid-cols-2 gap-6">
             
  
              {/* Text Input Fields */}
              {[
                { label: '이름', field: 'name', placeholder: '이름을 입력하세요' },
                { label: '생년월일', field: 'birthdate', type: 'date' },
                { label: '국적', field: 'nationality', placeholder: '국적을 입력하세요' },
                { label: '체류자격', field: 'visaStatus', placeholder: '체류자격을 입력하세요' },
                { label: '연락처', field: 'phone', placeholder: '연락처를 입력하세요' },
                { label: '주소', field: 'address', placeholder: '주소를 입력하세요' }
              ].map(({ label, field, type = 'text', placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formData.personalInfo[field]}
                    onChange={(e) => handleInputChange('personalInfo', field, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-login"
                    placeholder={placeholder}
                  />
                </div>
              ))}
  
              {/* Korean Level Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  한국어 능력 수준
                </label>
                <select
                  value={formData.personalInfo.koreanLevel}
                  onChange={(e) => handleInputChange('personalInfo', 'koreanLevel', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-login"
                >
                  <option value="">선택하세요</option>
                  {koreanLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
  
              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  구사 가능한 언어
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.languages}
                  onChange={(e) => handleInputChange('personalInfo', 'languages', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-login"
                  placeholder="예: 영어, 일본어"
                />
              </div>
            </div>
          </div>
  
          {/* Other Sections */}
          {[
            { title: '학력/자격', field: 'education', placeholder: '학력 및 자격사항을 입력하세요' },
            { title: '경력사항', field: 'experience', placeholder: '경력사항을 입력하세요' },
            { title: '지원동기', field: 'motivation', placeholder: '지원동기를 입력하세요' }
          ].map(({ title, field, placeholder }) => (
            <div key={field} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-6">{title}</h3>
              <textarea
                value={formData[field]}
                onChange={(e) => handleInputChange(field, null, e.target.value)}
                className="w-full h-40 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-login resize-none"
                placeholder={placeholder}
              />
            </div>
          ))}
  
          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-login text-white rounded-lg hover:opacity-90"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    );
  };

  
const ResumeViewer = ({ resume, onBack, onEdit }) => {
    // Safely extract values from resume with defaults
    const {
      title = '',
      status = '',
      language = '',
      content = {
        basicInfo: {
          name: '',
          email: '',
          phone: ''
        },
        education: '',
        experience: [],
        skills: []
      }
    } = resume || {};
  
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      personalInfo: {
        name: content?.basicInfo?.name || '',
        birthdate: '',
        nationality: '',
        visaStatus: '',
        phone: content?.basicInfo?.phone || '',
        address: '',
        koreanLevel: '',
        languages: '',
        email: content?.basicInfo?.email || ''
      },
      education: content?.education || '',
      experience: Array.isArray(content?.experience) ? content.experience.join('\n') : '',
      motivation: ''
    });
  
    const [profileImage, setProfileImage] = useState(null);
    const koreanLevels = ['초급', '중급', '고급', '원어민'];
  
    const handleInputChange = (section, field, value) => {
      setFormData(prev => ({
        ...prev,
        [section]: section === 'personalInfo' 
          ? { ...prev.personalInfo, [field]: value }
          : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onEdit(formData);
      onBack();
    };
  
    return (
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">인적정보</h3>
              <div className="flex gap-2">
                {language && (
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                    {language}
                  </span>
                )}
                {status && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    status === '작성완료' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {status}
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
    
  
              {/* Text Input Fields */}
              {[
                { label: '제목', field: 'title' },
                { label: '이름', field: 'name' },
                { label: '생년월일', field: 'birthdate', type: 'date' },
                { label: '국적', field: 'nationality' },
                { label: '체류자격', field: 'visaStatus' },
                { label: '연락처', field: 'phone' },
                { label: '주소', field: 'address' }
              ].map(({ label, field, type = 'text' }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formData.personalInfo[field]}
                    onChange={(e) => handleInputChange('personalInfo', field, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    readOnly={!isEditing}
                  />
                </div>
              ))}
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  한국어 능력 수준
                </label>
                <select
                  value={formData.personalInfo.koreanLevel}
                  onChange={(e) => handleInputChange('personalInfo', 'koreanLevel', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  disabled={!isEditing}
                >
                  <option value="">선택하세요</option>
                  {koreanLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  구사 가능한 언어
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.languages}
                  onChange={(e) => handleInputChange('personalInfo', 'languages', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="예: 영어, 일본어"
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>
  
          {/* Other Sections */}
          {[
            { title: '학력/자격', field: 'education' },
            { title: '경력사항', field: 'experience' },
            { title: '지원동기', field: 'motivation' }
          ].map(({ title, field }) => (
            <div key={field} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-6">{title}</h3>
              <textarea
                value={formData[field]}
                onChange={(e) => handleInputChange(field, null, e.target.value)}
                className="w-full h-40 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
                readOnly={!isEditing}
              />
            </div>
          ))}
  
          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              뒤로가기
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:opacity-90"
            >
              {isEditing ? '수정완료' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  
  export default Documents;
   