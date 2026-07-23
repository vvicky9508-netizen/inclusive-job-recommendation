import React from 'react';
import { useUser } from '../context/UserContext';
import { StepNumber } from '../types';
import { CheckCircle2, Volume2 } from 'lucide-react';

interface StepInfo {
  step: StepNumber;
  title: string;
  subtitle: string;
}

const STEPS: StepInfo[] = [
  { step: 1, title: '工作興趣領域', subtitle: '選擇您喜歡或想嘗試的工作類型' },
  { step: 2, title: '偏好工作環境', subtitle: '選擇您最舒適安心的作息環境' },
  { step: 3, title: '無障礙與特別需求', subtitle: '告訴我們輔具與設施協助需求' },
  { step: 4, title: '工作時間偏好', subtitle: '選擇您方便工作的時段與型態' },
  { step: 5, title: 'LLM 智慧推薦與調整', subtitle: '專屬職缺分析報告與條件動態微調' }
];

export const ProgressBar: React.FC = () => {
  const { currentStep, setCurrentStep, isCounselorReadOnly, speakText } = useUser();

  const currentInfo = STEPS.find(s => s.step === currentStep) || STEPS[0];
  const progressPercent = Math.round(((currentStep - 1) / 4) * 100);

  return (
    <div style={{ background: '#ffffff', borderRadius: '24px', padding: '28px', marginBottom: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: '2px solid #e2e8f0' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <span style={{ background: '#eff6ff', color: '#2563eb', fontWeight: '800', fontSize: '16px', padding: '4px 14px', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
              步驟 {currentStep} / 5
            </span>
            <button
              onClick={() => speakText(`步驟${currentStep}：${currentInfo.title}。${currentInfo.subtitle}`)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#3b82f6', fontSize: '15px', fontWeight: '600' }}
            >
              <Volume2 size={18} />
              <span>語音導覽</span>
            </button>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>
            {currentInfo.title}
          </h2>
          <p style={{ fontSize: '17px', color: '#64748b', marginTop: '2px' }}>
            {currentInfo.subtitle}
          </p>
        </div>

        {/* Completion percentage badge */}
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '32px', fontWeight: '900', color: '#2563eb', fontFamily: 'Outfit, sans-serif' }}>
            {progressPercent}%
          </span>
          <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>
            進度完成率
          </p>
        </div>
      </div>

      {/* Main Bar */}
      <div style={{ height: '14px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '10px',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>

      {/* Step Dots Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginTop: '24px' }}>
        {STEPS.map((s) => {
          const isActive = s.step === currentStep;
          const isCompleted = s.step < currentStep;

          return (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className="interactive-btn"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justify: 'center',
                padding: '12px 8px',
                minHeight: '64px',
                borderRadius: '16px',
                border: isActive ? '3px solid #2563eb' : isCompleted ? '2px solid #93c5fd' : '2px solid #e2e8f0',
                background: isActive ? '#eff6ff' : isCompleted ? '#ffffff' : '#f8fafc',
                color: isActive ? '#1e40af' : isCompleted ? '#2563eb' : '#94a3b8',
                boxShadow: isActive ? '0 4px 14px rgba(37,99,235,0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: '800' }}>
                {isCompleted ? <CheckCircle2 size={18} color="#2563eb" /> : <span>第 {s.step} 步</span>}
              </div>
              <span style={{ fontSize: '13px', marginTop: '2px', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
