// 傳習錄語錄資料庫
const quotes = [
    {
        text: "知是行的主意，行是知的功夫。",
        explanation: "真正的理解，必然會落實於行動；而真正的行動，也是在完成理解。"
    },
    {
        text: "心外無理，心外無事。",
        explanation: "一切的道理與事物，都不脫離本心的感應與認知；向內探求，便是澄明之始。"
    },
    {
        text: "種樹者必培其根，種德者必養其心。",
        explanation: "如同種樹必須深植根基，培養品德也必須涵養自己的一顆心。"
    },
    {
        text: "破山中賊易，破心中賊難。",
        explanation: "克服外在的困難相對容易，但要戰勝自己內心的私慾與雜念卻最為艱難。"
    },
    {
        text: "無善無惡心之體，有善有惡意之動。知善知惡是良知，為善去惡是格物。",
        explanation: "本心清淨無染，意念方有善惡之分。能覺察善惡的是我們本具的良知，而在生活中實踐善、去除惡，便是真正的修行。"
    }
];

// 盆栽基礎 SVG (共用)
const potSVG = `
    <!-- 盆栽背後 -->
    <path d="M70,350 L230,350 L250,280 L50,280 Z" fill="#C27A59" stroke="#000" stroke-width="6" stroke-linejoin="round" />
    <!-- 盆栽邊緣 -->
    <path d="M40,280 L260,280 L260,300 L40,300 Z" fill="#D68661" stroke="#000" stroke-width="6" stroke-linejoin="round" />
    <!-- 盆栽泥土 -->
    <ellipse cx="150" cy="280" rx="110" ry="20" fill="#3A2518" />
`;

// 各階段植物 SVG ( viewBox="0 0 300 400" )
const plantStages = [
    // 0: 發芽
    `
        <path class="leaf-sway" d="M150,280 Q140,250 145,240 Q155,250 150,280" fill="#6A9E58" stroke="#000" stroke-width="6" stroke-linejoin="round" />
        <ellipse cx="150" cy="275" rx="30" ry="20" fill="#E8B97E" stroke="#000" stroke-width="6" /> <!-- 種子本體 -->
        <circle cx="140" cy="275" r="4" fill="#000" /> <!-- 眼睛 -->
        <circle cx="160" cy="275" r="4" fill="#000" /> <!-- 眼睛 -->
        <path d="M145,285 Q150,290 155,285" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" /> <!-- 嘴巴 -->
        <circle cx="132" cy="282" r="3" fill="#FF8A8A" opacity="0.8" /> <!-- 腮紅 -->
        <circle cx="168" cy="282" r="3" fill="#FF8A8A" opacity="0.8" />
    `,
    // 1: 長大
    `
        <path d="M150,280 Q150,220 150,200" stroke="#000" stroke-width="8" fill="none" stroke-linecap="round" />
        <path d="M150,280 Q150,220 150,200" stroke="#6A9E58" stroke-width="4" fill="none" stroke-linecap="round" />
        <path class="leaf-sway" d="M150,240 Q110,210 100,230 Q130,260 150,240" fill="#6A9E58" stroke="#000" stroke-width="6" stroke-linejoin="round" />
        <path class="leaf-sway" style="animation-delay: 0.5s" d="M150,220 Q190,190 200,210 Q170,240 150,220" fill="#6A9E58" stroke="#000" stroke-width="6" stroke-linejoin="round" />
    `,
    // 2: 長葉子
    `
        <path d="M150,280 Q145,160 150,130" stroke="#000" stroke-width="12" fill="none" stroke-linecap="round" />
        <path d="M150,280 Q145,160 150,130" stroke="#4A6356" stroke-width="6" fill="none" stroke-linecap="round" />
        <g class="leaf-sway">
            <circle cx="100" cy="180" r="30" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <circle cx="200" cy="150" r="35" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <circle cx="150" cy="130" r="45" fill="#6A9E58" stroke="#000" stroke-width="6" />
        </g>
    `,
    // 3: 長花
    `
        <path d="M150,280 Q140,150 150,110" stroke="#000" stroke-width="16" fill="none" stroke-linecap="round" />
        <path d="M150,280 Q140,150 150,110" stroke="#4A6356" stroke-width="8" fill="none" stroke-linecap="round" />
        <g class="leaf-sway">
            <circle cx="85" cy="155" r="40" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <circle cx="215" cy="125" r="45" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <circle cx="150" cy="100" r="60" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <!-- 卡通花朵 -->
            <circle cx="70" cy="140" r="14" fill="#FFCF40" stroke="#000" stroke-width="4" />
            <circle cx="200" cy="110" r="18" fill="#FFCF40" stroke="#000" stroke-width="4" />
            <circle cx="130" cy="80" r="20" fill="#FFCF40" stroke="#000" stroke-width="4" />
        </g>
    `,
    // 4: 結果
    `
        <path d="M150,280 Q140,150 150,110" stroke="#000" stroke-width="16" fill="none" stroke-linecap="round" />
        <path d="M150,280 Q140,150 150,110" stroke="#4A6356" stroke-width="8" fill="none" stroke-linecap="round" />
        <g class="leaf-sway">
            <circle cx="85" cy="155" r="40" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <circle cx="215" cy="125" r="45" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <circle cx="150" cy="100" r="60" fill="#6A9E58" stroke="#000" stroke-width="6" />
            <!-- 果實 -->
            <circle cx="90" cy="150" r="15" fill="#FF5E5B" stroke="#000" stroke-width="4" /> 
            <circle cx="200" cy="120" r="18" fill="#FF5E5B" stroke="#000" stroke-width="4" />
            <circle cx="130" cy="90" r="22" fill="#FF5E5B" stroke="#000" stroke-width="4" />
        </g>
    `
];

