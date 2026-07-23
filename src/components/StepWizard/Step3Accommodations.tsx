import React from 'react';
import { useUser } from '../../context/UserContext';
import { SelectOption } from '../../types';
import { Wheelchair as WheelchairIcon, HeartHandshake, FileImage, Shield, Timer, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

const ACCOMMODATIONS: (SelectOption & { iconComponent: React.ReactNode })[] = [
  {
    id: 'wheelchair',
    label: '無障礙坡道與輪椅設施',
    iconComponent: <WheelchairIcon size={36} color="#3b82f6" />,
    icon: '♿',
    description: '場所需具備斜坡道、電梯、寬走道與無障礙專用洗手間。',
    badge: '無障礙'
  },
  {
    id: 'mentor',
    label: '1對1 輔導員或導師陪伴',
    iconComponent: <HeartHandshake size={36} color="#ec4899" />,
    icon: '🤝',
    description: '報到初期有專人帶領學習，並提供耐心指導與心理支持。'
  },
  {
    id: 'visual_sop',
    label: '圖示化說明與清晰 SOP',
    iconComponent: <FileImage size={36} color="#8b5cf6" />,
    icon: '📋',
    description: '工作步驟以圖片、卡片或標籤清楚標記，易於對照學習。'
  },
  {
    id: 'light_physical',
    label: '避免搬運重物 / 低體力負擔',
    iconComponent: <Shield size={36} color="#10b981" />,
    icon: '🦾',
    description: '工作過程免扛重物（< 5kg），或提供搬運替代車輛輔助。'
  },
  {
    id: 'flexible_rest',
    label: '定時彈性休息安排',
    iconComponent: <Timer size={36} color="#f59e0b" />,
    icon: '⏰',
    description: '每工作 45-60 分鐘提供 10 分鐘定點休息伸展時間。'
  }
];

export const Step3Accommodations: React.FC = () => {
  const { profile, updateProfile, nextStep, prevStep, isCounselorReadOnly, speakText } = useUser();

  const toggleAcc = (id: string) => {
    if (isCounselorReadOnly) return;
    const current = profile.accommodations;
    const updated = current.includes(id)
      ? current.filter(i => i !== id)
      : [...current, id];
    updateProfile({ accommodations: updated });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>
          您需要哪些無障礙設施或特別照顧輔助？
        </h3>
        <button
          onClick={() => speakText("請勾選您所需要的無障礙設施或輔導員照顧。這些選項將用於 LLM 的職缺匹配計算。")}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '15px' }}
        >
          <Volume2 size={18} />
          <span>朗讀說明</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {ACCOMMODATIONS.map((opt) => {
          const isSelected = profile.accommodations.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => toggleAcc(opt.id)}
              className={`option-card ${isSelected ? 'selected' : ''} ${isCounselorReadOnly ? 'disabled' : ''}`}
            >
              <div className="card-checkbox">
                {isSelected && <span style={{ fontWeight: '900', fontSize: '18px' }}>✓</span>}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {opt.iconComponent}
                    <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                      {opt.label}
                    </h4>
                  </div>
                  {opt.badge && <span className="badge">{opt.badge}</span>}
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
          <span>下一步：工作時間</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
