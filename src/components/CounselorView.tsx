import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ShieldCheck, User, Sparkles, Download, Copy, Check, FileText } from 'lucide-react';

export const CounselorView: React.FC = () => {
  const { profile, llmResult } = useUser();
  const [copied, setCopied] = useState(false);

  const reportJson = {
    reportId: `REP-${Date.now()}`,
    clientName: profile.userName,
    profileId: profile.id,
    counselorAccessMode: 'READ_ONLY_REVIEW',
    interests: profile.interests,
    environments: profile.environments,
    accommodations: profile.accommodations,
    schedule: profile.schedule,
    llmModifiers: profile.llmModifiers,
    topMatch: llmResult?.recommendations[0]?.title || '尚無資料',
    generatedAt: new Date().toISOString()
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(reportJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', border: '2px solid #f59e0b', boxShadow: '0 10px 30px rgba(245,158,11,0.08)' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #fef3c7', paddingBottom: '20px', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: '#f59e0b', padding: '12px', borderRadius: '16px', color: 'white' }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#78350f' }}>
              職業輔導員 - 唯讀評估與導出儀表板
            </h2>
            <p style={{ fontSize: '15px', color: '#92400e' }}>
              此面板供輔導人員查閱個案需求、LLM 智慧評估報告與導出標準 RESTful JSON
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleCopyJson}
            className="interactive-btn btn-secondary"
            style={{ minHeight: '44px', padding: '8px 16px', fontSize: '15px', borderColor: '#f59e0b', color: '#b45309' }}
          >
            {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
            <span>{copied ? '已複製 JSON' : '複製 API JSON'}</span>
          </button>
        </div>
      </div>

      {/* Client Overview Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        
        <div style={{ background: '#fffbeb', borderRadius: '18px', padding: '20px', border: '1px solid #fde68a' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={18} /> 個案基本資料
          </span>
          <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#78350f', marginTop: '6px' }}>
            {profile.userName} (ID: {profile.id})
          </h4>
          <p style={{ fontSize: '15px', color: '#92400e', marginTop: '4px' }}>
            備註需求：{profile.notes || '無特殊備註'}
          </p>
        </div>

        <div style={{ background: '#f0fdf4', borderRadius: '18px', padding: '20px', border: '1px solid #bbf7d0' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={18} /> LLM 偏好領域
          </span>
          <p style={{ fontSize: '18px', fontWeight: '800', color: '#166534', marginTop: '6px' }}>
            {profile.interests.join('、') || '尚未選擇'}
          </p>
          <span style={{ fontSize: '14px', color: '#15803d' }}>
            無障礙：{profile.accommodations.join('、') || '無'}
          </span>
        </div>

        <div style={{ background: '#eff6ff', borderRadius: '18px', padding: '20px', border: '1px solid #bfdbfe' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={18} /> 最適匹配職缺
          </span>
          <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#1e40af', marginTop: '6px' }}>
            {llmResult?.recommendations[0]?.title || '計算中...'}
          </h4>
          <span style={{ fontSize: '14px', color: '#2563eb' }}>
            最高分：{llmResult?.recommendations[0]?.matchScore || 0}% 適配
          </span>
        </div>

      </div>

      {/* LLM Counselor Professional Insights */}
      {llmResult?.counselorInsights && (
        <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '24px', border: '2px solid #e2e8f0', marginBottom: '28px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#8b5cf6" />
            <span>LLM 給輔導員之評估專業建議：</span>
          </h4>
          <ul style={{ paddingLeft: '24px', fontSize: '16px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {llmResult.counselorInsights.map((insight, idx) => (
              <li key={idx} style={{ lineHeight: '1.5' }}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Code Export Example */}
      <div style={{ background: '#0f172a', color: '#f8fafc', borderRadius: '18px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h5 style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8' }}>
            RESTful API 導出端點：GET /api/v1/counselor/reports/{profile.id}
          </h5>
          <span className="badge" style={{ background: '#1e293b', color: '#94a3b8' }}>JSON Response</span>
        </div>
        <pre style={{ fontSize: '14px', color: '#a5f3fc', fontFamily: 'monospace', overflowX: 'auto' }}>
          {JSON.stringify(reportJson, null, 2)}
        </pre>
      </div>

    </div>
  );
};