// 狀態管理
const ensureIds = (arr) => {
    let changed = false;
    arr.forEach(r => {
        if (!r.id) {
            r.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
            changed = true;
        }
    });
    return changed;
};

let waterCount = parseInt(localStorage.getItem('waterCount') || '0');
let currentStage = Math.min(4, Math.floor(waterCount / 10));
let playerName = localStorage.getItem('playerName') || '';
let lastCheckInDate = localStorage.getItem('lastCheckInDate') || '';
let lastWaterDate = localStorage.getItem('lastWaterDate') || '';
let collectedQuotes = JSON.parse(localStorage.getItem('collectedQuotes') || '[]');

let thoughtCount = parseInt(localStorage.getItem('thoughtCount') || '0');
let reflections = JSON.parse(localStorage.getItem('reflections') || '[]');
if(ensureIds(reflections)) localStorage.setItem('reflections', JSON.stringify(reflections));

let awarenessCount = parseInt(localStorage.getItem('awarenessCount') || '0');
let awarenessRecords = JSON.parse(localStorage.getItem('awarenessRecords') || '[]');
if(ensureIds(awarenessRecords)) localStorage.setItem('awarenessRecords', JSON.stringify(awarenessRecords));

let emotionCount = parseInt(localStorage.getItem('emotionCount') || '0');
let emotionRecords = JSON.parse(localStorage.getItem('emotionRecords') || '[]');
if(ensureIds(emotionRecords)) localStorage.setItem('emotionRecords', JSON.stringify(emotionRecords));

let practiceCount = parseInt(localStorage.getItem('practiceCount') || '0');
let practiceRecords = JSON.parse(localStorage.getItem('practiceRecords') || '[]');
if(ensureIds(practiceRecords)) localStorage.setItem('practiceRecords', JSON.stringify(practiceRecords));

let goodnessCount = parseInt(localStorage.getItem('goodnessCount') || '0');
let goodnessRecords = JSON.parse(localStorage.getItem('goodnessRecords') || '[]');
if(ensureIds(goodnessRecords)) localStorage.setItem('goodnessRecords', JSON.stringify(goodnessRecords));

let observationRecords = JSON.parse(localStorage.getItem('observationRecords') || '[]');
if(ensureIds(observationRecords)) localStorage.setItem('observationRecords', JSON.stringify(observationRecords));

// DOM 元素
const svgWrapper = document.getElementById('plant-svg-wrapper');
const waterBtn = document.getElementById('water-btn');
const particlesLayer = document.getElementById('particles-layer');
const modal = document.getElementById('quote-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const quoteText = document.getElementById('quote-text');
const quoteExplanation = document.getElementById('quote-explanation');
const nameInput = document.getElementById('player-name');
const levelDisplay = document.getElementById('level-display');
const wateredBubble = document.getElementById('watered-bubble');

// 收藏簿 DOM
const collectionModal = document.getElementById('collection-modal');
const closeCollectionBtn = document.getElementById('close-collection-btn');
const collectionBtn = document.getElementById('btn-collection');
const collectionList = document.getElementById('collection-list');
const scrollTabs = document.querySelectorAll('.scroll-tab');
let currentCollectionTab = 'all';

// 省察簿 DOM
const reflectionModal = document.getElementById('reflection-modal');
const closeReflectionBtn = document.getElementById('close-reflection-btn');
const reflectionBtn = document.getElementById('btn-reflection');
const thoughtCounterBtn = document.getElementById('thought-counter-btn');
const thoughtResetBtn = document.getElementById('thought-reset-btn');
const thoughtCountDisplay = document.getElementById('thought-count-display');
const reflectionList = document.getElementById('reflection-list');
const reflectionInput = document.getElementById('reflection-input');
const addReflectionBtn = document.getElementById('add-reflection-btn');

// 覺知生活 DOM
const awarenessModal = document.getElementById('awareness-modal');
const closeAwarenessBtn = document.getElementById('close-awareness-btn');
const awarenessBtn = document.getElementById('btn-awareness');
const awarenessCounterBtn = document.getElementById('awareness-counter-btn');
const awarenessResetBtn = document.getElementById('awareness-reset-btn');
const awarenessCountDisplay = document.getElementById('awareness-count-display');
const awarenessList = document.getElementById('awareness-list');
const awarenessInput = document.getElementById('awareness-input');
const addAwarenessBtn = document.getElementById('add-awareness-btn');

// 情緒轉化 DOM
const emotionModal = document.getElementById('emotion-modal');
const closeEmotionBtn = document.getElementById('close-emotion-btn');
const emotionBtn = document.getElementById('btn-emotion');
const emotionCounterBtn = document.getElementById('emotion-counter-btn');
const emotionResetBtn = document.getElementById('emotion-reset-btn');
const emotionCountDisplay = document.getElementById('emotion-count-display');
const emotionList = document.getElementById('emotion-list');
const emotionInput = document.getElementById('emotion-input');
const addEmotionBtn = document.getElementById('add-emotion-btn');

// 去惡實踐 DOM
const practiceModal = document.getElementById('practice-modal');
const closePracticeBtn = document.getElementById('close-practice-btn');
const practiceBtn = document.getElementById('btn-practice');
const practiceCounterBtn = document.getElementById('practice-counter-btn');
const practiceResetBtn = document.getElementById('practice-reset-btn');
const practiceCountDisplay = document.getElementById('practice-count-display');
const practiceList = document.getElementById('practice-list');
const practiceInput = document.getElementById('practice-input');
const addPracticeBtn = document.getElementById('add-practice-btn');

// 為善實踐 DOM
const goodnessModal = document.getElementById('goodness-modal');
const closeGoodnessBtn = document.getElementById('close-goodness-btn');
const goodnessBtn = document.getElementById('btn-goodness');
const goodnessCounterBtn = document.getElementById('goodness-counter-btn');
const goodnessResetBtn = document.getElementById('goodness-reset-btn');
const goodnessCountDisplay = document.getElementById('goodness-count-display');
const goodnessList = document.getElementById('goodness-list');
const goodnessInput = document.getElementById('goodness-input');
const addGoodnessBtn = document.getElementById('add-goodness-btn');

// 清明觀測 DOM
const observationModal = document.getElementById('observation-modal');
const closeObservationBtn = document.getElementById('close-observation-btn');
const observationBtn = document.getElementById('btn-observation');
const obsDateInput = document.getElementById('obs-date');
const obsMinutesSelect = document.getElementById('obs-minutes');
const obsClarityInput = document.getElementById('obs-clarity');
const clarityValueDisplay = document.getElementById('clarity-value-display');
const addObservationBtn = document.getElementById('add-observation-btn');

// 共用列表事件綁定函數 (編輯與刪除)
function attachListEvents(listElement, recordsArray, storageKey, renderFn) {
    listElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            if (confirm('確定要刪除這筆紀錄嗎？')) {
                const index = recordsArray.findIndex(r => r.id === id);
                if (index > -1) {
                    recordsArray.splice(index, 1);
                    localStorage.setItem(storageKey, JSON.stringify(recordsArray));
                    renderFn();
                }
            }
        } else if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            const record = recordsArray.find(r => r.id === id);
            if (!record) return;
            
            const itemElement = e.target.closest('[class$="-item"]');
            if (!itemElement || itemElement.querySelector('.edit-textarea')) return;
            
            const contentDiv = itemElement.querySelector('[class$="-content"], [class$="-content-text"]');
            if (!contentDiv) return;

            contentDiv.innerHTML = `
                <textarea class="edit-textarea">${record.content}</textarea>
                <div class="edit-actions">
                    <button class="save-edit-btn" data-id="${id}">儲存</button>
                    <button class="cancel-edit-btn">取消</button>
                </div>
            `;
            
            const saveBtn = contentDiv.querySelector('.save-edit-btn');
            const cancelBtn = contentDiv.querySelector('.cancel-edit-btn');
            const textarea = contentDiv.querySelector('.edit-textarea');
            
            saveBtn.addEventListener('click', () => {
                const newText = textarea.value.trim();
                if (newText) {
                    record.content = newText;
                    localStorage.setItem(storageKey, JSON.stringify(recordsArray));
                    renderFn();
                }
            });
            
            cancelBtn.addEventListener('click', () => {
                renderFn();
            });
        }
    });
}

