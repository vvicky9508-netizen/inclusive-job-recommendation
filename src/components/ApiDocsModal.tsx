import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { X, Code2, Play, CheckCircle2, Copy } from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST';
  path: string;
  desc: string;
  sampleBody?: object;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/health',
    desc: '檢查系統與 RESTful API 服務狀態'
  },
  {
    method: 'GET',
    path: '/api/v1/jobs',
    desc: '取得系統無障礙職缺列表'
  },
  {
    method: 'POST',
    path: '/api/v1/profile',
    desc: '儲存/更新求職者興趣與特別需求條件',
    sampleBody: {
      id: 'user-001',
      userName: '陳小明',
      interests: ['文書處理'],
      accommodations: ['wheelchair']
    }
  },
  {
    method: 'POST',
    path: '/api/v1/recommend/analyze',
    desc: '觸發 LLM 分析比對並回傳推薦職缺與說明',
    sampleBody: {
      interests: ['文書處理', '靜態環境'],
      accommodations: ['wheelchair', 'mentor'],
      llmModifiers: { reducePhysicalLoad: true, emphasizeMentorship: true }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/counselor/reports/user-001',
    desc: '輔導員導出指定個案之整合評估報告 (JSON)'
  }
];

export const ApiDocsModal: React.FC = () => {
  const { showApiDocsModal, setShowApiDocsModal } = useUser();
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(ENDPOINTS[3]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!showApiDocsModal) return null;

  const handleTestCall = async () => {
    setLoading(true);
    setApiResponse(null);
    try {
      const url = `http://localhost:3001${selectedEndpoint.path}`;
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: { 'Content-Type': 'application/json' }
      };
      if (selectedEndpoint.method === 'POST' && selectedEndpoint.sampleBody) {
        options.body = JSON.stringify(selectedEndpoint.sampleBody);
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setApiResponse(JSON.stringify({
        status: 'Offline Simulation Mode',
        note: '若後端伺服器未開啟，系統提供預設展示回應',
        endpoint: selectedEndpoint.path,
        sampleSuccessResponse: {
          success: true,
          timestamp: new Date().toISOString(),
          data: selectedEndpoint.sampleBody || { message: 'Sample Response OK' }
        }
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const copyFetchCode = () => {
    const code = `fetch('http://localhost:3001${selectedEndpoint.path}', {
  method: '${selectedEndpoint.method}',
  headers: { 'Content-Type': 'application/json' }${selectedEndpoint.sampleBody ? `,\n  body: JSON.stringify(${JSON.stringify(selectedEndpoint.sampleBody)})` : ''}
})
.then(res => res.json())
.then(data => console.log(data));`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="animate-fade-in" style={{
        background: '#ffffff',
        borderRadius: '24px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{ background: '#0f172a', color: 'white', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Code2 color="#38bdf8" size={28} />
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>外部 RESTful API 串接與測試中心</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>提供 OpenAPI / Swagger 風格之端點規範與測試</p>
            </div>
          </div>
          <button onClick={() => setShowApiDocsModal(false)} style={{ color: '#94a3b8', padding: '8px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* Endpoints Sidebar */}
          <div style={{ background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>API 端點選單</span>
            {ENDPOINTS.map((ep, idx) => {
              const isSelected = selectedEndpoint.path === ep.path;
              return (
                <button
                  key={idx}
                  onClick={() => { setSelectedEndpoint(ep); setApiResponse(null); }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    background: isSelected ? '#ffffff' : 'transparent',
                    border: isSelected ? '2px solid #3b82f6' : '1px solid transparent',
                    boxShadow: isSelected ? '0 4px 12px rgba(59,130,246,0.12)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      background: ep.method === 'GET' ? '#10b981' : '#3b82f6',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '900',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {ep.method}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', fontFamily: 'monospace' }}>
                      {ep.path}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{ep.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Test & Details View */}
          <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ background: selectedEndpoint.method === 'GET' ? '#10b981' : '#3b82f6', color: 'white', fontWeight: '800', padding: '4px 12px', borderRadius: '8px' }}>
                  {selectedEndpoint.method}
                </span>
                <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'monospace', color: '#0f172a' }}>
                  {selectedEndpoint.path}
                </span>
              </div>
              <p style={{ fontSize: '16px', color: '#475569' }}>{selectedEndpoint.desc}</p>
            </div>

            {/* Test Action */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleTestCall}
                disabled={loading}
                className="interactive-btn btn-primary"
                style={{ padding: '10px 20px', minHeight: '46px', fontSize: '15px' }}
              >
                <Play size={18} />
                <span>{loading ? '請求中...' : '發送 API 測試請求'}</span>
              </button>

              <button
                onClick={copyFetchCode}
                className="interactive-btn btn-secondary"
                style={{ padding: '10px 20px', minHeight: '46px', fontSize: '15px' }}
              >
                {copied ? <CheckCircle2 size={18} color="#10b981" /> : <Copy size={18} />}
                <span>{copied ? '已複製 JavaScript 範例' : '複製 Fetch 代碼'}</span>
              </button>
            </div>

            {/* Response Output Box */}
            <div style={{ background: '#0f172a', color: '#38bdf8', borderRadius: '16px', padding: '20px', fontFamily: 'monospace', fontSize: '14px', flex: 1, minHeight: '220px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>HTTP Response Body</span>
                <span style={{ color: '#34d399', fontSize: '12px' }}>Status: 200 OK</span>
              </div>
              <pre>{apiResponse || '// 點選上方「發送 API 測試請求」即可查驗實際 JSON 回傳內容'}</pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
