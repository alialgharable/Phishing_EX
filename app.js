const landingView = document.querySelector("#landingView");
const incidentView = document.querySelector("#incidentView");
const revealView = document.querySelector("#revealView");
const baitButton = document.querySelector("#baitButton");
const decoyDownload = document.querySelector("#decoyDownload");
const replayButton = document.querySelector("#replayButton");
const popupLayer = document.querySelector("#popupLayer");
const terminalLog = document.querySelector("#terminalLog");
const scanProgress = document.querySelector("#scanProgress");
const scanPercent = document.querySelector("#scanPercent");
const scanLabel = document.querySelector("#scanLabel");
const stageLabel = document.querySelector("#stageLabel");
const threatCounter = document.querySelector("#threatCounter");
const countdownPanel = document.querySelector("#countdownPanel");
const countdownValue = document.querySelector("#countdownValue");

const popupMessages = [
  [
    "SECURITY WARNING",
    "Unverified browser activity detected. Your attention is required.",
  ],
  ["SYSTEM ERROR", "Multiple integrity checks returned an unexpected result."],
  [
    "CRITICAL ALERT",
    "A suspicious process is attempting to interrupt this session.",
  ],
  ["SECURITY SCAN", "Browser storage analysis paused at an unknown boundary."],
  [
    "CONNECTION INTERRUPTED",
    "The safe channel could not confirm this request.",
  ],
  ["DEVICE NOTICE", "Your session has been marked for manual review."],
  [
    "ACCESS BLOCKED",
    "This browser cannot verify the requested security clearance.",
  ],
  [
    "THREAT DETECTED",
    "17 suspicious events were detected in the current session.",
  ],
  [
    "RECOVERY FAILED",
    "Automatic recovery could not restore a trusted connection.",
  ],
  [
    "IDENTITY CHECK",
    "The current session may not belong to the expected user.",
  ],
  ["FIREWALL NOTICE", "A protection rule was triggered by this request."],
  [
    "URGENT RESPONSE",
    "Immediate confirmation is required to prevent session loss.",
  ],
  [
    "SCAN INTERRUPTED",
    "The security scan found an unresolved browser exception.",
  ],
  ["NETWORK ALERT", "An unknown endpoint attempted to contact this page."],
  ["SYSTEM NOTICE", "Your protection status is temporarily unavailable."],
  [
    "FINAL WARNING",
    "Closing this window may leave the simulated scan incomplete.",
  ],
];
const terminalLines = [
  "> initializing security scan...",
  "> checking browser integrity...",
  "> checking extensions...",
  "> analyzing suspicious activity...",
  "> verifying secure channel...",
  "> scan response delayed...",
];
let popupCount = 0;
let timers = [];
let sessionId = Math.random().toString(16).slice(2, 6).toUpperCase();

document.querySelector("#sessionCode").textContent = `SESSION // ${sessionId}`;
document.querySelector("#incidentId").textContent = sessionId;
document.querySelector("#reportCode").textContent = sessionId;

function later(callback, delay) {
  const timer = window.setTimeout(callback, delay);
  timers.push(timer);
  return timer;
}
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function showView(view) {
  [landingView, incidentView, revealView].forEach((item) => {
    item.hidden = item !== view;
  });
  document.body.classList.toggle("incident-active", view === incidentView);
}
function clearRun() {
  timers.forEach(window.clearTimeout);
  timers = [];
  popupLayer.replaceChildren();
  terminalLog.replaceChildren();
  countdownPanel.hidden = true;
  document.body.classList.remove("panic");
  popupCount = 0;
  sessionId = Math.random().toString(16).slice(2, 6).toUpperCase();
  document.querySelector("#sessionCode").textContent =
    `SESSION // ${sessionId}`;
  document.querySelector("#incidentId").textContent = sessionId;
  document.querySelector("#reportCode").textContent = sessionId;
  scanProgress.style.width = "8%";
  scanPercent.textContent = "08%";
  threatCounter.textContent = "THREATS: 00";
}
function addTerminalLine() {
  const line = document.createElement("div");
  line.textContent = terminalLines[popupCount % terminalLines.length];
  terminalLog.append(line);
  if (terminalLog.children.length > 6) terminalLog.firstElementChild.remove();
}
function spawnPopup(intensity) {
  const [title, message] =
    popupMessages[randomBetween(0, popupMessages.length - 1)];
  const popup = document.createElement("article");
  popup.className = "fake-popup";
  popup.style.left = `${randomBetween(4, 82)}%`;
  popup.style.top = `${randomBetween(5, 78)}%`;
  popup.style.transform = `rotate(${randomBetween(-2, 2)}deg)`;
  popup.innerHTML = `<header><b>⚠ ${title}</b><span>×</span></header><p>${message}</p><button type="button">ACKNOWLEDGE</button>`;
  popup.querySelector("button").addEventListener("click", () => popup.remove());
  popupLayer.append(popup);
  popupCount += 1;
  threatCounter.textContent = `THREATS: ${String(popupCount).padStart(2, "0")}`;
  addTerminalLine();
  if (intensity > 1 && popupCount % 3 === 0)
    document.body.classList.add("panic");
}
function startCountdown() {
  countdownPanel.hidden = false;
  let remaining = 9;
  countdownValue.textContent = String(remaining).padStart(2, "0");
  const tick = () => {
    remaining -= 1;
    countdownValue.textContent = String(Math.max(remaining, 0)).padStart(
      2,
      "0",
    );
    if (remaining > 0) later(tick, 650);
    else
      later(() => {
        document.body.classList.remove("panic");
        showView(revealView);
      }, 850);
  };
  later(tick, 650);
}
function schedulePopupBurst(startDelay, count, spacing, intensity) {
  for (let index = 0; index < count; index += 1) {
    later(() => spawnPopup(intensity), startDelay + index * spacing);
  }
}
function startIncident() {
  clearRun();
  showView(incidentView);
  stageLabel.textContent = "ANALYZING REQUEST";
  scanLabel.textContent = "Scanning browser integrity";
  schedulePopupBurst(0, 16, 20, 0);
  later(() => {
    scanProgress.style.width = "27%";
    scanPercent.textContent = "27%";
    stageLabel.textContent = "SUSPICIOUS";
  }, 900);
  schedulePopupBurst(700, 28, 25, 1);
  later(() => {
    scanProgress.style.width = "51%";
    scanPercent.textContent = "51%";
    scanLabel.textContent = "Checking secure channel";
    stageLabel.textContent = "ESCALATING";
  }, 5000);
  schedulePopupBurst(3200, 40, 35, 2);
  later(() => {
    scanProgress.style.width = "78%";
    scanPercent.textContent = "78%";
    scanLabel.textContent = "Threat response pending";
    stageLabel.textContent = "CRITICAL";
  }, 10800);
  schedulePopupBurst(7200, 52, 45, 3);
  later(() => {
    scanProgress.style.width = "100%";
    scanPercent.textContent = "100%";
    stageLabel.textContent = "RESPONSE REQUIRED";
  }, 17800);
  later(startCountdown, 25000);
}
baitButton.addEventListener("click", startIncident);
decoyDownload.addEventListener("click", startIncident);
replayButton.addEventListener("click", () => {
  clearRun();
  showView(landingView);
});

startIncident();