// 初始化
function init() {
    nameInput.value = playerName;
    
    // 確保階段不超過最大值
    if (currentStage >= plantStages.length) {
        currentStage = plantStages.length - 1;
    }
    
    renderPlant();
    if (levelDisplay) levelDisplay.textContent = currentStage + 1;

    // 檢查今天是否已簽到
    const today = new Date().toDateString();
    if (lastCheckInDate !== today) {
        // 未簽到，顯示彈窗
        showDailyQuote();
    }
    
    // 檢查今天是否已澆水
    if (lastWaterDate === today) {
        waterBtn.classList.add('disabled');
        const textSpan = waterBtn.querySelector('.btn-primary-text');
        if (textSpan) textSpan.textContent = '今日已領取';
        if (wateredBubble) wateredBubble.classList.remove('hidden');
    }

    // 事件監聽
    waterBtn.addEventListener('click', handleWatering);
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // 預設日期為今天
    const todayISO = new Date().toISOString().split('T')[0];
    obsDateInput.value = todayISO;

    // 綁定所有列表的編輯/刪除事件
    attachListEvents(reflectionList, reflections, 'reflections', renderReflections);
    attachListEvents(awarenessList, awarenessRecords, 'awarenessRecords', renderAwareness);
    attachListEvents(emotionList, emotionRecords, 'emotionRecords', renderEmotion);
    attachListEvents(practiceList, practiceRecords, 'practiceRecords', renderPractice);
    attachListEvents(goodnessList, goodnessRecords, 'goodnessRecords', renderGoodness);

    // 填充冥想分鐘下拉選單 1~60
    for(let i = 1; i <= 60; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if(i === 15) option.selected = true; // 預設 15 分鐘
        obsMinutesSelect.appendChild(option);
    }
    
    nameInput.addEventListener('change', (e) => {
        playerName = e.target.value;
        localStorage.setItem('playerName', playerName);
    });

    // 收藏簿事件
    collectionBtn.addEventListener('click', () => {
        collectionModal.classList.remove('hidden');
        renderCollection();
    });

    closeCollectionBtn.addEventListener('click', () => {
        collectionModal.classList.add('hidden');
    });

    scrollTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            scrollTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentCollectionTab = e.target.dataset.tab;
            renderCollection();
        });
    });

    // 念頭省察事件
    reflectionBtn.addEventListener('click', () => {
        reflectionModal.classList.remove('hidden');
        thoughtCountDisplay.textContent = thoughtCount;
        renderReflections();
    });

    closeReflectionBtn.addEventListener('click', () => {
        reflectionModal.classList.add('hidden');
    });

    thoughtCounterBtn.addEventListener('click', () => {
        thoughtCount++;
        thoughtCountDisplay.textContent = thoughtCount;
        localStorage.setItem('thoughtCount', thoughtCount);
    });

    thoughtResetBtn.addEventListener('click', () => {
        if (confirm('確定要將起心動念次數歸零嗎？')) {
            thoughtCount = 0;
            thoughtCountDisplay.textContent = thoughtCount;
            localStorage.setItem('thoughtCount', thoughtCount);
        }
    });

    addReflectionBtn.addEventListener('click', () => {
        const text = reflectionInput.value.trim();
        if (text) {
            const now = new Date();
            const timeString = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            reflections.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                date: timeString,
                content: text
            });
            
            localStorage.setItem('reflections', JSON.stringify(reflections));
            reflectionInput.value = '';
            renderReflections();
        }
    });

    // 覺知生活事件
    awarenessBtn.addEventListener('click', () => {
        awarenessModal.classList.remove('hidden');
        awarenessCountDisplay.textContent = awarenessCount;
        renderAwareness();
    });

    closeAwarenessBtn.addEventListener('click', () => {
        awarenessModal.classList.add('hidden');
    });

    awarenessCounterBtn.addEventListener('click', () => {
        awarenessCount++;
        awarenessCountDisplay.textContent = awarenessCount;
        localStorage.setItem('awarenessCount', awarenessCount);
    });

    awarenessResetBtn.addEventListener('click', () => {
        if (confirm('確定要將清明自覺次數歸零嗎？')) {
            awarenessCount = 0;
            awarenessCountDisplay.textContent = awarenessCount;
            localStorage.setItem('awarenessCount', awarenessCount);
        }
    });

    addAwarenessBtn.addEventListener('click', () => {
        const text = awarenessInput.value.trim();
        if (text) {
            const now = new Date();
            const timeString = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            awarenessRecords.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                date: timeString,
                content: text
            });
            
            localStorage.setItem('awarenessRecords', JSON.stringify(awarenessRecords));
            awarenessInput.value = '';
            renderAwareness();
        }
    });

    // 情緒轉化事件
    emotionBtn.addEventListener('click', () => {
        emotionModal.classList.remove('hidden');
        emotionCountDisplay.textContent = emotionCount;
        renderEmotion();
    });

    closeEmotionBtn.addEventListener('click', () => {
        emotionModal.classList.add('hidden');
    });

    emotionCounterBtn.addEventListener('click', () => {
        emotionCount++;
        emotionCountDisplay.textContent = emotionCount;
        localStorage.setItem('emotionCount', emotionCount);
        
        // 觸發水波紋動畫
        emotionCounterBtn.classList.remove('clicked');
        void emotionCounterBtn.offsetWidth; // 強制重繪
        emotionCounterBtn.classList.add('clicked');
    });

    emotionResetBtn.addEventListener('click', () => {
        if (confirm('確定要將停下關照次數歸零嗎？')) {
            emotionCount = 0;
            emotionCountDisplay.textContent = emotionCount;
            localStorage.setItem('emotionCount', emotionCount);
        }
    });

    addEmotionBtn.addEventListener('click', () => {
        const text = emotionInput.value.trim();
        if (text) {
            const now = new Date();
            const timeString = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            emotionRecords.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                date: timeString,
                content: text
            });
            
            localStorage.setItem('emotionRecords', JSON.stringify(emotionRecords));
            emotionInput.value = '';
            renderEmotion();
        }
    });

    // 去惡實踐事件
    practiceBtn.addEventListener('click', () => {
        practiceModal.classList.remove('hidden');
        practiceCountDisplay.textContent = practiceCount;
        renderPractice();
    });

    closePracticeBtn.addEventListener('click', () => {
        practiceModal.classList.add('hidden');
    });

    practiceCounterBtn.addEventListener('click', () => {
        practiceCount++;
        practiceCountDisplay.textContent = practiceCount;
        localStorage.setItem('practiceCount', practiceCount);
    });

    practiceResetBtn.addEventListener('click', () => {
        if (confirm('確定要將節制/轉化次數歸零嗎？')) {
            practiceCount = 0;
            practiceCountDisplay.textContent = practiceCount;
            localStorage.setItem('practiceCount', practiceCount);
        }
    });

    addPracticeBtn.addEventListener('click', () => {
        const text = practiceInput.value.trim();
        if (text) {
            const now = new Date();
            const timeString = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            practiceRecords.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                date: timeString,
                content: text
            });
            
            localStorage.setItem('practiceRecords', JSON.stringify(practiceRecords));
            practiceInput.value = '';
            renderPractice();
        }
    });

    // 為善實踐事件
    goodnessBtn.addEventListener('click', () => {
        goodnessModal.classList.remove('hidden');
        goodnessCountDisplay.textContent = goodnessCount;
        renderGoodness();
    });

    closeGoodnessBtn.addEventListener('click', () => {
        goodnessModal.classList.add('hidden');
    });

    goodnessCounterBtn.addEventListener('click', () => {
        goodnessCount++;
        goodnessCountDisplay.textContent = goodnessCount;
        localStorage.setItem('goodnessCount', goodnessCount);
    });

    goodnessResetBtn.addEventListener('click', () => {
        if (confirm('確定要將真誠利他次數歸零嗎？')) {
            goodnessCount = 0;
            goodnessCountDisplay.textContent = goodnessCount;
            localStorage.setItem('goodnessCount', goodnessCount);
        }
    });

    addGoodnessBtn.addEventListener('click', () => {
        const text = goodnessInput.value.trim();
        if (text) {
            const now = new Date();
            const timeString = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            goodnessRecords.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                date: timeString,
                content: text
            });
            
            localStorage.setItem('goodnessRecords', JSON.stringify(goodnessRecords));
            goodnessInput.value = '';
            renderGoodness();
        }
    });

    // 清明觀測事件
    observationBtn.addEventListener('click', () => {
        observationModal.classList.remove('hidden');
        renderObservationChart();
        renderObservationList();
    });

    closeObservationBtn.addEventListener('click', () => {
        observationModal.classList.add('hidden');
    });

    obsClarityInput.addEventListener('input', (e) => {
        clarityValueDisplay.textContent = e.target.value;
    });

    addObservationBtn.addEventListener('click', () => {
        const dateStr = obsDateInput.value;
        const minutes = parseInt(obsMinutesSelect.value);
        const clarity = parseInt(obsClarityInput.value);

        if (!dateStr) return;

        // 檢查是否已有該日期紀錄，有則覆蓋，無則新增
        const existingIndex = observationRecords.findIndex(r => r.date === dateStr);
        const recordObj = {
            id: existingIndex >= 0 ? observationRecords[existingIndex].id : Date.now().toString() + Math.random().toString(36).substr(2, 5),
            date: dateStr,
            minutes,
            clarity
        };

        if (existingIndex >= 0) {
            observationRecords[existingIndex] = recordObj;
        } else {
            observationRecords.push(recordObj);
        }

        // 依日期排序
        observationRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        localStorage.setItem('observationRecords', JSON.stringify(observationRecords));
        renderObservationChart();
        renderObservationList();
    });
}

