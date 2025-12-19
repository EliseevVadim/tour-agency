<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Поздравление с покупкой курса</title>
    <style>
        body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            min-height: 100vh;
        }

        table {
            border-collapse: collapse !important;
        }

        .button {
            font-family: Montserrat, sans-serif;
            font-weight: bold;
            text-align: center;
            border: none;
            outline: none;
            height: 54px;
            padding: 1rem 3.5rem;
            border-radius: 10px;
            color: white;
            font-size: 1.4rem;
        }

        .content-text {
            font-family: Montserrat, sans-serif;
            color: #333333;
            font-size: 16px;
            line-height: 1.3;
            text-align: center;
        }

        .highlight {
            font-weight: bold;
        }

        .logo-circle {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background-color: #dd0024;
            text-align: center;
        }
    </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4;" dir="ltr">

<table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 440px;
            border-collapse: collapse; background: url('https://putclub.ru/img/message-bg.jpg');
            background-position:center top; background-size: cover; overflow: hidden">
                <tr>
                    <td></td>
                    <td>
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="padding: 30px 0 0 0;">
                            <tr>
                                <td align="center" style="padding: 25px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr style="text-align: center;">
                                            <td align="center" class="logo-circle" width="180px"
                                                height="180px" style='border-radius: 50%; background: url("https://putclub.ru/img/bg-btn-gradient.jpg");
                                                 background-position:center top; background-size: contain;'>
                                                <img style="display: block; width: 180px; border: 0;" class="logo"
                                                     alt="logo"
                                                     src="https://putclub.ru/img/logo-courses.png">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td></td>
                </tr>

                <tr>
                    <td width="20"></td>
                    <td style="padding: 40px 30px 40px 30px; background-color: rgba(255,255,255,0.9); border-radius: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td style="padding-bottom: 20px; text-align: center;">
                                    <p class="content-text" style="font-size: 20px; line-height: 1.2; margin-bottom: 0;
                                    margin-top: 0;">
                                        Уважаемый, {{$userName}}! <br>
                                        Поздравляем с приобретением<br>
                                        курса «Путь в Туризм»<br>
                                        <span style="font-weight: bold;">{{ $courseName }}!</span>
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding-bottom: 25px;">
                                    <p class="content-text">
                                        Пакет активирован, и впереди Вас ждет увлекательное путешествие в мир
                                        туристической деятельности. Пройдя этот курс, Вы получите все необходимые знания
                                        и навыки для полноценной работы в индустрии туризма.
                                    </p>
                                    <p class="content-text">
                                        Не теряйте времени — переходите в закрытую группу и начинайте изучение с вкладки
                                        «Как это работает?».
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td align="center">
                                    <a href="{{ $link }}" target="_blank" style="color: #ffffff!important; text-decoration: none;
                                    background: url('https://putclub.ru/img/bg-btn-gradient.jpg');
                                    background-position:center top; background-size: cover; display: inline-block;
                                    color: #ffffff !important; text-decoration: none;
                                                 font-size: 1.6rem; line-height: 54px; height: 54px; padding: 0 3.5rem;
                                                  border: none; outline: none; text-align: center; border-radius: 10px;
                                            '>">
                                        Перейти
                                    </a>
                                </td>
                            </tr>

                        </table>
                    </td>
                    <td width="20"></td>
                </tr>
                <tr height="15">
                </tr>
                <tr>
                    <td></td>
                    <td align="center"
                        style="padding: 10px 30px 10px 30px; background-color: rgba(255,255,255,0.9); border-radius: 15px;">
                        <span style="font-family: Montserrat, sans-serif; font-size: 1rem;">
                            Не работает кнопка? Перейдите по ссылке ниже или скопируйте и откройте ее в браузере:
                            <a href="{{ $link }}" target="_blank"
                               style="text-decoration: underline; font-family: Montserrat, sans-serif; font-size: 1.2rem">
                                {{$link}}
                            </a>
                        </span>
                    </td>
                    <td></td>
                </tr>

                <tr>
                    <td height="25" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
