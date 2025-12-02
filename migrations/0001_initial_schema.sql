-- Migration number: 0001 	 2024-12-02T00:00:00.000Z
DROP TABLE IF EXISTS perspectives;
DROP TABLE IF EXISTS timeline_events;
DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    category TEXT,
    hero_image_url TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perspectives (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    type TEXT NOT NULL, 
    title TEXT,
    content TEXT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE TABLE timeline_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    date_display TEXT NOT NULL,
    date_sort INTEGER,
    description TEXT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- TEST DATA
INSERT INTO articles (slug, title, summary, content, category, published_at) VALUES 
('second-punic-war', 'Вторая Пуническая война: Ганнибал у ворот', 'Как один человек поставил на колени величайшую империю древности.', 
'
<p class="lead text-xl text-stone-600 italic mb-8 border-l-4 border-primary pl-4">
    Этот конфликт определил судьбу западной цивилизации. Противостояние Рима и Карфагена было не просто войной за территории, а столкновением двух мировоззрений.
</p>
<h2 id="preconditions">Предпосылки конфликта</h2>
<p>
    Мир после Первой Пунической войны был шатким. Карфаген, униженный и лишенный флота, искал реванша. Гамилькар Барка расширял владения в Иберии.
</p>
<h2 id="crossing-alps">Переход через Альпы</h2>
<p>
    Ганнибал совершил невозможное. В 218 г. до н.э. он повел армию через заснеженные перевалы Альп.
</p>
<h2 id="cannae">Битва при Каннах</h2>
<p>
    Апогей военного искусства Ганнибала. Имея меньшую армию, он окружил и уничтожил превосходящие силы римлян.
</p>
<h2 id="conclusion">Заключение</h2>
<p>
    Рим выстоял благодаря невероятной стойкости своей политической системы.
</p>
', 'Античность', CURRENT_TIMESTAMP);

INSERT INTO perspectives (article_id, type, title, content) VALUES 
(1, 'economic', 'Цена войны: Серебро Иберии', 'Потеря серебряных рудников в Иберии нанесла Карфагену более сильный удар, чем разгром при Заме. Именно иберийское серебро оплачивало наемников Ганнибала. Как только Сципион захватил Новый Карфаген, финансовый поток иссяк, и армия Ганнибала осталась без жалованья.'),
(1, 'opponent', 'Взгляд из Карфагена: Политика Совета', 'Для Ганнибала это была священная война, но для Совета Ста Четырех (правительства Карфагена) — бизнес-проект. Олигархи боялись усиления власти Баркидов больше, чем Рима. Поэтому они саботировали отправку подкреплений в Италию в решающий момент.'),
(1, 'cultural', 'Культурный код: Почему Рим не сдался?', 'В эллинистическом мире (к которому привык Ганнибал) война заканчивалась после одной-двух генеральных битв. Проигравший подписывал мир. Но римская культура базировалась на концепции "Bellum Iustum" — война до полной победы. Они просто не понимали концепции "сдаться после Канн".');
