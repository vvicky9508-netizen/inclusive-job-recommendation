import React from 'react';
import { useUser } from '../../context/UserContext';
import { SelectOption } from '../../types';
import { Sun, Clock, CalendarCheck, Sparkles, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

const SCHEDULE_OPTIONS: (SelectOption & { iconComponent: React.ReactNode })[] = [
  {
    id: 'daytime',
    label: '標準日間全職 (09:00 ~ 17:00)',
    iconComponent: <Sun size={36} color="#f59e0b" />,
    icon: '☀️',
    description: '固定作息時間，週休二日，適合生活作息規律者。'
  },
  {
    id: 'parttime',
    label: '兼職 / 計時工時 (每日 4 小時)',
    iconComponent: <Clock size={36} color="#3b82f6" />,
    icon: '⏱️',
    description: '半日制或每週特定幾天上班，給您充裕時間安排復健與休息。'
  },
  {
    id: 'flexible',
    label: '自主彈性工時 (按件/任務計酬)',
    iconComponent: <CalendarCheck size={36} color="#10b981" />,
    icon: '📆',
    description: '只要在期限內完成目標即可，時間安排極為自由。'
  }
];

export const Step4Schedule: React.FC = () => {
  const { profile, updateProfile, nextStep, prevStep, runLLMAnalysis, isCounselorReadOnly, speakText } = useUser();

  const toggleSchedule = (id: string) => {
    if (isCounselorReadOnly) return;
    const current = profile.schedule;
    const updated = current.includes(id)
      ? current.filter(i => i !== id)
      : [...current, id];
    updateProfile({ schedule: updated });
  };

  const handleGoToResults = async () => {
    await runLLMAnalysis();
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>
          最後一步：請選擇您希望的工作時間型態：
        </h3>
        <button
          onClick={() => speakText("請選擇您希望的工作時間型態。填寫完畢後，點選開始 LLM 智慧分析即可生成職缺推薦結果。")}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '15px' }}
        >
          <Volume2 size={18} />
          <span>朗讀說明</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {SCHEDULE_OPTIONS.map((opt) => {
          const isSelected = profile.schedule.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => toggleSchedule(opt.id)}
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

      {/* Counselor Notes Field */}
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
          💬 補充事項或個人備註 (選填)：
        </label>
        <input
          type="text"
          value={profile.notes}
          disabled={isCounselorReadOnly}
          onChange={(e) => updateProfile({ notes: e.target.value })}
          placeholder="例如：希望靠近捷運出口，或有輔導員陪同面試需求..."
          style={{
            width: '100%',
            padding: '14px 18px',
            fontSize: '17px',
            borderRadius: '12px',
            border: '2px solid #cbd5e1',
            outline: 'none',
            background: isCounselorReadOnly ? '#f1f5f9' : '#ffffff'
          }}
        />
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '2px solid #e2e8f0' }}>
        <button onClick={prevStep} className="interactive-btn btn-secondary">
          <ArrowLeft size={24} />
          <span>上一步</span>
        </button>

        <button
          onClick={handleGoToResults}
          className="interactive-btn btn-accent pulse-primary"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}
        >
          <Sparkles size={24} />
          <span>產生 LLM 職缺推薦與分析</span>
        </button>
      </div>
    </div>
  );
};
