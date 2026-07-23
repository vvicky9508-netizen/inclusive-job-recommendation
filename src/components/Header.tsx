import React from 'react';
import { useUser } from '../context/UserContext';
import { UserRole } from '../types';
import { Accessibility, Eye, UserCheck, Code2, Volume2, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, isCounselorReadOnly, setShowApiDocsModal, speakText } = useUser();

  return (
    <header style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
            <Accessibility size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
              易捷職缺適配系統
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
              低認知引導 ✕ LLM 智慧匹配 ✕ 輔導員權限管理
            </p>
          </div>
        </div>

        {/* Action Buttons & Role Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* TTS Quick Button */}
          <button
            onClick={() => speakText("歡迎使用易捷職缺適配系統。這裡提供步驟式引導，為您量身推薦適合的工作機會。")}
            className="interactive-btn btn-secondary"
            style={{ padding: '8px 16px', minHeight: '44px', fontSize: '15px' }}
            title="朗讀網頁簡介"
          >
            <Volume2 size={18} />
            <span>語音說明</span>
          </button>

          {/* REST API Explorer Modal Trigger */}
          <button
            onClick={() => setShowApiDocsModal(true)}
            className="interactive-btn btn-secondary"
            style={{ padding: '8px 16px', minHeight: '44px', fontSize: '15px', color: '#6366f1', borderColor: '#c7d2fe', background: '#eef2ff' }}
          >
            <Code2 size={18} />
            <span>REST API 串接</span>
          </button>

          {/* Role Toggle Switcher */}
          <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '4px', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
            <button
              onClick={() => setRole('seeker')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                background: role === 'seeker' ? '#ffffff' : 'transparent',
                color: role === 'seeker' ? '#2563eb' : '#64748b',
                boxShadow: role === 'seeker' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <UserCheck size={18} />
              <span>求職者 (完整操作)</span>
            </button>
            <button
              onClick={() => setRole('counselor')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                background: role === 'counselor' ? '#f59e0b' : 'transparent',
                color: role === 'counselor' ? '#ffffff' : '#64748b',
                boxShadow: role === 'counselor' ? '0 2px 8px rgba(245,158,11,0.3)' : 'none'
              }}
            >
              <Eye size={18} />
              <span>輔導員 (唯讀)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Read-Only Indicator for Counselors */}
      {isCounselorReadOnly && (
        <div style={{ background: '#fffbeb', borderTop: '1px solid #fde68a', borderBottom: '1px solid #fde68a', padding: '10px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: '700', fontSize: '16px' }}>
            <ShieldAlert size={20} />
            <span>【輔導員唯讀模式已啟用】您正在檢視求職者的填寫狀態與 LLM 評估報告，所有修改表單控制已暫時停用。</span>
          </div>
        </div>
      )}
    </header>
  );
};