// 渲染清明觀測列表
function renderObservationList() {
    const obsList = document.getElementById('obs-list');
    if (!obsList) return;
    
    obsList.innerHTML = '';
    
    if (observationRecords.length === 0) {
        obsList.innerHTML = `<div class="empty-state">目前尚未有觀測紀錄。</div>`;
        return;
    }

    // 倒序顯示，最新的在最上方
    [...observationRecords].reverse().forEach(record => {
        const item = document.createElement('div');
        item.className = 'obs-list-item';
        
        item.innerHTML = `
            <div class="obs-item-info">
                <span class="obs-item-date">${record.date}</span>
                <span>時長: <span class="obs-item-minutes">${record.minutes}</span>分</span>
                <span>指數: <span class="obs-item-clarity">${record.clarity > 0 ? '+'+record.clarity : record.clarity}</span></span>
            </div>
            <div class="record-actions" style="opacity: 1;">
                <button class="edit-btn" data-id="${record.id}" title="編輯（帶入上方）">✏️</button>
                <button class="delete-btn" data-id="${record.id}" title="刪除">🗑️</button>
            </div>
        `;
        
        obsList.appendChild(item);
    });

    // 綁定列表內的按鈕事件
    obsList.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (confirm('確定要刪除這筆觀測紀錄嗎？')) {
                const index = observationRecords.findIndex(r => r.id === id);
                if (index > -1) {
                    observationRecords.splice(index, 1);
                    localStorage.setItem('observationRecords', JSON.stringify(observationRecords));
                    renderObservationChart();
                    renderObservationList();
                }
            }
        });
    });

    obsList.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const record = observationRecords.find(r => r.id === id);
            if (record) {
                // 將資料帶入上方輸入區
                obsDateInput.value = record.date;
                obsMinutesSelect.value = record.minutes;
                obsClarityInput.value = record.clarity;
                clarityValueDisplay.textContent = record.clarity;
                // 提示使用者
                addObservationBtn.textContent = '更新';
                setTimeout(() => { addObservationBtn.textContent = '記錄'; }, 2000);
            }
        });
    });
}

