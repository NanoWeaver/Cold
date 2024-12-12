<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из формы
    $userName = htmlspecialchars(trim($_POST['userName']));
    $userEmail = htmlspecialchars(trim($_POST['userEmail']));
    $reasonAppea = htmlspecialchars(trim($_POST['reasonAppea']));
    $userPhone = htmlspecialchars(trim($_POST['userPhone']));
    $userMessage = htmlspecialchars(trim($_POST['userMassange']));

    // Почта клиента (куда отправляем письмо)
    $to = "holod@холод22.рф";

    // Тема письма
    $subject = "Обратная связь: $reasonAppea";

    // Содержание письма
    $message = "Вы получили новое сообщение.\n\n";
    $message .= "Имя: $userName\n";
    $message .= "Email: $userEmail\n";
    $message .= "Телефон: $userPhone\n";
    $message .= "Причина обращения: $reasonAppea\n";
    $message .= "Сообщение: $userMessage\n";

    // Заголовки письма
    $headers = "Reply-To: $userEmail\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    // Отправка письма
    if (mail($to, $subject, $message, $headers)) {
        echo "Ваше сообщение отправлено. Спасибо за обращение!";
    } else {
        echo "Ошибка при отправке сообщения. Попробуйте ещё раз.";
    }
} else {
    echo "Данные не были отправлены. Попробуйте снова.";
}
?>