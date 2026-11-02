const quizData = [
  {
    id: 1,
    question: "Planet apakah yang dikenal sebagai Planet Merah?",
    options: [
      { key: "A", text: "Jupiter" },
      { key: "B", text: "Saturnus" },
      { key: "C", text: "Mars" },
      { key: "D", text: "Venus" }
    ],
    correctAnswer: "C",
    explanation: "Mars dikenal sebagai Planet Merah karena permukaannya kaya oksida besi."
  },
  {
    id: 2,
    question: "Berapakah hasil dari 25 × 4 − 30?",
    options: [
      { key: "A", text: "70" },
      { key: "B", text: "90" },
      { key: "C", text: "60" },
      { key: "D", text: "80" }
    ],
    correctAnswer: "A",
    explanation: "25 × 4 = 100 dan 100 - 30 = 70."
  },
  {
    id: 3,
    question: "Siapa tokoh yang dikenal sebagai Bapak Pendidikan Nasional Indonesia?",
    options: [
      { key: "A", text: "Ki Hajar Dewantara" },
      { key: "B", text: "Soekarno" },
      { key: "C", text: "Mohammad Hatta" },
      { key: "D", text: "R.A. Kartini" }
    ],
    correctAnswer: "A",
    explanation: "Ki Hajar Dewantara dikenal sebagai Bapak Pendidikan Nasional."
  },
  {
    id: 4,
    question: "Gas apakah yang paling melimpah (paling banyak) dalam atmosfer Bumi?",
    options: [
      { key: "A", text: "Oksigen" },
      { key: "B", text: "Nitrogen" },
      { key: "C", text: "Karbon Dioksida" },
      { key: "D", text: "Hidrogen" }
    ],
    correctAnswer: "B",
    explanation: "Nitrogen merupakan gas terbanyak di atmosfer Bumi dengan porsi sekitar 78%."
  },
  {
    id: 5,
    question: "Apa nama organ tubuh manusia yang berfungsi memompa darah ke seluruh tubuh?",
    options: [
      { key: "A", text: "Lambung" },
      { key: "B", text: "Ginjal" },
      { key: "C", text: "Jantung" },
      { key: "D", text: "Paru-paru" }
    ],
    correctAnswer: "C",
    explanation: "Jantung memompa darah melalui sistem peredaran darah."
  },
  {
    id: 6,
    question: "Ibu kota resmi negara Australia adalah?",
    options: [
      { key: "A", text: "Sydney" },
      { key: "B", text: "Melbourne" },
      { key: "C", text: "Canberra" },
      { key: "D", text: "Brisbane" }
    ],
    correctAnswer: "C",
    explanation: "Canberra adalah ibu kota resmi Australia yang dipilih sebagai kompromi antara Sydney dan Melbourne."
  },
  {
    id: 7,
    question: "Berapakah hasil dari akar kuadrat dari 144?",
    options: [
      { key: "A", text: "11" },
      { key: "B", text: "12" },
      { key: "C", text: "13" },
      { key: "D", text: "14" }
    ],
    correctAnswer: "B",
    explanation: "12 × 12 = 144, sehingga akar kuadrat dari 144 adalah 12."
  },
  {
    id: 8,
    question: "Benua apakah yang memiliki wilayah daratan terluas di dunia?",
    options: [
      { key: "A", text: "Afrika" },
      { key: "B", text: "Amerika" },
      { key: "C", text: "Asia" },
      { key: "D", text: "Eropa" }
    ],
    correctAnswer: "C",
    explanation: "Asia merupakan benua terbesar di dunia yang mencakup sekitar 30% dari seluruh luas daratan Bumi."
  },
  {
    id: 9,
    question: "Unsur logam apakah yang berwujud cair pada suhu ruangan standar?",
    options: [
      { key: "A", text: "Raksa (Merkuri)" },
      { key: "B", text: "Timbal" },
      { key: "C", text: "Tembaga" },
      { key: "D", text: "Besi" }
    ],
    correctAnswer: "A",
    explanation: "Raksa (Hg) adalah satu-satunya unsur logam yang berbentuk cairan pada suhu ruangan."
  },
  {
    id: 10,
    question: "Siapakah penemu yang mematenkan bola lampu pijar praktis untuk penggunaan komersial?",
    options: [
      { key: "A", text: "Nikola Tesla" },
      { key: "B", text: "Alexander Graham Bell" },
      { key: "C", text: "Thomas Alva Edison" },
      { key: "D", text: "Albert Einstein" }
    ],
    correctAnswer: "C",
    explanation: "Thomas Alva Edison mengembangkan dan mematenkan bola lampu pijar tahan lama yang praktis secara komersial."
  }
];

