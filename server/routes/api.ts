import { Router, Request, Response } from 'express';
import { calculateLLMAnalysis } from './llm';
import { UserProfileData } from '../../src/types';
import { MOCK_JOBS } from '../data/mockJobs';

export const apiRouter = Router();

// Store in-memory user profiles for REST demo
const userProfilesStore = new Map<string, UserProfileData>();

/**
 * @route GET /api/v1/health
 * @desc 系統健康狀態檢查
 */
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'Inclusive Job Recommendation API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * @route GET /api/v1/jobs
 * @desc 取得系統無障礙職缺列表
 */
apiRouter.get('/jobs', (req: Request, res: Response) => {
  res.json({
    success: true,
    total: MOCK_JOBS.length,
    jobs: MOCK_JOBS
  });
});

/**
 * @route POST /api/v1/profile
 * @desc 儲存或更新求職者興趣與需求條件
 */
apiRouter.post('/profile', (req: Request, res: Response) => {
  const profile: UserProfileData = req.body;
  if (!profile || !profile.id) {
    return res.status(400).json({ success: false, error: '缺少必填欄位 (profile.id)' });
  }

  userProfilesStore.set(profile.id, profile);
  return res.json({
    success: true,
    message: '使用者需求條件已成功儲存',
    profileId: profile.id
  });
});

/**
 * @route GET /api/v1/profile/:id
 * @desc 取得特定使用者之需求條件
 */
apiRouter.get('/profile/:id', (req: Request, res: Response) => {
  const profile = userProfilesStore.get(req.params.id);
  if (!profile) {
    return res.status(404).json({ success: false, error: '找不到該使用者條件紀錄' });
  }
  return res.json({ success: true, profile });
});

/**
 * @route POST /api/v1/recommend/analyze
 * @desc 執行 LLM 分析與職缺匹配推薦
 */
apiRouter.post('/recommend/analyze', (req: Request, res: Response) => {
  const profile: UserProfileData = req.body;
  if (!profile) {
    return res.status(400).json({ success: false, error: '請提供 Valid User Profile JSON' });
  }

  const analysisResult = calculateLLMAnalysis(profile);
  return res.json({
    success: true,
    result: analysisResult
  });
});

/**
 * @route GET /api/v1/counselor/reports/:id
 * @desc 輔導員專用導出評估報告 (REST API 端點)
 */
apiRouter.get('/counselor/reports/:id', (req: Request, res: Response) => {
  const profile = userProfilesStore.get(req.params.id);
  
  // If not in store, construct a default demonstration response
  const targetProfile: UserProfileData = profile || {
    id: req.params.id,
    userName: '身心障礙求職者 (演示範例)',
    interests: ['文書處理', '靜態環境'],
    environments: ['室內靜態'],
    accommodations: ['wheelchair', 'mentor'],
    schedule: ['daytime'],
    notes: '範例諮詢紀錄',
    llmModifiers: {
      reducePhysicalLoad: true,
      emphasizeMentorship: true,
      preferRemoteFlexible: false,
      customPrompt: ''
    }
  };

  const analysis = calculateLLMAnalysis(targetProfile);

  return res.json({
    reportId: `REP-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    counselorAccessMode: 'READ_ONLY',
    clientProfile: targetProfile,
    analysisSummary: analysis.userSummary,
    recommendedJobMatches: analysis.recommendations,
    counselorInsights: analysis.counselorInsights
  });
});
