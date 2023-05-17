# Проект Mesto с регистрацией и авторизацией

Это версия приложения [Mesto на React](https://github.com/tatsenko-m/mesto-react) с реализованным функционалом регистрации и авторизации пользователей (frontend часть).

Сервис Mesto - интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.

Открыть демо:

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)](https://tatsenko-m.github.io/react-mesto-auth/)

> ⚛️ Версия приложения с открытым доступом [github.com/tatsenko-m/mesto-react](https://github.com/tatsenko-m/mesto-react) 

> 🍦 Реализация проекта Mesto на Vanilla JavaScript: [github.com/tatsenko-m/mesto](https://github.com/tatsenko-m/mesto)

## Функциональность
- Добавление/удаление карточки с фотографией и подписью
- Просмотр карточек, добавленных другими пользователями
- Постановка/снятие лайка у каждой карточки
- Счетчик количества лайков
- Просмотр полноразмерного фото карточки в отдельном модальном окне
- Редактирование имени профиля и информации о себе
- Обновление аватара
- Подгрузка информации с сервера
- Авторизация пользователя для получения доступа к сервису
- Регистрация нового пользователя

## Технологии
📄 **Верстка**
* Flexbox
* Grid Layout
* Адаптивная верстка, медиазапросы `@media`
* Относительное и абсолютное позиционирование элементов
* `hover`-эффекты с плавным переходом `transition`

⚙️ **JavaScript**
* Работа с DOM-моделью
* Разбиение кода на модули
* Асинхронный код
* Работа с API, `fetch` запросы.

⚛️ **React**
* CRA
* Синтаксис JSX
* Декларативный подход
* Функциональные компоненты
* Хуки
* React Router
* React Context
* Higher-Order Components

**а также методологии:**

- БЭМ. Файловая структура Nested
- ООП
- Принципы REST API

## Инструкция по установке

Клонируем репозиторий:
```bash
git clone https://github.com/tatsenko-m/react-mesto-auth.git
```
Устанавливаем зависимости:
```bash
cd react-mesto-auth

npm install
```
Для запуска используем команды:
```bash
npm start
# Запуск проекта в режиме разработки.
# Для просмотра результатов в браузере откройте http://localhost:3000.
# После внесения изменений страница перезагрузится автоматически.

npm run build
# Создает в папке build оптимизированную версию приложения,
# готовую к развертыванию.
```