const TIME_LIMIT_PER_QUESTION = 15;

const wrongVideos = [
  "asset/SoliVibes_video_no_watermark.mp4",
  "asset/GULAGMASTER_video_no_watermark.mp4",
  "asset/pedroZ_video_no_watermark.mp4"
];

let videoDeck = [];
let lastPlayedVideo = null;
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timerInterval = null;
let timeLeft = TIME_LIMIT_PER_QUESTION;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");

const videoOverlay = document.getElementById("video-overlay");
const wrongVideoPlayer = document.getElementById("wrong-video-player");

const questionProgressBadge = document.getElementById("question-progress-badge");
const quizProgressBar = document.getElementById("quiz-progress-bar");
const timerBadge = document.getElementById("timer-badge");
const timerText = document.getElementById("timer-text");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const explanationBox = document.getElementById("explanation-box");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackStatusText = document.getElementById("feedback-status-text");
const explanationText = document.getElementById("explanation-text");

const resultEmoji = document.getElementById("result-emoji");
const resultHeadline = document.getElementById("result-headline");
const resultMessage = document.getElementById("result-message");
const scoreDisplay = document.getElementById("score-display");
const statCorrect = document.getElementById("stat-correct");
const statWrong = document.getElementById("stat-wrong");
const reviewList = document.getElementById("review-list");

const resultVideoContainer = document.getElementById("result-video-container");
const resultVideo = document.getElementById("result-video");

const btnSecret = document.getElementById("btn-secret");
const secretVideoContainer = document.getElementById("secret-video-container");
const secretVideo = document.getElementById("secret-video");

["asset/DIMAS_video_no_watermark.mp4", "asset/VooDoo_video_no_watermark.mp4", ...wrongVideos].forEach(src => {
  const v = document.createElement("video");
  v.src = src;
  v.preload = "auto";
  v.load();
});

btnStart.addEventListener("click", startQuiz);
btnNext.addEventListener("click", handleNextQuestion);
btnRestart.addEventListener("click", restartQuiz);

btnSecret.addEventListener("click", () => {
  secretVideoContainer.classList.remove("hidden");
  secretVideo.currentTime = 0;
  const playPromise = secretVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      secretVideo.muted = true;
      secretVideo.play().catch(() => {});
    });
  }
  secretVideoContainer.scrollIntoView({ behavior: "smooth", block: "center" });
});

wrongVideoPlayer.addEventListener("ended", closeVideoOverlay);

wrongVideoPlayer.addEventListener("pause", () => {
  if (!wrongVideoPlayer.ended && !videoOverlay.classList.contains("hidden")) {
    wrongVideoPlayer.play().catch(() => {});
  }
});

