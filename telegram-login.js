function onTelegramAuth(user) {
    console.log("Вошёл через Telegram:", user);

    // Сохраняем Telegram-пользователя
    localStorage.setItem("tg_user", JSON.stringify(user));

    // Скрываем Telegram-кнопку
    const loginBlock = document.getElementById("telegram-login");
    if (loginBlock) loginBlock.style.display = "none";

    // Показываем инфо о пользователе
    const userInfo = document.getElementById("user-info");
    if (userInfo) {
      userInfo.style.display = "flex";

      // Проверяем кастомный ник
      const customNickname = localStorage.getItem("customNickname");
      const nickname = customNickname || user.first_name;

      userInfo.innerHTML = `
        <img src="${user.photo_url}" width="40" style="border-radius:50%; vertical-align:middle; margin-right: 10px;">
        <span style="font-weight: bold;">${nickname}</span>
      `;

      // Авто-подстановка в поле ввода ника
      const nickInput = document.getElementById("nickname-input");
      if (nickInput) nickInput.value = nickname;
    }

    // Firebase (если есть)
    if (typeof db !== "undefined") {
      const progress = {
        highscore: window.highscore || 0,
        totalScore: window.totalScore || 0,
        lastLogin: Date.now(),
      };
      db.ref("users/" + user.id).update(progress);
    }
  }
