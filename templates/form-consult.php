<?
// Адрес почты на который придет сообщение
if( clean($_POST["name"]) == 'q' || clean($_POST["name"]) == 'й'  ) :
    // Отправляем только разработчику
    $mailto  = 'mischuk.alexander@gmail.com';
elseif( clean($_POST["name"]) == 'test' || clean($_POST["name"]) == 'тест' ) :
    // Отправляем только нам
    $mailto  = 'sales@smpromo.ru'.',';
    $mailto  .= 'sales@smpromo.ru';
else :
    // Отправляем всем
    $mailto  = 'sales@smpromo.ru'.',';
    $mailto  .= 'sales@smpromo.ru';
    // Скрытые копии
    $mailto_hiden = "bcc: sales@smpromo.ru".',';
    $mailto_hiden .= 'bcc: sales@smpromo.ru';
endif;

$title = 'Консультация';
$mailFrom = "zakaz@".$_SERVER['HTTP_HOST'];
$mess = '';
$headers = "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";
$headers .= "Content-Transfer-Encoding: quoted-printable\n";
$headers .= "From:Сайт SM Promo <$mailFrom>\n";
$headers .= $mailto_hiden;


// Валидация формы
if ( !empty($_POST["name"]) && !empty($_POST["tel"]) ) {
    $mess .= 'Имя клиента: '.clean( $_POST['name'] ).' <br>';
    $mess .= 'Телефон: '.clean( $_POST['tel'] ).' <br>';
    $mess .= 'Email: '.clean( $_POST['email'] ).' <br>';
    $mess .= 'Message: '.clean( $_POST['message'] ).' <br>';
    mail($mailto, $title, $mess, $headers);

    echo "Сообщение отправлено успешно!\n","Включите JavaScript в браузере!";
} elseif( !empty($_POST["tel"]) ) {
    $mess .= 'Телефон: '.clean( $_POST['tel'] ).' <br>';
    $mess .= 'Тип заявки: '.clean( $_POST['input_type'] ).' <br>';
    mail($mailto, $title, $mess, $headers);
} else {
    echo "Заполните поля имя или телефон!\n","Включите JavaScript в браузере!";
}

// Очистка GET и POST запросов
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);

    return $value;
}
?>