// 渲染植物圖片
function renderPlant() {
    svgWrapper.innerHTML = `<img src="images/stage${currentStage + 1}.png" class="plant-image grow-animation" alt="Plant Stage ${currentStage + 1}">`;
}

// 顯示每日語錄
function showDailyQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = randomQuote.text;
    quoteExplanation.textContent = randomQuote.explanation;
    
    // 記錄今天已簽到
    const today = new Date().toDateString();
    
    // 將語錄加入收藏 (如果今天尚未收藏過)
    if (lastCheckInDate !== today) {
        const dateObj = new Date();
        const dateString = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
        
        collectedQuotes.push({
            id: Date.now().toString(),
            date: dateString,
            text: randomQuote.text,
            explanation: randomQuote.explanation,
            isFavorite: false
        });
        localStorage.setItem('collectedQuotes', JSON.stringify(collectedQuotes));
    }

    localStorage.setItem('lastCheckInDate', today);
    lastCheckInDate = today;

    // 移除 hidden 以顯示
    modal.classList.remove('hidden');
}

// 渲染收藏簿
function renderCollection() {
    collectionList.innerHTML = '';
    
    let displayQuotes = collectedQuotes;
    if (currentCollectionTab === 'favorites') {
        displayQuotes = collectedQuotes.filter(q => q.isFavorite);
    }

    if (displayQuotes.length === 0) {
        collectionList.innerHTML = `<div class="empty-state">尚無${currentCollectionTab === 'favorites' ? '喜愛' : '收藏'}的語錄...</div>`;
        return;
    }

    // 倒序顯示，最新的在最前
    [...displayQuotes].reverse().forEach(quote => {
        const item = document.createElement('div');
        item.className = 'quote-item';
        
        item.innerHTML = `
            <div class="quote-item-date">${quote.date}</div>
            <div class="quote-item-text">${quote.text}</div>
            <button class="heart-btn ${quote.isFavorite ? 'favorited' : ''}" data-id="${quote.id}">
                ${quote.isFavorite ? '♥' : '♡'}
            </button>
        `;
        
        collectionList.appendChild(item);
    });

    // 綁定愛心點擊事件
    document.querySelectorAll('.heart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            toggleFavorite(id);
        });
    });
}

