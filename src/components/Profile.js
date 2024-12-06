import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Plus, Home, Users, Bell, Scroll, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    console.log(localStorage.getItem('accessToken'))
    try {
      const response = await fetch('https://port-0-realthon-m49ojdhzcd6677d6.sel4.cloudtype.app/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Add token if you're using authentication
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setProfileData({
        nickname: data.username,
        birthdate: data.birth,
        languages: data.language,
        phone: data.contact,
        email: data.email,
        address: data.address
      });
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('https://port-0-realthon-m49ojdhzcd6677d6.sel4.cloudtype.app/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          username: profileData.nickname,
          birth: profileData.birthdate,
          language: profileData.languages,
          contact: profileData.phone,
          email: profileData.email,
          address: profileData.address
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
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
      case 'profile':
        navigate('/profile');
        break;
      case '로그아웃':
        localStorage.removeItem('token'); // Clear token on logout
        navigate('/');
        break;
      default:
        break;
    }
  };

  const EditField = ({ label, field, value }) => (
    <div className="flex">
      <div className="w-32 text-gray-600">{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        className="flex-1 bg-white rounded px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
  );

  const DisplayField = ({ label, value }) => (
    <div className="flex">
      <div className="w-32 text-gray-600">{label}</div>
      <div>{value}</div>
    </div>
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

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

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center pt-16 px-4 max-w-4xl mx-auto">
          {/* Profile Picture */}
          {/* <div className="mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          </div> */}

          {/* Edit/Save Button */}
          <div className="w-full mb-4 flex justify-end">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? '저장하기' : '수정하기'}
            </button>
          </div>

          {/* Basic Information Box */}
          <div className="w-full mb-8">
            <h2 className="text-xl font-bold mb-4">기본정보</h2>
            <div className="bg-[#F7F7F5] rounded-lg p-6 space-y-4">
              {isEditing ? (
                <>
                  <EditField label="닉네임" field="nickname" value={profileData?.nickname || ''} />
                  <EditField label="생년월일" field="birthdate" value={profileData?.birthdate || ''} />
                  <EditField label="언어" field="languages" value={profileData?.languages || ''} />
                </>
              ) : (
                <>
                  <DisplayField label="닉네임" value={profileData?.nickname || ''} />
                  <DisplayField label="생년월일" value={profileData?.birthdate || ''} />
                  <DisplayField label="언어" value={profileData?.languages || ''} />
                </>
              )}
            </div>
          </div>

          {/* Contact Information Box */}
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">연락처 정보</h2>
            <div className="bg-[#F7F7F5] rounded-lg p-6 space-y-4">
              {isEditing ? (
                <>
                  <EditField label="전화번호" field="phone" value={profileData?.phone || ''} />
                  <EditField label="이메일" field="email" value={profileData?.email || ''} />
                  <EditField label="주소" field="address" value={profileData?.address || ''} />
                </>
              ) : (
                <>
                  <DisplayField label="전화번호" value={profileData?.phone || ''} />
                  <DisplayField label="이메일" value={profileData?.email || ''} />
                  <DisplayField label="주소" value={profileData?.address || ''} />
                </>
              )}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full mt-8 flex justify-end gap-4 mb-10">
            <button 
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleNavigation('로그아웃')}
            >
              로그아웃
            </button>
            <button 
              className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;