videoOverlay.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("keydown", (e) => {
  if (!videoOverlay.classList.contains("hidden")) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

function getNextRandomVideo() {
  if (videoDeck.length === 0) {
    videoDeck = shuffleArray(wrongVideos);
    if (videoDeck.length > 1 && videoDeck[videoDeck.length - 1] === lastPlayedVideo) {
      const temp = videoDeck.pop();
      videoDeck.unshift(temp);
    }
  }
  const nextVideo = videoDeck.pop();
  lastPlayedVideo = nextVideo;
  return nextVideo;
}

function playRandomWrongVideo() {
  const selectedVideo = getNextRandomVideo();
  wrongVideoPlayer.src = selectedVideo;
  wrongVideoPlayer.currentTime = 0;
  videoOverlay.classList.remove("hidden");

  const playPromise = wrongVideoPlayer.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      wrongVideoPlayer.muted = true;
      wrongVideoPlayer.play().catch(() => {});
    });
  }
}

function closeVideoOverlay() {
  wrongVideoPlayer.pause();
  videoOverlay.classList.add("hidden");
  wrongVideoPlayer.removeAttribute("src");
  wrongVideoPlayer.load();
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  closeVideoOverlay();
  if (resultVideo) {
    resultVideo.pause();
    resultVideo.currentTime = 0;
  }
  if (resultVideoContainer) {
    resultVideoContainer.classList.add("hidden");
  }
  if (secretVideo) {
    secretVideo.pause();
    secretVideo.currentTime = 0;
  }
  if (secretVideoContainer) {
    secretVideoContainer.classList.add("hidden");
  }
  if (btnSecret) {
    btnSecret.classList.add("hidden");
    btnSecret.style.display = "none";
  }
  videoDeck = shuffleArray(wrongVideos);
  lastPlayedVideo = null;
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  shuffledQuestions = shuffleArray(quizData);

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  loadQuestion();
}

function loadQuestion() {
  const currentQ = shuffledQuestions[currentQuestionIndex];

  questionProgressBadge.textContent = `${currentQuestionIndex + 1} dari ${shuffledQuestions.length}`;
  const progressPercent = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  quizProgressBar.style.width = `${progressPercent}%`;

  questionText.textContent = currentQ.question;

  explanationBox.classList.add("hidden");
  explanationBox.classList.remove("correct-theme", "wrong-theme");
  btnNext.disabled = true;

  optionsContainer.innerHTML = "";
  currentQ.options.forEach(opt => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "option-btn";
    optionBtn.dataset.key = opt.key;
    optionBtn.innerHTML = `
      <span class="option-badge">${opt.key}</span>
      <span class="option-text">${opt.text}</span>
    `;
    optionBtn.addEventListener("click", () => handleOptionClick(opt.key));
    optionsContainer.appendChild(optionBtn);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_LIMIT_PER_QUESTION;
  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function updateTimerUI() {
  timerText.textContent = `${timeLeft}s`;

  if (timeLeft <= 5) {
    timerBadge.classList.add("warning");
  } else {
    timerBadge.classList.remove("warning");
  }
}

function handleOptionClick(selectedKey) {
  clearInterval(timerInterval);

  const currentQ = shuffledQuestions[currentQuestionIndex];
  const isCorrect = selectedKey === currentQ.correctAnswer;

  if (isCorrect) {
    score += 10;
  } else {
    playRandomWrongVideo();
  }

  userAnswers.push({
    questionIndex: currentQuestionIndex,
    question: currentQ.question,
    selectedKey: selectedKey,
    correctKey: currentQ.correctAnswer,
    isCorrect: isCorrect,
    timeout: false,
    explanation: currentQ.explanation
  });

  const optionButtons = optionsContainer.querySelectorAll(".option-btn");
  optionButtons.forEach(btn => {
    btn.disabled = true;
    const key = btn.dataset.key;

    if (key === currentQ.correctAnswer) {
      btn.classList.add("correct");
    } else if (key === selectedKey) {
      btn.classList.add("wrong");
    } else {
      btn.classList.add("dimmed");
    }
  });

  showExplanation(isCorrect, currentQ.explanation);

  btnNext.disabled = false;
  btnNext.focus();
}

function handleTimeOut() {
  const currentQ = shuffledQuestions[currentQuestionIndex];

  userAnswers.push({
    questionIndex: currentQuestionIndex,
    question: currentQ.question,
    selectedKey: null,
    correctKey: currentQ.correctAnswer,
    isCorrect: false,
    timeout: true,
    explanation: currentQ.explanation
  });

  const optionButtons = optionsContainer.querySelectorAll(".option-btn");
  optionButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.key === currentQ.correctAnswer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("dimmed");
    }
  });

  showExplanation(false, `Waktu habis! Jawaban yang benar adalah pilihan ${currentQ.correctAnswer}. ${currentQ.explanation}`);

  playRandomWrongVideo();

  btnNext.disabled = false;
  btnNext.focus();
}

