function onTelegramAuth(user) {
  console.log("Вошёл через Telegram:", user);

  // Скрываем Telegram-кнопку
  const loginBlock = document.getElementById("telegram-login");
  if (loginBlock) loginBlock.style.display = "none";

  // Показываем блок с инфой о пользователе
  const userInfo = document.getElementById("user-info");
  if (userInfo) {
    userInfo.style.display = "flex";
    userInfo.innerHTML = `
      <img src="${user.photo_url}" width="40" style="border-radius:50%; vertical-align:middle; margin-right: 10px;">
      <span style="font-weight: bold;">${user.first_name}</span>
    `;
  }

  // Сохраняем пользователя в localStorage
  localStorage.setItem("tg_user", JSON.stringify(user));

  // Отправляем прогресс в Firebase, если инициализирован
  if (typeof db !== "undefined") {
    const progress = {
      highscore: window.highscore || 0,
      totalScore: window.totalScore || 0,
      lastLogin: Date.now(),
    };
    db.ref("users/" + user.id).update(progress);
  }
}

// Авто-вход при перезагрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("tg_user");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      onTelegramAuth(user);
    } catch (e) {
      console.error("Ошибка при разборе сохранённого пользователя:", e);
    }
  }
});
