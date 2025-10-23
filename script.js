// ===== VARIÁVEIS GLOBAIS =====
let is24HourFormat = true;
let isFullscreen = false;

// ===== FUNÇÃO PARA ATUALIZAR O RELÓGIO =====
function updateClock() {
  const now = new Date();

  // Obter hora, minuto e segundo
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Converter para formato 12 horas se necessário
  if (!is24HourFormat) {
    hours = hours % 12 || 12;
  }

  // Adicionar zero à esquerda se necessário
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  // Atualizar display do relógio
  const timeDisplay = document.getElementById("timeDisplay");
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  // Atualizar data
  updateDate(now);
}

// ===== FUNÇÃO PARA ATUALIZAR A DATA =====
function updateDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateString = date.toLocaleDateString("pt-BR", options);
  const dateDisplay = document.getElementById("dateDisplay");
  dateDisplay.textContent = dateString;
}

// ===== FUNÇÃO PARA ALTERNAR FORMATO DE HORA =====
function toggleTimeFormat() {
  is24HourFormat = !is24HourFormat;
  const formatBtn = document.getElementById("formatBtn");
  const formatText = document.getElementById("formatText");

  if (is24HourFormat) {
    formatText.textContent = "24H";
  } else {
    formatText.textContent = "12H";
  }

  // Adicionar efeito de animação
  formatBtn.style.animation = "none";
  setTimeout(() => {
    formatBtn.style.animation = "pulse 0.5s ease";
  }, 10);

  updateClock();
}

// ===== EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  // Atualizar relógio imediatamente
  updateClock();

  // Atualizar relógio a cada segundo
  setInterval(updateClock, 1000);

  // Adicionar listeners aos botões
  const formatBtn = document.getElementById("formatBtn");

  formatBtn.addEventListener("click", toggleTimeFormat);

  // Adicionar efeito de brilho ao passar o mouse
  const clock = document.querySelector(".clock");
  clock.addEventListener("mousemove", (e) => {
    const rect = clock.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    clock.style.setProperty("--mouse-x", `${x}px`);
    clock.style.setProperty("--mouse-y", `${y}px`);
  });
});

// ===== EFEITOS ADICIONAIS =====

// Adicionar animação ao carregar a página
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Detectar mudança de aba e pausar/retomar animações
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Página está oculta
    console.log("Relógio em segundo plano");
  } else {
    // Página está visível
    updateClock();
  }
});

// ===== FUNÇÃO PARA NOTIFICAÇÕES (OPCIONAL) =====
function notifyHour() {
  const now = new Date();
  const hour = now.getHours();

  // Notificar a cada hora cheia
  if (now.getMinutes() === 0 && now.getSeconds() === 0) {
    if (Notification.permission === "granted") {
      new Notification("ARMY Time!", {
        body: `São ${hour}:00 - Hora de ouvir BTS! 🎵💜`,
        icon: "bts_logo.jpg",
      });
    }
  }
}

// Solicitar permissão para notificações
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

// Verificar notificação a cada minuto
setInterval(notifyHour, 60000);

// ===== EFEITO DE PARTÍCULAS (OPCIONAL) =====
function createParticles() {
  const container = document.querySelector(".container");

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 10 + 5 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = `hsl(${Math.random() * 60 + 250}, 100%, 50%)`;
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.opacity = "0.5";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1";
    particle.style.animation = `float ${
      Math.random() * 5 + 5
    }s ease-in-out infinite`;

    container.appendChild(particle);
  }
}

// Criar partículas ao carregar
createParticles();

// ===== CONSOLE MESSAGE =====
console.log(
  "%c💜 Bem-vindo ao ARMY Time! 💜",
  "font-size: 20px; color: #9b59b6; font-weight: bold;"
);
console.log(
  "%cRelógio Digital BTS - Feito com amor para ARMY",
  "font-size: 14px; color: #3498db;"
);
console.log(
  "%cPressione ESC para sair da tela cheia",
  "font-size: 12px; color: #f39c12;"
);
