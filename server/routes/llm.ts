import { UserProfileData, LLMAnalysisResponse, JobPosting } from '../../src/types';
import { MOCK_JOBS } from '../data/mockJobs';

export function calculateLLMAnalysis(profile: UserProfileData): LLMAnalysisResponse {
  const { interests, environments, accommodations, schedule, llmModifiers } = profile;

  // Filter and score jobs dynamically based on LLM rules
  const evaluatedJobs: JobPosting[] = MOCK_JOBS.map((job) => {
    let score = 70; // Base score
    const pros: string[] = [...job.llmAnalysis.pros];
    const considerations: string[] = [...job.llmAnalysis.considerations];

    // Interest matching
    const interestMatchCount = job.tags.filter(t => interests.includes(t)).length;
    score += interestMatchCount * 8;

    // Accommodation matching
    if (accommodations.includes('wheelchair') && job.accommodations.some(a => a.includes('輪椅') || a.includes('無障礙'))) {
      score += 10;
      pros.push('通過輪椅無障礙通道嚴格認證');
    }
    if (accommodations.includes('mentor') && job.accommodations.some(a => a.includes('導師') || a.includes('指導') || a.includes('陪伴'))) {
      score += 8;
      pros.push('提供一對一資深導師貼心陪伴');
    }
    if (accommodations.includes('visual_sop') && job.accommodations.some(a => a.includes('圖示') || a.includes('標籤') || a.includes('SOP'))) {
      score += 8;
      pros.push('全工作流程均配備高清晰圖示說明');
    }

    // LLM Dynamic Modifier Adjustments
    if (llmModifiers.reducePhysicalLoad) {
      if (job.workType.includes('手作') || job.workType.includes('靜態') || job.workType.includes('居家')) {
        score += 10;
        pros.push('LLM調整：已調高體力負荷低之權重');
      } else {
        score -= 10;
        considerations.push('LLM警示：此職缺體力需求稍高，已依據您設定降低優先度');
      }
    }

    if (llmModifiers.emphasizeMentorship) {
      if (job.accommodations.some(a => a.includes('導師') || a.includes('指導') || a.includes('陪伴'))) {
        score += 12;
        pros.push('LLM調整：大幅加強個人化陪伴與關懷適應輔導');
      }
    }

    if (llmModifiers.preferRemoteFlexible) {
      if (job.workType.includes('遠端') || job.tags.includes('彈性工時')) {
        score += 15;
        pros.push('LLM調整：優先推薦居家遠端與時間彈性之職缺');
      }
    }

    // Cap score at 99 max
    const finalScore = Math.min(99, Math.max(50, score));

    return {
      ...job,
      matchScore: finalScore,
      llmAnalysis: {
        pros: Array.from(new Set(pros)),
        considerations: Array.from(new Set(considerations)),
        overallFitReason: `針對您的偏好 (${interests.join('、') || '綜合試用'})，LLM 模型計算適配度為 ${finalScore}%。`
      }
    };
  });

  // Sort by match score descending
  evaluatedJobs.sort((a, b) => b.matchScore - a.matchScore);

  // Generate Counselor insights
  const counselorInsights: string[] = [
    `求職者偏好領域為：${interests.length > 0 ? interests.join('、') : '未特定'}。`,
    `無障礙與輔具需求包含：${accommodations.length > 0 ? accommodations.join('、') : '基本需求'}。`,
    `LLM 適配提示：優先推薦之職缺【${evaluatedJobs[0]?.title}】比對最高，建議安排先期環境參訪。`,
    llmModifiers.reducePhysicalLoad ? '輔導員備註：求職者已啟用「降低體力負擔」條件過濾。' : '輔導員備註：體力評估為標準狀況。',
    llmModifiers.customPrompt ? `自訂分析指令記錄：「${llmModifiers.customPrompt}」` : '未設定額外自訂指令。'
  ];

  return {
    timestamp: new Date().toISOString(),
    userSummary: `已為您成功完成 ${evaluatedJobs.length} 筆職缺之 LLM 無障礙動態比對。`,
    matchedCount: evaluatedJobs.length,
    recommendations: evaluatedJobs,
    counselorInsights
  };
}
