# Демонстрация Spring `WebClient` и микросервисов — Java

Учебный проект: React-интерфейс вызывает API первого Spring Boot-сервиса, который асинхронно обращается ко второму сервису с помощью Spring WebClient.

## Состав проекта

- **orchestrator-service** — API для фронтенда, порт `8080`; вызывает greeting-сервис через `WebClient` и возвращает реактивный ответ.
- **greeting-service** — возвращает приветствие, порт `8081`.
- **frontend** — React + TypeScript + Vite 7, порт `5173`.
- **Docker Compose** — запускает все три приложения.

```text
Браузер → React/Vite (:5173) → orchestrator-service (:8080)
                                      │
                                      └── WebClient (HTTP, reactive) → greeting-service (:8081)
```

Сохранены исходная структура директорий, маршруты и поведение API. Для orchestrator используется Spring WebFlux/WebClient; контроллер возвращает `Mono`, поэтому сетевой вызов не блокирует servlet-поток.

## Запуск через Docker

Требуются Docker и Docker Compose. Из корня проекта:

```bash
docker compose up --build
```

Откройте http://localhost:5173 и отправьте имя через форму. Остановить: `Ctrl+C`, затем `docker compose down`.

## Запуск без Docker

Требуются JDK 17+, Gradle 8.10+ и Node.js 20.19+ (или 22.12+). В отдельных терминалах:

```bash
cd greeting-service && gradle bootRun
```

```bash
cd orchestrator-service && gradle bootRun
```

```bash
cd frontend
npm install
npm run dev
```

Vite проксирует `/api` на `http://localhost:8080` по умолчанию.

## Проверка API

```bash
curl 'http://localhost:8081/api/greeting?name=Анна'
curl 'http://localhost:8080/api/message?name=Анна'
```

Ожидаемый ответ:

```json
{"message":"Привет, Анна! Ответ от greeting-service."}
```

## Структура

```text
.
├── greeting-service/       # Spring Boot + Java, порт 8081
├── orchestrator-service/   # Spring Boot WebFlux + Java WebClient, порт 8080
├── frontend/               # React + TypeScript + Vite 7
└── compose.yaml
```