function toggleFavorite(id) {
    const quote = collectedQuotes.find(q => q.id === id);
    if (quote) {
        quote.isFavorite = !quote.isFavorite;
        localStorage.setItem('collectedQuotes', JSON.stringify(collectedQuotes));
        renderCollection(); // 重新渲染更新畫面
    }
}

// 渲染念頭省察列表
function renderReflections() {
    reflectionList.innerHTML = '';
    
    if (reflections.length === 0) {
        reflectionList.innerHTML = `<div class="empty-state">目前尚未有任何省察記錄。</div>`;
        return;
    }

    // 倒序顯示，最新的在最上方
    [...reflections].reverse().forEach(ref => {
        const item = document.createElement('div');
        item.className = 'reflection-item';
        
        item.innerHTML = `
            <div class="record-header">
                <div class="reflection-date">${ref.date}</div>
                <div class="record-actions">
                    <button class="edit-btn" data-id="${ref.id}" title="編輯">✏️</button>
                    <button class="delete-btn" data-id="${ref.id}" title="刪除">🗑️</button>
                </div>
            </div>
            <div class="reflection-content">${ref.content.replace(/\\n/g, '<br>')}</div>
        `;
        
        reflectionList.appendChild(item);
    });
}

// 渲染覺知生活列表
function renderAwareness() {
    awarenessList.innerHTML = '';
    
    if (awarenessRecords.length === 0) {
        awarenessList.innerHTML = `<div class="empty-state">目前尚未有任何覺知記錄。</div>`;
        return;
    }

    // 倒序顯示
    [...awarenessRecords].reverse().forEach(record => {
        const item = document.createElement('div');
        item.className = 'awareness-item';
        
        item.innerHTML = `
            <div class="record-header">
                <div class="awareness-date">${record.date}</div>
                <div class="record-actions">
                    <button class="edit-btn" data-id="${record.id}" title="編輯">✏️</button>
                    <button class="delete-btn" data-id="${record.id}" title="刪除">🗑️</button>
                </div>
            </div>
            <div class="awareness-content-text">${record.content.replace(/\\n/g, '<br>')}</div>
        `;
        
        awarenessList.appendChild(item);
    });
}

// 渲染情緒轉化列表
function renderEmotion() {
    emotionList.innerHTML = '';
    
    if (emotionRecords.length === 0) {
        emotionList.innerHTML = `<div class="empty-state">目前尚未有任何轉化記錄。</div>`;
        return;
    }

    // 倒序顯示
    [...emotionRecords].reverse().forEach(record => {
        const item = document.createElement('div');
        item.className = 'emotion-item';
        
        item.innerHTML = `
            <div class="record-header">
                <div class="emotion-date">${record.date}</div>
                <div class="record-actions">
                    <button class="edit-btn" data-id="${record.id}" title="編輯">✏️</button>
                    <button class="delete-btn" data-id="${record.id}" title="刪除">🗑️</button>
                </div>
            </div>
            <div class="emotion-content-text">${record.content.replace(/\\n/g, '<br>')}</div>
        `;
        
        emotionList.appendChild(item);
    });
}

// 渲染去惡實踐列表
function renderPractice() {
    practiceList.innerHTML = '';
    
    if (practiceRecords.length === 0) {
        practiceList.innerHTML = `<div class="empty-state" style="color: rgba(255,255,255,0.5);">目前尚未有任何實踐記錄。</div>`;
        return;
    }

    // 倒序顯示
    [...practiceRecords].reverse().forEach(record => {
        const item = document.createElement('div');
        item.className = 'practice-item';
        
        item.innerHTML = `
            <div class="record-header">
                <div class="practice-date">${record.date}</div>
                <div class="record-actions">
                    <button class="edit-btn" data-id="${record.id}" title="編輯">✏️</button>
                    <button class="delete-btn" data-id="${record.id}" title="刪除">🗑️</button>
                </div>
            </div>
            <div class="practice-content-text">${record.content.replace(/\\n/g, '<br>')}</div>
        `;
        
        practiceList.appendChild(item);
    });
}

// 渲染為善實踐列表
function renderGoodness() {
    goodnessList.innerHTML = '';
    
    if (goodnessRecords.length === 0) {
        goodnessList.innerHTML = `<div class="empty-state">目前尚未有任何善行記錄。</div>`;
        return;
    }

    // 倒序顯示
    [...goodnessRecords].reverse().forEach(record => {
        const item = document.createElement('div');
        item.className = 'goodness-item';
        
        item.innerHTML = `
            <div class="record-header">
                <div class="goodness-date">${record.date}</div>
                <div class="record-actions">
                    <button class="edit-btn" data-id="${record.id}" title="編輯">✏️</button>
                    <button class="delete-btn" data-id="${record.id}" title="刪除">🗑️</button>
                </div>
            </div>
            <div class="goodness-content-text">${record.content.replace(/\\n/g, '<br>')}</div>
        `;
        
        goodnessList.appendChild(item);
    });
}

