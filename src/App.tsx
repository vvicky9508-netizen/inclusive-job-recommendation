import React from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { Step1Interests } from './components/StepWizard/Step1Interests';
import { Step2Environment } from './components/StepWizard/Step2Environment';
import { Step3Accommodations } from './components/StepWizard/Step3Accommodations';
import { Step4Schedule } from './components/StepWizard/Step4Schedule';
import { Step5LLMResults } from './components/StepWizard/Step5LLMResults';
import { CounselorView } from './components/CounselorView';
import { ApiDocsModal } from './components/ApiDocsModal';
import { Accessibility, Sparkles, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentStep, isCounselorReadOnly } = useUser();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 24px', flex: 1 }}>
        {/* If Counselor mode is active, render Counselor View */}
        {isCounselorReadOnly ? (
          <CounselorView />
        ) : (
          /* Seeker Wizard Mode */
          <div>
            <ProgressBar />

            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: '2px solid #e2e8f0' }}>
              {currentStep === 1 && <Step1Interests />}
              {currentStep === 2 && <Step2Environment />}
              {currentStep === 3 && <Step3Accommodations />}
              {currentStep === 4 && <Step4Schedule />}
              {currentStep === 5 && <Step5LLMResults />}
            </div>
          </div>
        )}
      </main>

      {/* Accessible Footer */}
      <footer style={{ background: '#ffffff', borderTop: '2px solid #e2e8f0', padding: '24px', marginTop: '48px', textAlign: 'center', color: '#64748b', fontSize: '15px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: '#0f172a' }}>
            <Accessibility size={20} color="#2563eb" />
            <span>無障礙智慧職缺系統 © 2026</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>用</span>
            <Heart size={16} color="#ec4899" fill="#ec4899" />
            <span>打造專屬身心障礙求職者的低認知友善介面</span>
          </div>
        </div>
      </footer>

      {/* REST API Explorer Modal */}
      <ApiDocsModal />
    </div>
  );
};

export function App() {
  return (
    <UserProvider>
      <MainContent />
    </UserProvider>
  );
}

export default App;
