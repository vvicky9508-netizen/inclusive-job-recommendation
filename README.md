# 身心障礙者步驟式職缺推薦與輔導員系統 (Inclusive Job Recommendation System)

本系統專為**身心障礙求職者**與**職業輔導員**設計，具備低認知負擔 UI/UX、步驟式引導問卷、LLM 智慧職缺適配與動態調整、角色唯讀權限控制，以及外部 RESTful API 整合能力。

---

## 🌟 系統核心功能與設計原則

### 1. 低認知負擔與 Accessibility (無障礙) UX 設計
- **每步驟僅做一件事 (Single Task Focus)**：引導頁面拆分為 5 個明確步驟，降低選擇焦慮與認知張力。
- **適中/大型按鈕與觸控標的**：點擊區域高達 56px+，輔以點擊彈性按壓動畫回饋 (`active: scale(0.96)`)。
- **高清晰進度條**：頂部即時顯示「步驟 X / 5」與完成百分比。
- **語音朗讀輔助 (TTS)**：內建 SpeechSynthesis 語音，協助視覺或閱讀輔助需求者聽取題目與說明。

### 2. 步驟式條件收集 (Step Wizard)
- **Step 1: 工作興趣領域**（文書處理 📝、手工作業 🍪、數位媒體 💻、倉儲物流 📦、綠意園藝 🌱）
- **Step 2: 偏好工作環境**（室內靜態 🏢、獨立作業 👤、團隊合作 👥、居家遠端 🏠）
- **Step 3: 無障礙與特別需求**（無障礙坡道/輪椅 ♿、1對1導師陪伴 🤝、圖示SOP卡 📋、減輕體力/免搬重物 🦾、定時休息 ⏰）
- **Step 4: 工作時間與偏好**（標準日間 ☀️、兼職計時 ⏱️、自訂彈性 📆 + 諮詢備註）
- **Step 5: LLM 智慧分析與適配調整**

### 3. LLM 分析推薦與動態調整引擎
- 依據求職者選填之條件進行無障礙設施與標籤比對，計算適配分（Match Score 50% ~ 99%）。
- 提供**動態微調參數開關**（如：降低體力負擔、加強一對一導師陪伴、優先推薦居家遠端），LLM 可依參數即時更新評估理由與缺點提示。
- 支援自訂 Prompt 指令輸入。

### 4. 角色權限控制 (Role-Based Access Control)
- ♿ **求職者 (完整操作模式)**：自由填寫問卷、編輯需求、動態調整 LLM 參數與收藏職缺。
- 👨‍🏫 **輔導員 (唯讀模式 Read-Only)**：全站控制件凍結鎖定，顯示醒目唯讀警告 Banner，提供個案評估歷程、LLM 專業建議與 RESTful JSON 一鍵導出工具。

### 5. 外部串接 RESTful API
系統提供標準 HTTP REST API 端點供外部個案管理系統整合：
- `GET /api/v1/health` - 服務健康度檢查
- `GET /api/v1/jobs` - 取得無障礙職缺列表
- `POST /api/v1/profile` - 提交/儲存求職者需求條件
- `GET /api/v1/profile/:id` - 讀取指定求職者資料
- `POST /api/v1/recommend/analyze` - 執行 LLM 評估與職缺匹配
- `GET /api/v1/counselor/reports/:id` - 輔導員專用導出 JSON 報告

---

## 📁 專案檔案結構

```
inclusive_job_recommendation/
├── standalone_demo.html       # 🌟 獨立單頁示範版 (可直接於任何瀏覽器雙擊開啟體驗)
├── package.json               # 專案套件設定檔
├── tsconfig.json              # TypeScript 設定
├── vite.config.ts             # Vite 設定
├── index.html                 # 入口 HTML
├── server/                    # 後端 Express RESTful API
│   ├── server.ts              # API 伺服器入口
│   ├── routes/
│   │   ├── api.ts             # RESTful API 端點
│   │   └── llm.ts             # LLM 評估邏輯
│   └── data/
│       └── mockJobs.ts        # 無障礙職缺資料庫
└── src/                       # 前端 React TypeScript
    ├── main.tsx
    ├── App.tsx
    ├── styles/index.css       # 低認知 UI 樣式系統與動畫
    ├── context/UserContext.tsx# 角色與步驟全域狀態
    ├── components/
    │   ├── Header.tsx         # 導覽列與角色切換器
    │   ├── ProgressBar.tsx    # 步驟進度條
    │   ├── CounselorView.tsx  # 輔導員唯讀檢視與報告導出
    │   ├── ApiDocsModal.tsx   # RESTful API 測試對話框
    │   └── StepWizard/        # 5大專一步驟引導組件
```

---

## 🚀 如何開啟與體驗

### 快速體驗 (推薦)
直接在瀏覽器中開啟專案內的 [standalone_demo.html](file:///C:/Users/Administrator/.gemini/antigravity/scratch/inclusive_job_recommendation/standalone_demo.html) 即可立即體驗完整的低認知步驟引導、LLM 調整、角色切換與 API 測試！