// 渲染清明觀測折線圖
function renderObservationChart() {
    const chartGrid = document.getElementById('chart-grid');
    const chartLine = document.getElementById('chart-line');
    const chartPoints = document.getElementById('chart-points');
    const chartXLabels = document.getElementById('chart-x-labels');
    const svg = document.getElementById('observation-chart');

    // 清空舊內容
    chartGrid.innerHTML = '';
    chartPoints.innerHTML = '';
    chartXLabels.innerHTML = '';
    chartLine.setAttribute('points', '');

    if (observationRecords.length === 0) {
        return; // 無資料不繪製
    }

    const chartHeight = 240;
    const paddingY = 20; // 上下預留空間
    const effectiveHeight = chartHeight - paddingY * 2;
    const pointSpacing = 80; // 每個資料點之間的水平間距
    const chartWidth = Math.max(600, observationRecords.length * pointSpacing + 100);
    
    svg.setAttribute('width', chartWidth);

    // 繪製背景網格與零點線
    for(let i = -3; i <= 3; i++) {
        const y = paddingY + (3 - i) * (effectiveHeight / 6);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", y);
        line.setAttribute("x2", chartWidth);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", i === 0 ? "rgba(137, 158, 172, 0.4)" : "rgba(212, 196, 168, 0.2)");
        line.setAttribute("stroke-width", i === 0 ? "1.5" : "1");
        if (i !== 0) line.setAttribute("stroke-dasharray", "4,4");
        chartGrid.appendChild(line);
    }

    // 計算座標並繪製
    let pointsString = "";
    observationRecords.forEach((record, index) => {
        const x = 50 + index * pointSpacing;
        // clarity: -3 ~ 3 映射到 Y 軸
        const y = paddingY + (3 - record.clarity) * (effectiveHeight / 6);
        pointsString += `${x},${y} `;

        // 繪製節點圓圈
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "#FDFBF7");
        circle.setAttribute("stroke", "#899EAC");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("filter", "url(#glow)"); // 柔和發光
        
        // 懸停時可顯示提示（此處簡化處理，透過 title 標籤）
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = `日期: ${record.date}\n清明指數: ${record.clarity}\n冥想: ${record.minutes}分`;
        circle.appendChild(title);
        
        chartPoints.appendChild(circle);

        // 繪製 X 軸標籤 (日期)
        const dateText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        dateText.setAttribute("x", x);
        dateText.setAttribute("y", chartHeight - 2); // 貼近底部
        dateText.setAttribute("text-anchor", "middle");
        dateText.setAttribute("fill", "var(--ink-light)");
        dateText.setAttribute("font-size", "10px");
        const dateObj = new Date(record.date);
        dateText.textContent = `${dateObj.getMonth()+1}/${dateObj.getDate()}`;
        chartXLabels.appendChild(dateText);

        // 繪製冥想時間標籤（在節點上方）
        const minText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        minText.setAttribute("x", x);
        minText.setAttribute("y", y - 12);
        minText.setAttribute("text-anchor", "middle");
        minText.setAttribute("fill", "var(--wood-dark)");
        minText.setAttribute("font-size", "10px");
        minText.textContent = `${record.minutes}m`;
        chartPoints.appendChild(minText);
    });

    chartLine.setAttribute('points', pointsString.trim());
}

// 處理澆水邏輯
function handleWatering() {
    const today = new Date().toDateString();
    if (lastWaterDate === today) {
        // 如果已澆水，點擊大按鈕也能彈出今日語錄回顧
        showDailyQuote();
        return;
    }

    // 禁用按鈕防連點與標記今日已澆水
    waterBtn.classList.add('disabled');
    const textSpan = waterBtn.querySelector('.btn-primary-text');
    if (textSpan) textSpan.textContent = '今日已領取';
    if (wateredBubble) wateredBubble.classList.remove('hidden');
    
    lastWaterDate = today;
    localStorage.setItem('lastWaterDate', lastWaterDate);
    
    waterCount++;
    localStorage.setItem('waterCount', waterCount);

    // 澆水順便觸發語錄
    if (lastCheckInDate !== today) {
        showDailyQuote();
    }

    // 創建澆水特效
    createWaterEffects();

    // 延遲一段時間後處理成長邏輯
    setTimeout(() => {
        const newStage = Math.min(4, Math.floor(waterCount / 10));
        if (newStage > currentStage) {
            currentStage = newStage;
            if (levelDisplay) levelDisplay.textContent = currentStage + 1;
            renderPlant();
        }
    }, 2000); // 等待特效完成
}

// 澆水柔和特效 (水滴與光點)
function createWaterEffects() {
    // 建立 5 滴水滴
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.classList.add('water-drop');
            // 隨機位置在中央上方
            const leftOffset = 130 + Math.random() * 40;
            drop.style.left = `${leftOffset}px`;
            drop.style.top = '100px';
            
            particlesLayer.appendChild(drop);
            
            // 特效結束後移除節點
            setTimeout(() => drop.remove(), 1500);
        }, i * 200); // 錯開下落時間
    }

    // 建立數個上升的光點
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const light = document.createElement('div');
            light.classList.add('light-particle');
            
            const leftOffset = 100 + Math.random() * 100;
            const topOffset = 250 + Math.random() * 50;
            
            light.style.left = `${leftOffset}px`;
            light.style.top = `${topOffset}px`;
            
            particlesLayer.appendChild(light);
            
            setTimeout(() => light.remove(), 2000);
        }, 500 + Math.random() * 1000);
    }
}

// -------------------
// 分享與結算功能
// -------------------
const shareBtn = document.getElementById('floating-share-btn');
const shareModal = document.getElementById('share-modal');
const closeShareBtn = document.getElementById('close-share-btn');
const shareImageContainer = document.getElementById('share-image-container');

