import { Hono } from 'hono'
import { cors } from 'hono/cors'
import articlesData from './articles.json'

type Bindings = {
  ASSETS: Fetcher;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// 1. Get All Articles
app.get('/api/articles', (c) => {
  // Simple sort by date
  const sorted = [...articlesData].sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  return c.json(sorted);
})

// 2. Get Single Article
app.get('/api/articles/:slug', (c) => {
  const slug = c.req.param('slug');
  const article = articlesData.find(a => a.slug === slug);

  if (!article) return c.json({ error: 'Not found' }, 404);
  return c.json(article);
})

// 3. Admin Analysis Stub
app.post('/api/admin/generate-analysis', async (c) => {
    const { topic } = await c.req.json();
    return c.json({
        message: "AI generation started",
        preview: `Анализ темы "${topic}" запущен (JSON mode).`,
        suggested_perspectives: ["Экономика", "Геополитика", "Социум"]
    })
})

// Fallback for static assets
app.get('/*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
