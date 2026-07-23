import React from 'react';
import { useUser } from '../../context/UserContext';
import { SelectOption } from '../../types';
import { FileText, Utensils, Laptop, PackageCheck, Flower2, ArrowRight, Volume2 } from 'lucide-react';

const INTEREST_OPTIONS: (SelectOption & { iconComponent: React.ReactNode })[] = [
  {
    id: '文書處理',
    label: '文書處理與資料輸入',
    iconComponent: <FileText size={36} color="#3b82f6" />,
    icon: '📝',
    description: '使用電腦或表格進行資料鍵入、發票整理與文件分類，環境乾淨安靜。',
    badge: '熱門首選'
  },
  {
    id: '手工作業',
    label: '庇護餐飲與手工包裝',
    iconComponent: <Utensils size={36} color="#10b981" />,
    icon: '🍪',
    description: '餅乾西點製作輔助、禮盒手工包裝與貼標籤，流程固定有圖示。'
  },
  {
    id: '數位媒體',
    label: '數位媒體與文字小幫手',
    iconComponent: <Laptop size={36} color="#8b5cf6" />,
    icon: '💻',
    description: '社群簡單發文排版、文字回應與圖片整理，適合習慣操作智慧裝置者。',
    badge: '可遠端'
  },
  {
    id: '倉儲物流',
    label: '圖書與物品分類管理',
    iconComponent: <PackageCheck size={36} color="#f59e0b" />,
    icon: '📦',
    description: '依據顏色或編號進行商品擺放、圖書歸位與簡單理貨作業。'
  },
  {
    id: '園藝維護',
    label: '綠意植栽與園藝維護',
    iconComponent: <Flower2 size={36} color="#059669" />,
    icon: '🌱',
    description: '植物澆水、盆栽理貨與簡單花草整理，環境自然紓壓。'
  }
];

export const Step1Interests: React.FC = () => {
  const { profile, updateProfile, nextStep, isCounselorReadOnly, speakText } = useUser();

  const toggleInterest = (id: string) => {
    if (isCounselorReadOnly) return;
    const current = profile.interests;
    const updated = current.includes(id)
      ? current.filter(i => i !== id)
      : [...current, id];
    updateProfile({ interests: updated });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>
          請點選您感興趣的工作類型（可多選）：
        </h3>
        <button
          onClick={() => speakText("請選擇您感興趣的工作類型，您可以選擇一個或多個項目。選擇完畢後請點選下一步。")}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '15px' }}
        >
          <Volume2 size={18} />
          <span>朗讀說明</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {INTEREST_OPTIONS.map((opt) => {
          const isSelected = profile.interests.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => toggleInterest(opt.id)}
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '2px solid #e2e8f0' }}>
        <button
          onClick={nextStep}
          disabled={profile.interests.length === 0}
          className="interactive-btn btn-primary pulse-primary"
          style={{
            opacity: profile.interests.length === 0 ? 0.6 : 1,
            cursor: profile.interests.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <span>下一步：工作環境</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