if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        // 準備模板數據
        document.getElementById('share-player-name').textContent = playerName || '致良知';
        
        // 統計 localStorage 數據
        const reflectionsData = JSON.parse(localStorage.getItem('reflections') || '[]');
        const awarenesses = JSON.parse(localStorage.getItem('awarenessRecords') || '[]');
        const emotions = JSON.parse(localStorage.getItem('emotionRecords') || '[]');
        const practices = JSON.parse(localStorage.getItem('practiceRecords') || '[]');
        const goodnesses = JSON.parse(localStorage.getItem('goodnessRecords') || '[]');
        const obs = JSON.parse(localStorage.getItem('observationRecords') || '[]');

        // 1. 渲染觀測折線圖，並複製與縮放 SVG 到結算卡片
        renderObservationChart();
        const originalChart = document.getElementById('observation-chart');
        const shareChartWrapper = document.getElementById('share-chart-wrapper');
        if (originalChart && shareChartWrapper) {
            if (obs.length === 0) {
                shareChartWrapper.innerHTML = '<div style="font-size:12px; color:#888; padding:20px; text-align:center; font-weight:700;">尚無觀測數據</div>';
            } else {
                const chartWidth = originalChart.getAttribute('width') || '600';
                shareChartWrapper.innerHTML = `
                    <svg viewBox="0 0 ${chartWidth} 240" style="width: 100%; height: auto; display: block;" xmlns="http://www.w3.org/2000/svg">
                        ${originalChart.innerHTML}
                    </svg>
                `;
            }
        }

        // 2. 取得近期 3 則紀錄並渲染至結算卡片
        const allRecords = [];
        const getTimestamp = (r) => {
            if (r.id && !isNaN(parseInt(r.id.substring(0, 13)))) {
                return parseInt(r.id.substring(0, 13));
            }
            if (r.date) {
                return new Date(r.date.replace(/-/g, '/')).getTime();
            }
            return 0;
        };

        reflectionsData.forEach(r => allRecords.push({ ...r, category: '省', timestamp: getTimestamp(r) }));
        awarenesses.forEach(r => allRecords.push({ ...r, category: '覺', timestamp: getTimestamp(r) }));
        emotions.forEach(r => allRecords.push({ ...r, category: '情', timestamp: getTimestamp(r) }));
        practices.forEach(r => allRecords.push({ ...r, category: '惡', timestamp: getTimestamp(r) }));
        goodnesses.forEach(r => allRecords.push({ ...r, category: '善', timestamp: getTimestamp(r) }));

        // 依時間排序（最新在最前面）
        allRecords.sort((a, b) => b.timestamp - a.timestamp);
        const recentThree = allRecords.slice(0, 3);

        const recordListEl = document.getElementById('share-record-list');
        if (recordListEl) {
            recordListEl.innerHTML = '';
            if (recentThree.length === 0) {
                recordListEl.innerHTML = '<div style="font-size:12px; color:#888; padding:15px; text-align:center; font-weight:700;">尚未有修心紀錄</div>';
            } else {
                recentThree.forEach(rec => {
                    const item = document.createElement('div');
                    item.className = 'share-record-item';
                    item.innerHTML = `
                        <div class="share-record-meta">
                            <span class="share-record-badge">${rec.category}</span>
                            <span class="share-record-date">${rec.date || ''}</span>
                        </div>
                        <div class="share-record-content">${rec.content}</div>
                    `;
                    recordListEl.appendChild(item);
                });
            }
        }

        shareBtn.textContent = '產生中...';
        
        try {
            const template = document.getElementById('share-card-template');
            // 讓 template 暫時回到 viewport 內以便 html2canvas 繪製 (保持 z-index 為負數不遮擋畫面)
            template.style.left = '0px';
            
            const canvas = await html2canvas(template, {
                backgroundColor: null,
                scale: 2 // 提高解析度
            });
            
            // 繪製完畢，將 template 移回畫面外
            template.style.left = '-9999px';
            
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            
            shareImageContainer.innerHTML = '';
            shareImageContainer.appendChild(img);
            
            shareModal.classList.remove('hidden');
        } catch (error) {
            console.error("生成圖片失敗", error);
            alert("生成圖片失敗，請確保有網路連線或稍後再試。");
            document.getElementById('share-card-template').style.left = '-9999px';
        } finally {
            shareBtn.textContent = '📸 結算';
        }
    });
}

if (closeShareBtn) {
    closeShareBtn.addEventListener('click', () => {
        shareModal.classList.add('hidden');
    });
}

// ---------------------- 背景音樂控制 ----------------------
const bgm = document.getElementById('bgm');
const btnMusic = document.getElementById('btn-music');
let isMusicPlaying = false;
let userInteractedForMusic = false;

if (bgm && btnMusic) {
    // 預設將音樂按鈕設為靜音狀態
    btnMusic.classList.add('muted');
    bgm.volume = 0.5; // 預設稍微小聲一點，比較放鬆

    // 切換音樂播放/暫停的函數
    function toggleMusic() {
        if (isMusicPlaying) {
            bgm.pause();
            isMusicPlaying = false;
            btnMusic.classList.add('muted');
        } else {
            bgm.play().then(() => {
                isMusicPlaying = true;
                btnMusic.classList.remove('muted');
            }).catch(e => {
                console.warn("無法自動播放背景音樂：", e);
            });
        }
    }

    // 點擊按鈕切換音樂
    btnMusic.addEventListener('click', (e) => {
        e.stopPropagation(); // 避免觸發 body 的點擊事件
        userInteractedForMusic = true; // 使用者已主動操作過
        toggleMusic();
    });

    // 為了符合瀏覽器的自動播放政策，在使用者首次互動時開始播放音樂
    document.body.addEventListener('click', () => {
        if (!userInteractedForMusic) {
            userInteractedForMusic = true;
            if (!isMusicPlaying) {
                toggleMusic();
            }
        }
    }, { once: true });
}

// 啟動應用
init();
