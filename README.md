
# Запуск фрон приложения atol

## Перед запуском нужные приложение (OC Windows)

[Node JS](https://nodejs.org/en) желательно LTS версия.
<br>
[VS code](https://code.visualstudio.com/download).


Проект создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Используемые скрипты

После клонирование:

### `npm install` 

/ Позволяет использовать сторонних пакетов и легко устанавливать или обновлять их.


Для запуска проекта:

### `npm start`

Запуск приложение в режиме разработчика.\
В [http://localhost:3000](http://localhost:3000) ссылка запуска.

## Создание Docker Container

 Конфиг содержиться в файле <b>Dockerfile</b>
build контейнера:
### `docker build -t <name:tag> .` 

Запуск приложения локально:
### `docker run -p 3000:80 <name:tag>`
! <em>name:tag указываем любое название контейнера и после " : " указываем tag
Например: docker build -t react-atol:1.0.1 .</em>

Остановка приложения:
### `docker stop <names>`
// что бы узнать names набираем команду,в разделе NAMES будет указано имя контейнера
#### docker ps -a 

что бы удалить контейнер:
#### docker rm <names>

