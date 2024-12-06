import React, { useState } from 'react';
import { Camera, ArrowLeft } from 'lucide-react';

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
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold">이력서 작성</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-6">인적정보</h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Profile Picture */}
            <div className="col-span-2 flex items-center gap-6">
              <div className="relative">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfileImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              <div className="text-sm text-gray-500">
                프로필 사진을 추가해주세요
              </div>
            </div>

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

export default ResumeForm;