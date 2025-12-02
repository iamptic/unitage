import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// 1. Get All Articles (for Index page)
app.get('/api/articles', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT id, slug, title, summary, category, published_at, hero_image_url FROM articles ORDER BY published_at DESC`
    ).all();
    return c.json(results);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
})

// 2. Get Single Article (for Article page)
app.get('/api/articles/:slug', async (c) => {
  const slug = c.req.param('slug');
  
  // Fetch main article
  const article = await c.env.DB.prepare(
    `SELECT * FROM articles WHERE slug = ?`
  ).bind(slug).first();

  if (!article) return c.json({ error: 'Not found' }, 404);

  // Fetch perspectives
  const { results: perspectives } = await c.env.DB.prepare(
    `SELECT * FROM perspectives WHERE article_id = ?`
  ).bind(article.id).all();

  // Fetch timeline
  const { results: timeline } = await c.env.DB.prepare(
    `SELECT * FROM timeline_events WHERE article_id = ? ORDER BY date_sort ASC`
  ).bind(article.id).all();

  return c.json({ ...article, perspectives, timeline });
})

// 3. Admin: Create/Update Article (Simplified)
app.post('/api/admin/articles', async (c) => {
  const body = await c.req.json();
  
  // Basic Insert logic
  const { success, meta } = await c.env.DB.prepare(
    `INSERT INTO articles (slug, title, content, summary, category) VALUES (?, ?, ?, ?, ?)`
  ).bind(body.slug, body.title, body.content, body.summary, body.category).run();

  return c.json({ success, id: meta.last_row_id });
})

// 4. AI Generation Stub (Заготовка под "Анализ")
app.post('/api/admin/generate-analysis', async (c) => {
    const { topic } = await c.req.json();
    
    // Здесь в будущем будет вызов OpenAI
    // Сейчас возвращаем имитацию бурной деятельности
    return c.json({
        message: "AI generation started",
        preview: `Анализ темы "${topic}" запущен. Агенты собирают данные...`,
        suggested_perspectives: [
            "Экономические причины",
            "Геополитический контекст",
            "Социальные последствия"
        ]
    })
})

app.get('/api/status', (c) => {
  return c.json({ status: 'ok', db: 'connected' })
})

// Fallback for static assets
app.get('/*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
