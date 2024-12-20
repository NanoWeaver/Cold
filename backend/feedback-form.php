<?php
// Получаем данные из формы
$userName = htmlspecialchars(trim($_POST['userName']));
$userEmail = htmlspecialchars(trim($_POST['userEmail']));
$reasonAppea = htmlspecialchars(trim($_POST['reasonAppea']));
$userPhone = htmlspecialchars(trim($_POST['userPhone']));
$userMessage = htmlspecialchars(trim($_POST['userMassange']));

// Проверка на заполнение обязательных полей
if (empty($userName) || empty($userEmail) || empty($reasonAppea)) {
    die('Пожалуйста, заполните обязательные поля.');
}

// Формируем текст письма
$message = "Здравствуйте!\n\n";
$message .= "Вы получили новое сообщение с сайта:\n\n";
$message .= "Имя: $userName\n";
$message .= "Email: $userEmail\n";
$message .= "Телефон: $userPhone\n";

$reasonMap = [
    'ventilation' => 'Расчёт вентиляции',
    'conditioning' => 'Расчёт кондиционирования',
    'repair' => 'Ремонт',
    'consultation' => 'Консультация',
    'upgrade' => 'Обновление оборудования',
    'other' => 'Другое',
    'ventilationJob' => 'Вакансия Монтажник систем вентиляции',
    'conditioningJob' => 'Вакансия Монтажник систем кондиционирования',
    'designEngineer' => 'Инженер проектировщик ОВИК',
    'anotherVacancy' => 'Предложить свою вакансии',
    'consultationJob' => 'Консультация по поводу работы'
];

// Проверяем, что переданное значение есть в массиве
if (!empty($_POST['reasonAppea']) && array_key_exists($_POST['reasonAppea'], $reasonMap)) {
    $reasonAppea = $reasonMap[$_POST['reasonAppea']];
} else {
    $reasonAppea = 'Не указано';
}

$message .= "Причина обращения: $reasonAppea\n";
$message .= "Сообщение:\n$userMessage\n\n";
$message .= "С уважением, Сайт холод22.рф";

// Указываем заголовки
$headers = "From: holod22.рф <noreply@holod22.рф>\r\n";
$headers .= "Reply-To: $userEmail\r\n";

// Адрес, куда будет отправлено письмо
$to = 'kholod22@bk.ru';

// Отправляем письмо
if (mail($to, 'Новое сообщение с формы обратной связи', $message, $headers)) {
    echo 'Сообщение успешно отправлено!';
} else {
    echo 'Ошибка при отправке сообщения.';
}
?>