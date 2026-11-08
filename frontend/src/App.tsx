import { FormEvent, useState } from 'react'

type MessageResponse = {
  message: string
}

export default function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const params = new URLSearchParams({ name: name.trim() || 'мир' })
      const response = await fetch(`/api/message?${params.toString()}`)
      if (!response.ok) {
        throw new Error(`Сервис ответил с ошибкой: ${response.status}`)
      }
      const data: MessageResponse = await response.json()
      setMessage(data.message)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось связаться с сервисом')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="card">
        <div className="eyebrow"><span className="status-dot" /> ДЕМО · SPRING BOOT + REACT</div>
        <h1>Микросервисы<br /><span>на связи.</span></h1>
        <p className="intro">
          Введи имя: React отправит запрос в orchestrator-service, а тот вызовет greeting-service через <code>WebClient</code>.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Как тебя зовут?</label>
          <div className="form-row">
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Например, Анна"
              maxLength={60}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Запрос…' : 'Отправить'} <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>

        {message && <div className="result" role="status">{message}</div>}
        {error && <div className="error" role="alert">{error}. Убедись, что сервисы запущены.</div>}

        <div className="flow" aria-label="Путь запроса">
          <span>React</span><i>→</i><span>orchestrator</span><i>→</i><span>WebClient</span><i>→</i><span>greeting</span>
        </div>
      </section>
      <footer>Без базы данных · Java · Gradle Kotlin DSL · Vite 7</footer>
    </main>
  )
}
