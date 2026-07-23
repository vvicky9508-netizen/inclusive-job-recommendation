import { JobPosting } from '../../src/types';

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'job-001',
    title: '資料輸入與發票核對專員',
    company: '創昕數位科技股份有限公司',
    location: '台北市信義區 (捷運可達 / 輪椅友善坡道)',
    salary: '月薪 32,000 ~ 36,000 元',
    workType: '室內辦公 / 半遠端可',
    tags: ['文書處理', '靜態環境', '圖示引導'],
    accommodations: ['無障礙坡道與電梯', '定點擺放輔具', '獨立靜音工作桌', '專人入職指導'],
    matchScore: 92,
    llmAnalysis: {
      pros: [
        '工作內容標準化高，均有 SOP 與圖示輔助說明',
        '辦公室配備完善無障礙通道與電動輪椅充電區',
        '環境安靜獨立，能專心作業'
      ],
      considerations: [
        '需長時間操作螢幕，建議每 45 分鐘定期休息'
      ],
      overallFitReason: '極為符合您對靜態文書、安靜環境與良好無障礙設施的偏好。'
    }
  },
  {
    id: 'job-002',
    title: '庇護餐飲手作與包裝助理',
    company: '暖心日光手作工坊',
    location: '新北市板橋區 (公車直達門口)',
    salary: '月薪 28,500 ~ 31,000 元',
    workType: '手工作業 / 團隊陪伴',
    tags: ['手工作業', '團隊合作', '手作藝品'],
    accommodations: ['座位高度可調', '重物替代工具', '定時休息提醒', '資深導師 1 對 1 陪伴'],
    matchScore: 88,
    llmAnalysis: {
      pros: [
        '團隊氣氛溫馨，提供完善的崗位適應輔導員',
        '工作節奏適中，免去高強度體力搬運'
      ],
      considerations: [
        '需進行細緻手工包裝，需維持一定專注力'
      ],
      overallFitReason: '非常適合偏好手作與希望有團隊導師陪伴的求職條件。'
    }
  },
  {
    id: 'job-003',
    title: '線上社群內容排版與客服小幫手',
    company: '藍天文化創意工作室',
    location: '完全居家遠端工作 (Remote)',
    salary: '時薪 210 ~ 250 元 / 彈性工時',
    workType: '居家遠端 / 數位媒體',
    tags: ['數位媒體', '彈性工時', '遠端工作'],
    accommodations: ['彈性工作時間', '螢幕朗讀軟體相容', '免打卡純任務制', '通訊軟體文字溝通'],
    matchScore: 95,
    llmAnalysis: {
      pros: [
        '無需每日通勤，完全彈性自我安排工作進度',
        '溝通多以文字與圖卡進行，適合偏好安靜文字溝通者'
      ],
      considerations: [
        '需要具備基本電腦與文字處理操作經驗'
      ],
      overallFitReason: '若希望減少交通負擔並發揮數位能力，這是極為優質的彈性遠端選擇。'
    }
  },
  {
    id: 'job-004',
    title: '圖書整理與標籤分類員',
    company: '市立資訊圖書館 (委外服務處)',
    location: '台中市西區 (公車捷運轉乘 convenience)',
    salary: '月薪 30,000 ~ 33,000 元',
    workType: '倉儲整理 / 明亮舒適',
    tags: ['倉儲物流', '靜態環境', '單獨作業'],
    accommodations: ['低矮書架設計', '輔助推車', '視覺化彩色標籤', '安靜休息室'],
    matchScore: 85,
    llmAnalysis: {
      pros: [
        '工作環境極度安靜且光線明亮',
        '分類標籤經過視覺優化設計，簡潔好辨識'
      ],
      considerations: [
        '部分時段需走動架位，可搭配專屬輔助推車'
      ],
      overallFitReason: '適合喜歡規則清晰、流程明確且渴望安定環境的求職者。'
    }
  },
  {
    id: 'job-005',
    title: '綠意植栽維護與盆栽理貨員',
    company: '綠洲園藝生活館',
    location: '高雄市左營區',
    salary: '月薪 29,000 ~ 32,000 元',
    workType: '手工作業 / 戶外半開放',
    tags: ['手工作業', '彈性工時'],
    accommodations: ['自動灌溉設備輔助', '無階梯地面', '高遮陽工作區域'],
    matchScore: 78,
    llmAnalysis: {
      pros: [
        '接觸自然植物，對舒緩心情相當有幫助',
        '環境廣闊無壓迫感'
      ],
      considerations: [
        '戶外氣溫較高時需要適時補充水分與休息'
      ],
      overallFitReason: '適合喜歡植物、願意進行輕度動態活動的求職夥伴。'
    }
  }
];
