// telegram-login.js
function onTelegramAuth(user) {
  console.log("Вошёл через Telegram:", user);

  // Показываем UI
  document.getElementById("telegram-login").style.display = "none";
  document.getElementById("user-info").innerHTML = `
    <img src="${user.photo_url}" width="40" style="border-radius:50%; vertical-align:middle;">
    <span>${user.first_name}</span>
  `;

  // Сохраняем в localStorage
  localStorage.setItem("tg_user", JSON.stringify(user));

  // Сохраняем прогресс в Firebase DB
  const progress = {
    highscore: window.highscore || 0,
    totalScore: window.totalScore || 0,
    lastLogin: Date.now(),
  };
  db.ref("users/" + user.id).update(progress);
}

// При загрузке страницы, если в localStorage есть данные — автоматически показываем профиль
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("tg_user");
  if (saved) onTelegramAuth(JSON.parse(saved));
});
