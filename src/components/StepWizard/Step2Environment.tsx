import React from 'react';
import { useUser } from '../../context/UserContext';
import { SelectOption } from '../../types';
import { Building2, User, Users, Home, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

const ENV_OPTIONS: (SelectOption & { iconComponent: React.ReactNode })[] = [
  {
    id: '室內靜態',
    label: '室內靜態獨立空間',
    iconComponent: <Building2 size={36} color="#3b82f6" />,
    icon: '🏢',
    description: '冷氣房辦公室、獨立桌位，光線適中且安靜無噪音干擾。'
  },
  {
    id: '單獨作業',
    label: '單獨自主步調作業',
    iconComponent: <User size={36} color="#8b5cf6" />,
    icon: '👤',
    description: '照著固定流程處理個人任務，不需要高頻率與陌生人對話社交。'
  },
  {
    id: '團隊合作',
    label: '溫馨團隊與導師陪伴',
    iconComponent: <Users size={36} color="#10b981" />,
    icon: '👥',
    description: '有親切的同事與庇護導師在身旁，隨時可提問與互相支援。'
  },
  {
    id: '居家遠端',
    label: '居家遠端 / 免通勤',
    iconComponent: <Home size={36} color="#ec4899" />,
    icon: '🏠',
    description: '在家中使用電腦工作，省去搭車轉乘與交通體力消耗。'
  }
];

export const Step2Environment: React.FC = () => {
  const { profile, updateProfile, nextStep, prevStep, isCounselorReadOnly, speakText } = useUser();

  const toggleEnv = (id: string) => {
    if (isCounselorReadOnly) return;
    const current = profile.environments;
    const updated = current.includes(id)
      ? current.filter(i => i !== id)
      : [...current, id];
    updateProfile({ environments: updated });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>
          請選擇您感到最舒服的工作環境模式：
        </h3>
        <button
          onClick={() => speakText("請選擇您感到最舒服的工作環境模式。可多選，完成後請點選下一步。")}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '15px' }}
        >
          <Volume2 size={18} />
          <span>朗讀說明</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {ENV_OPTIONS.map((opt) => {
          const isSelected = profile.environments.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => toggleEnv(opt.id)}
              className={`option-card ${isSelected ? 'selected' : ''} ${isCounselorReadOnly ? 'disabled' : ''}`}
            >
              <div className="card-checkbox">
                {isSelected && <span style={{ fontWeight: '900', fontSize: '18px' }}>✓</span>}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  {opt.iconComponent}
                  <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                    {opt.label}
                  </h4>
                </div>
                <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.5' }}>
                  {opt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '2px solid #e2e8f0' }}>
        <button onClick={prevStep} className="interactive-btn btn-secondary">
          <ArrowLeft size={24} />
          <span>上一步</span>
        </button>

        <button onClick={nextStep} className="interactive-btn btn-primary">
          <span>下一步：無障礙需求</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
