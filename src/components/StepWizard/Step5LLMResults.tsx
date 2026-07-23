import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Sparkles, Sliders, RefreshCw, Star, MapPin, DollarSign, HeartHandshake, CheckCircle, AlertCircle, ArrowLeft, Volume2, Code } from 'lucide-react';

export const Step5LLMResults: React.FC = () => {
  const { profile, updateProfile, llmResult, isAnalyzing, runLLMAnalysis, prevStep, favorites, toggleFavorite, isCounselorReadOnly, speakText } = useUser();
  const [showJsonInspector, setShowJsonInspector] = useState(false);

  const toggleModifier = (key: keyof typeof profile.llmModifiers) => {
    if (isCounselorReadOnly) return;
    const currentVal = profile.llmModifiers[key];
    updateProfile({
      llmModifiers: {
        ...profile.llmModifiers,
        [key]: !currentVal
      }
    });
  };

  const handleCustomPromptChange = (val: string) => {
    if (isCounselorReadOnly) return;
    updateProfile({
      llmModifiers: {
        ...profile.llmModifiers,
        customPrompt: val
      }
    });
  };

  return (
    <div className="animate-fade-in">
      
      {/* Dynamic LLM Adjuster Panel */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '28px', color: 'white', marginBottom: '32px', boxShadow: '0 12px 30px rgba(15,23,42,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#8b5cf6', padding: '10px', borderRadius: '14px', color: 'white' }}>
              <Sliders size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#f8fafc' }}>
                LLM 智慧推薦調整區
              </h3>
              <p style={{ fontSize: '15px', color: '#94a3b8' }}>
                您可以切換以下權限參數，LLM 模型將動態微調適配分數與說明
              </p>
            </div>
          </div>

          <button
            onClick={() => speakText("這是 LLM 智慧推薦調整區。您可以點選切換按鈕調整分析偏好，並點選重新計算。")}
            style={{ color: '#cbd5e1', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Volume2 size={16} />
            <span>朗讀調整說明</span>
          </button>
        </div>

        {/* Modifiers Toggles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          
          <button
            onClick={() => toggleModifier('reducePhysicalLoad')}
            className={`interactive-btn ${profile.llmModifiers.reducePhysicalLoad ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              justify: 'space-between',
              padding: '12px 20px',
              minHeight: '54px',
              fontSize: '16px',
              background: profile.llmModifiers.reducePhysicalLoad ? '#3b82f6' : 'rgba(255,255,255,0.08)',
              borderColor: profile.llmModifiers.reducePhysicalLoad ? '#60a5fa' : 'rgba(255,255,255,0.2)',
              color: 'white'
            }}
          >
            <span>🦾 降低體力負擔 (體力 -50%)</span>
            <span>{profile.llmModifiers.reducePhysicalLoad ? '已開啟' : '未開啟'}</span>
          </button>

          <button
            onClick={() => toggleModifier('emphasizeMentorship')}
            className={`interactive-btn ${profile.llmModifiers.emphasizeMentorship ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              justify: 'space-between',
              padding: '12px 20px',
              minHeight: '54px',
              fontSize: '16px',
              background: profile.llmModifiers.emphasizeMentorship ? '#8b5cf6' : 'rgba(255,255,255,0.08)',
              borderColor: profile.llmModifiers.emphasizeMentorship ? '#c084fc' : 'rgba(255,255,255,0.2)',
              color: 'white'
            }}
          >
            <span>🤝 優先一對一導師陪伴</span>
            <span>{profile.llmModifiers.emphasizeMentorship ? '已開啟' : '未開啟'}</span>
          </button>

          <button
            onClick={() => toggleModifier('preferRemoteFlexible')}
            className={`interactive-btn ${profile.llmModifiers.preferRemoteFlexible ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              justify: 'space-between',
              padding: '12px 20px',
              minHeight: '54px',
              fontSize: '16px',
              background: profile.llmModifiers.preferRemoteFlexible ? '#10b981' : 'rgba(255,255,255,0.08)',
              borderColor: profile.llmModifiers.preferRemoteFlexible ? '#34d399' : 'rgba(255,255,255,0.2)',
              color: 'white'
            }}
          >
            <span>🏠 優先推薦居家遠端職缺</span>
            <span>{profile.llmModifiers.preferRemoteFlexible ? '已開啟' : '未開啟'}</span>
          </button>

        </div>

        {/* Custom LLM Prompt Field */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={profile.llmModifiers.customPrompt}
            disabled={isCounselorReadOnly}
            onChange={(e) => handleCustomPromptChange(e.target.value)}
            placeholder="自訂 LLM 提示指令（例如：偏好靠近台北市且不需要高頻說話的職缺）..."
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '16px',
              outline: 'none'
            }}
          />

          <button
            onClick={runLLMAnalysis}
            disabled={isAnalyzing}
            className="interactive-btn btn-primary"
            style={{ minHeight: '50px', padding: '12px 24px', fontSize: '17px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <RefreshCw size={20} className={isAnalyzing ? 'spin-icon' : ''} />
            <span>{isAnalyzing ? 'LLM 分析計算中...' : '重新動態分析'}</span>
          </button>
        </div>
      </div>

      {/* Analysis Summary Header */}
      {llmResult && (
        <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: '18px', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles color="#2563eb" size={28} />
            <div>
              <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#1e40af' }}>
                LLM 分析完成（比對成效：{llmResult.matchedCount} 筆最適職缺）
              </h4>
              <p style={{ fontSize: '15px', color: '#3b82f6', marginTop: '2px' }}>
                {llmResult.userSummary}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowJsonInspector(!showJsonInspector)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '700', color: '#4f46e5', background: '#e0e7ff', padding: '8px 14px', borderRadius: '10px' }}
          >
            <Code size={16} />
            <span>{showJsonInspector ? '隱藏 JSON' : '檢視 REST JSON'}</span>
          </button>
        </div>
      )}

      {/* Optional REST JSON Raw Inspector */}
      {showJsonInspector && llmResult && (
        <div style={{ background: '#0f172a', color: '#38bdf8', padding: '20px', borderRadius: '16px', fontSize: '14px', fontFamily: 'monospace', marginBottom: '28px', overflowX: 'auto' }}>
          <pre>{JSON.stringify(llmResult, null, 2)}</pre>
        </div>
      )}

      {/* Job Postings Recommendation List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '32px' }}>
        {llmResult?.recommendations.map((job) => {
          const isFav = favorites.includes(job.id);

          return (
            <div
              key={job.id}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                border: '2px solid #e2e8f0',
                padding: '28px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                position: 'relative'
              }}
            >
              {/* Top Row: Title, Score Badge & Favorite */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <span style={{
                      background: job.matchScore >= 90 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      fontWeight: '800',
                      fontSize: '16px',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      LLM 匹配度：{job.matchScore}%
                    </span>
                    <span className="badge">{job.workType}</span>
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: '17px', color: '#475569', fontWeight: '600', marginTop: '2px' }}>
                    {job.company}
                  </p>
                </div>

                <button
                  onClick={() => toggleFavorite(job.id)}
                  className="interactive-btn btn-secondary"
                  style={{
                    padding: '10px 18px',
                    minHeight: '48px',
                    fontSize: '15px',
                    borderColor: isFav ? '#f59e0b' : '#cbd5e1',
                    background: isFav ? '#fffbeb' : '#ffffff',
                    color: isFav ? '#d97706' : '#64748b'
                  }}
                >
                  <Star size={20} fill={isFav ? '#f59e0b' : 'none'} color={isFav ? '#f59e0b' : '#64748b'} />
                  <span>{isFav ? '已加入收藏' : '收藏職缺'}</span>
                </button>
              </div>

              {/* Details Tags & Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', color: '#475569', fontSize: '16px', background: '#f8fafc', padding: '14px 18px', borderRadius: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={18} color="#2563eb" />
                  <span>{job.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={18} color="#10b981" />
                  <span style={{ fontWeight: '700', color: '#059669' }}>{job.salary}</span>
                </div>
              </div>

              {/* Accommodations tags */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748b' }}>無障礙設施支援：</span>
                {job.accommodations.map((acc, idx) => (
                  <span key={idx} style={{ background: '#f1f5f9', color: '#334155', padding: '4px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: '600' }}>
                    ✓ {acc}
                  </span>
                ))}
              </div>

              {/* LLM Reasoning Callout Box */}
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderLeft: '5px solid #8b5cf6', padding: '18px 22px', borderRadius: '12px' }}>
                <h5 style={{ fontSize: '17px', fontWeight: '800', color: '#5b21b6', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} />
                  <span>LLM 推薦理由與適合度評估：</span>
                </h5>
                <p style={{ fontSize: '16px', color: '#334155', marginBottom: '10px', lineHeight: '1.5' }}>
                  {job.llmAnalysis.overallFitReason}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={15} /> 匹配優點：
                    </span>
                    <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#475569', marginTop: '4px' }}>
                      {job.llmAnalysis.pros.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={15} /> 注意事項：
                    </span>
                    <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#475569', marginTop: '4px' }}>
                      {job.llmAnalysis.considerations.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  onClick={() => alert(`已為您送出【${job.title}】的求職諮詢登記！輔導員將盡速與您聯繫。`)}
                  className="interactive-btn btn-primary"
                  style={{ minHeight: '52px', fontSize: '17px', padding: '12px 28px' }}
                >
                  <HeartHandshake size={20} />
                  <span>我要登記諮詢此職缺</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '2px solid #e2e8f0' }}>
        <button onClick={prevStep} className="interactive-btn btn-secondary">
          <ArrowLeft size={24} />
          <span>修改選擇條件</span>
        </button>
      </div>
    </div>
  );
};
