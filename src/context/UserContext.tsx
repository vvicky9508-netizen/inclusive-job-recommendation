import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, StepNumber, UserProfileData, LLMAnalysisResponse } from '../types';

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isCounselorReadOnly: boolean;
  currentStep: StepNumber;
  setCurrentStep: (step: StepNumber) => void;
  nextStep: () => void;
  prevStep: () => void;
  profile: UserProfileData;
  updateProfile: (partial: Partial<UserProfileData>) => void;
  llmResult: LLMAnalysisResponse | null;
  isAnalyzing: boolean;
  runLLMAnalysis: () => Promise<void>;
  favorites: string[];
  toggleFavorite: (jobId: string) => void;
  showApiDocsModal: boolean;
  setShowApiDocsModal: (show: boolean) => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
}

const defaultProfile: UserProfileData = {
  id: 'user-seek-001',
  userName: '陳小明',
  interests: ['文書處理', '靜態環境'],
  environments: ['室內靜態', '彈性工時'],
  accommodations: ['wheelchair', 'mentor'],
  schedule: ['daytime'],
  notes: '偏好靠近捷運站之工作場所',
  llmModifiers: {
    reducePhysicalLoad: true,
    emphasizeMentorship: true,
    preferRemoteFlexible: false,
    customPrompt: ''
  }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('seeker');
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [profile, setProfile] = useState<UserProfileData>(defaultProfile);
  const [llmResult, setLlmResult] = useState<LLMAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(['job-001']);
  const [showApiDocsModal, setShowApiDocsModal] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const isCounselorReadOnly = role === 'counselor';

  // Speech synthesis for accessibility TTS
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const updateProfile = (partial: Partial<UserProfileData>) => {
    if (isCounselorReadOnly) return; // Prevent edits in counselor read-only mode
    setProfile(prev => ({
      ...prev,
      ...partial
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as StepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as StepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const runLLMAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Try local Express REST API first, fallback to in-memory LLM if offline
      const response = await fetch('http://localhost:3001/api/v1/recommend/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (response.ok) {
        const json = await response.json();
        setLlmResult(json.result);
      } else {
        throw new Error('API server unavailable, falling back');
      }
    } catch (e) {
      // Fallback simulated LLM response
      const fallbackAnalysis = (await import('../../server/routes/llm')).calculateLLMAnalysis(profile);
      setLlmResult(fallbackAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleFavorite = (jobId: string) => {
    if (isCounselorReadOnly) return;
    setFavorites(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <UserContext.Provider
      value={{
        role,
        setRole,
        isCounselorReadOnly,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        profile,
        updateProfile,
        llmResult,
        isAnalyzing,
        runLLMAnalysis,
        favorites,
        toggleFavorite,
        showApiDocsModal,
        setShowApiDocsModal,
        speakText,
        isSpeaking
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
