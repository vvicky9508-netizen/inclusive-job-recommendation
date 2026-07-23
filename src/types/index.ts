export type UserRole = 'seeker' | 'counselor';

export type StepNumber = 1 | 2 | 3 | 4 | 5;

export interface SelectOption {
  id: string;
  label: string;
  icon: string;
  description: string;
  badge?: string;
}

export interface LLMModifiers {
  reducePhysicalLoad: boolean;
  emphasizeMentorship: boolean;
  preferRemoteFlexible: boolean;
  customPrompt: string;
}

export interface UserProfileData {
  id: string;
  userName: string;
  interests: string[];
  environments: string[];
  accommodations: string[];
  schedule: string[];
  notes: string;
  llmModifiers: LLMModifiers;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  workType: string;
  tags: string[];
  accommodations: string[];
  matchScore: number;
  llmAnalysis: {
    pros: string[];
    considerations: string[];
    overallFitReason: string;
  };
}

export interface LLMAnalysisResponse {
  timestamp: string;
  userSummary: string;
  matchedCount: number;
  recommendations: JobPosting[];
  counselorInsights: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
