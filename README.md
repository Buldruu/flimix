# 🎬 Flimix — Streaming Application

Netflix загвартай монгол хэл дээрх streaming application.

![Flimix](public/logo.png)

## 🚀 Суулгах

```bash
npm install
```

## 💻 Хөгжүүлэлт

```bash
npm run dev
```

Хөтөч дээр `http://localhost:5173` нээнэ.

## 📦 Build хийх

```bash
npm run build
```

`dist/` хавтаст бэлэн файлууд үүснэ.

## 🌐 GitHub Pages дээр Deploy хийх

1. GitHub дээр шинэ repo үүсгэ
2. Дараах командуудыг ажиллуул:

```bash
git init
git add .
git commit -m "Flimix streaming app"
git branch -M main
git remote add origin https://github.com/ТАНЫ_ХЭРЭГЛЭГЧ/flimix.git
git push -u origin main
```

3. GitHub repo → **Settings** → **Pages**
4. **Source** хэсэгт **GitHub Actions** сонго
5. Push хиймэгц автоматаар deploy хийгдэнэ

Таны сайт: `https://ТАНЫ_ХЭРЭГЛЭГЧ.github.io/flimix/`

## 🛠 Технологи

- React 18
- Vite 6
- GitHub Pages + GitHub Actions

## 📁 Бүтэц

```
flimix-app/
├── public/
│   └── logo.png          # Flimix лого
├── src/
│   ├── App.jsx           # Үндсэн application
│   └── main.jsx          # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages auto-deploy
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