function showExplanation(isCorrect, message) {
  explanationBox.classList.remove("hidden");
  if (isCorrect) {
    explanationBox.classList.add("correct-theme");
    feedbackIcon.textContent = "✓";
    feedbackStatusText.textContent = "Jawaban Tepat!";
  } else {
    explanationBox.classList.add("wrong-theme");
    feedbackIcon.textContent = "✕";
    feedbackStatusText.textContent = "Jawaban Kurang Tepat";
  }
  explanationText.textContent = message;
}

function handleNextQuestion() {
  closeVideoOverlay();
  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  clearInterval(timerInterval);

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const totalQuestions = shuffledQuestions.length;
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;

  scoreDisplay.textContent = score;
  statCorrect.textContent = correctCount;
  statWrong.textContent = wrongCount;

  if (score === 100) {
    resultEmoji.textContent = "🏆";
    resultHeadline.textContent = "Luar Biasa, Sempurna!";
    resultMessage.textContent = "Kamu berhasil menjawab semua pertanyaan dengan benar!";
    btnSecret.classList.remove("hidden");
    btnSecret.style.display = "flex";
  } else {
    btnSecret.classList.add("hidden");
    btnSecret.style.display = "none";
    if (score >= 60) {
      resultEmoji.textContent = "🎉";
      resultHeadline.textContent = "Kerja Bagus!";
      resultMessage.textContent = "Pemahaman kamu sudah sangat baik. Terus tingkatkan!";
    } else {
      resultEmoji.textContent = "💪";
      resultHeadline.textContent = "Jangan Menyerah!";
      resultMessage.textContent = "Ayo pelajari lagi penjelasannya dan coba raih skor maksimal!";
    }
  }

  secretVideoContainer.classList.add("hidden");
  if (secretVideo) {
    secretVideo.pause();
  }

  if (score !== 100) {
    resultVideoContainer.classList.remove("hidden");
    resultVideo.currentTime = 0;
    const playPromise = resultVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        resultVideo.muted = true;
        resultVideo.play().catch(() => {});
      });
    }
  } else {
    resultVideoContainer.classList.add("hidden");
    resultVideo.pause();
  }

  renderReviewList();
}

function renderReviewList() {
  reviewList.innerHTML = "";

  userAnswers.forEach((ans, idx) => {
    const item = document.createElement("div");
    item.className = `review-item ${ans.isCorrect ? "is-correct" : "is-wrong"}`;

    let statusLabel = "";
    if (ans.timeout) {
      statusLabel = `<span style="color: #ef4444;">(Waktu habis)</span>`;
    } else if (ans.isCorrect) {
      statusLabel = `<span style="color: #10b981;">(Benar: ${ans.selectedKey})</span>`;
    } else {
      statusLabel = `<span style="color: #ef4444;">(Jawabanmu: ${ans.selectedKey}, Benar: ${ans.correctKey})</span>`;
    }

    item.innerHTML = `
      <div class="review-q">${idx + 1}. ${ans.question}</div>
      <div class="review-ans">
        Status: ${statusLabel}<br>
        <small style="color: #64748b;">${ans.explanation}</small>
      </div>
    `;

    reviewList.appendChild(item);
  });
}

function restartQuiz() {
  startQuiz();
}
