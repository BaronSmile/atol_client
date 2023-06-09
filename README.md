# Запуск фронтенд-приложения ATOL

## Необходимое ПО
* [Node JS](https://nodejs.org/en), желательно LTS версия.
* [Docker](https://www.docker.com/)
* Любой текстовый редактор

После клонирования необходимо выполнить команду (здесь и далее - команды нужно выполнять из корневой папки проекта):

### `npm install`
*Потребуется доступ в интернет - это установит зависимости проекта.*

## Запуск проекта локально
Для запуска проекта в режиме разработчика (например, если нужно поправить код):
### `npm start`
*Интерфейс будет доступен в браузере по ссылке [http://localhost:3000](http://localhost:3000).*

## Сборка приложения в статический билд
Если Docker-контернер не нужен, можно собрать приложение статически:
### `npm run build`
*Это создаст в корне проекта папку `build`, в ней будут лежать скомпилированные файлы проекта, которые потом можно будет 
положить на какой-нибудь веб-сервер.*

## Сборка в Docker-контейнер
Конфиг сборки контейнера лежит в файле **Dockerfile** в корне проекта.

Сборка контейнера выполняется в два этапа:
* На первом этапе собирается временный контейнер на основе `node:alpine3.18` и внутри него приложение собирается из исходников
* На втором этапе собирается сам контейнер с приложением (на основе `nginx:1.25-alpine`)

### Сборка контейнера
### `docker build -t {name}:{tag} .` 

*`{name}:{tag}` - название контейнера и версия, например `react-atol:1.0.1`*

### Запуск приложения локально
### `docker run -p 3000:80 {name}:{tag}`

### Остановка приложения
### `docker stop {имя контейнера}`

### Удаление контейнера
### `docker rm {имя контейнера}`

*Чтобы узнать имя контейнера, можно использовать команду `docker ps -a` (имя контейнера будет указано в разделе **NAMES**)*

## Дополнительно
### По поводу URL'а API
Адрес API можно поменять в файле **src/pages/Processing/Processing.tsx** на строке **25** (значение константы `baseURL`). 
После этого приложение нужно будет собрать заново.

### По поводу подпапок
Поскольку у нас целиком Docker-контейнер, сейчас приложение имеет свой собственный веб-сервер, и, соответственно, 
полностью занимает какой-то хост (если точнее, то порт на каком-то хосте), на котором приложение лежит "в корневой 
папке" (то есть доступно по URL `/`).

Когда появится большое приложение, частью которого эта форма станет, будет несколько вариантов, как сделать его 
доступным на какой-то подстранице:
* Можно взять компоненты из этого приложения и внедрить их в то приложение, которое будет разрабатываться (если, 
например, родительское приложение тоже будет на React);
* Можно собрать приложение как статический билд (см. выше) и положить его в подпапку родительского приложения на сервере
(если родительское приложение будет, например, на PHP или чём-то такого рода);
* Можно встроить это приложение в родительское с помощью HTML-тега `<iframe />`, но при этом у приложения должен будет
оставаться какой-то свой собственный адрес, по которому оно запущено. Вариант довольно странный, но на всякий случай
тоже описал.