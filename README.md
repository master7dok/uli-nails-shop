# ✨ UliNail — Luxury Beauty Studio & Professional Nail Care

<p align="center">
  <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1600&auto=format&fit=crop" alt="UliNail Luxury Banner" width="100%" style="border-radius: 24px; max-height: 400px; object-fit: cover;" />
</p>

<p align="center">
  <strong>Преміальний двомовний інтернет-магазин бʼюті-товарів нового покоління з автономною адмін-панеллю</strong><br>
  <em>(Бази, топи, моделюючі гелі, гель-лаки, професійні інструменти, доглядова косметика)</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5_(App_Router)-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-6.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## 🌸 Особливості та функціонал

### 1. 🎨 Преміальний дизайн ULI NAIL (Cosmetic 3D Polish Aesthetic)
- **Художній ефект розмитих кольорів лаків на фоні**:
  - Інтерактивна багатошарова підкладка `PolishBackground` з розмитими мазками гель-лаків (`#FF5E8E` коралово-рожевий, `#00B4D8` небесний аквамарин, `#C084FC` лаванда, `#FDA4AF` пудровий персик) з ефектом `blur-[110px]` та плаваючими глянцевими 3D-краплями.
- **Фірмовий стиль та логотип ULI NAIL**:
  - Сучасна типографіка з інтегрованим градієнтним півмісяцем (Crescent Moon) у літері "U" та написом "NAIL".
  - Свіжа та вишукана кольорова гама: `brand-pink` (`#FF5E8E`), `brand-cyan` (`#00B4D8`), глибокий графіт `brand-navy` (`#1E293B`).
- **Стильні ключові секції за референсом**:
  - **Шапка (Header)**: коралово-рожева капсула `[ КАТАЛОГ ПРОДУКЦІЇ ∨ ]`, іконки соцмереж (Instagram, WhatsApp/Viber, Telegram), логотип, мовний селектор `UA / PL`, кругла рожева кнопка кошика та кнопка `МЕНЮ ≡`.
  - **Головний Hero-слайдер**: вишуканий темний градієнт з 3D-сплесками кольорових лаків, слоган *"ULINAIL: твій яскравий шлях до досконалості!"*, рожева кнопка `ЗАМОВИТИ НОВИНКУ`.
  - **Категорії (Category Grid)**: 4 великі вертикальні картки `rounded-3xl` з 3D-флаконами на сюрреалістичних подіумах з рожевими хмарами, рожеві капсули-лічильники (`63 товари`, `66 товарів` тощо).
  - **Хіти матеріалів (Bestsellers)**: двоколірний заголовок, темно-сині фільтри-капсули (`[ Бази — ]`, `[ Топи — ]`, `[ Гель лаки — ]`), пастельні підкладки карток, бейджі `New`, `Top`, `-11%`, `Сезонний` та ціни яскравим рожевим кольором.
  - **Промо-блок (Promo Showcase)**: 3D-сплеск лавандових бульбашок з флаконами Crystal Top 13ml, великий заголовок `НОВИНКА!`, опис, ціна `350 ₴` та темно-синя кнопка `ДОДАТИ В КОШИК 🛍️`.
  - **Атмосферний 3D-футер**: нічний пейзаж з місяцем та квітучими сакурами, білі бейджі платіжних систем (VISA, Mastercard, Apple Pay, Google Pay), телефон `095 657 53 27`, кнопка `INSTAGRAM` та посилання зі стильними рожевими тире `—`.
  - **Кнопка «Вгору» (ScrollToTop)**: плаваюча біла кругла кнопка з рожевою стрілкою `↑` для швидкого повернення до початку сторінки.

### 2. 🌍 Повноцінна двомовність (UA / PL)
- Синхронізація мови у URL: маршрути `/[locale]` (`/ua` та `/pl`).
- Перемикач мови у шапці зі збереженням вибору користувача у `Cookie` та `LocalStorage`.
- Повний двомовний переклад інтерфейсу, назв категорій, описів товарів, складів та характеристик.

### 3. 🎙️ Розумний голосовий пошук (Web Speech API)
- Інтеграція голосового введення українською (`uk-UA`) та польською (`pl-PL`) мовами.
- Анімований пульсуючий індикатор мікрофона під час прослуховування.
- Автоматичний перехід до результатів пошуку після розпізнавання мови.

### 4. 🛍️ Сучасний E-Commerce функціонал
- **Інлайн-вибір варіантів**: зміна об'єму (наприклад, 15ml, 30ml, 50ml) прямо у картці каталогу та на сторінці товару з динамічним оновленням ціни та SKU в реальному часі.
- **Slide-over висувний кошик**: швидкий перегляд товарів без перезавантаження сторінки, зміна кількості (±), видалення та інтерактивна шкала безкоштовної доставки.
- **Оформлення замовлення (Checkout)**: вибір способу доставки (*Нова Пошта*, *InPost Paczkomat*, *Кур'єр*), форми оплати (онлайн-картка, банківський рахунок IBAN, післяплата).
- **Кабінет покупця**: збережений список обраного (*Wishlist*) та історія замовлень зі статусами.

### 5. 🔐 Вбудована автономна адмін-панель (`/admin`)
Повноцінне керування магазином без необхідності підключення сторонніх CMS:
- **Захищена авторизація**: сесійні `httpOnly` cookies з криптографічним HMAC підписом (пароль за замовчуванням: `admin`).
- **Дашборд аналітики**: загальний виторг, кількість замовлень, статистика товарів та таблиця останніх покупок.
- **Керування товарами**: повний CRUD (створення, редагування, видалення), додавання варіантів об'ємів/кольорів з індивідуальними цінами та залишками на складі (Stock).
- **Керування категоріями**: дерево категорій та підкатегорій з підрахунком товарів.
- **Керування замовленнями**: перегляд контактів покупця, адреси доставки, складу замовлення та оновлення статусу (`NEW` → `PAID` → `SHIPPED` → `COMPLETED` → `CANCELLED`).
- **Модерація відгуків**: перевірка відгуків покупців зі зірочками, кнопка схвалення та видалення.
- **Слайдер і контакти**: редагування банерів на головній, зміна телефонів, графіка, соцмереж та порогу безкоштовної доставки.

---

## 📁 Структура проєкту

```text
ulinail-beauty-store/
├── prisma/
│   ├── schema.prisma        # Повна реляційна схема БД (Product, Variant, Category, Order, Review, Banner, Setting)
│   └── seed.ts              # Початковий seed скрипт каталогу та адміністратора
├── public/                  # Статичні ресурси
├── src/
│   ├── app/
│   │   ├── [locale]/        # Клієнтська частина інтернет-магазину
│   │   │   ├── page.tsx     # Головна сторінка (Hero, Categories, Bestsellers, Guide, Instagram)
│   │   │   ├── catalog/     # Каталог з бічним деревом фільтрів та сортуванням
│   │   │   ├── product/     # Детальна картка товару з вибором об'єму та табами
│   │   │   ├── checkout/    # Оформлення замовлення (Нова Пошта, InPost, оплата)
│   │   │   ├── account/     # Кабінет клієнта (замовлення та улюблене)
│   │   │   └── (info)/      # Сторінки (about, contacts, delivery, cooperation, blog, privacy...)
│   │   ├── admin/           # Автономна захищена адмін-панель
│   │   │   ├── login/       # Сторінка авторизації
│   │   │   └── (dashboard)/ # Дашборд, товари, категорії, замовлення, відгуки, банери
│   │   ├── api/             # REST API роути (products, orders, reviews, categories, auth...)
│   │   ├── globals.css      # Nude & Gold стилі, кастомний скролбар та шрифти
│   │   └── layout.tsx       # Кореневий HTML лейаут
│   ├── components/
│   │   ├── layout/          # Header, Footer, CookieBanner, MegaMenu
│   │   ├── home/            # HeroSlider, CategoryGrid, ProductCarousel, MasterGuide, Instagram
│   │   ├── catalog/         # ProductCard, SidebarFilters, VoiceSearchBar
│   │   ├── product/         # ProductGallery, ProductTabs, ProductDetailView
│   │   ├── cart/            # CartSlideOver, CheckoutView
│   │   └── admin/           # AdminSidebar
│   ├── context/             # CartContext, WishlistContext, LanguageContext
│   ├── lib/
│   │   ├── store.ts         # Автономний data-шар з локальним збереженням (zero-config)
│   │   ├── initialData.ts   # Початковий якісний асортимент бʼюті-товарів
│   │   ├── dictionary.ts    # Двомовні словники UA / PL
│   │   └── auth.ts          # Сесійна автентифікація адміністратора
│   └── types/               # TypeScript інтерфейси
├── tailwind.config.ts       # Налаштування палітри кольорів Nude, Gold, Blush, Charcoal
└── package.json
```

---

## 🚀 Швидкий старт

### 1. Клонування репозиторію
```bash
git clone git@github.com:master7dok/uli-nails-shop.git
cd uli-nails-shop
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Генерація типів Prisma
```bash
npx prisma generate
```

### 4. Запуск сервера розробки
```bash
npm run dev
```

Відкрийте браузер за адресою:
- **Клієнтський магазин (UA)**: [http://localhost:3000/ua](http://localhost:3000/ua)
- **Польська версія (PL)**: [http://localhost:3000/pl](http://localhost:3000/pl)
- **Каталог товарів**: [http://localhost:3000/ua/catalog](http://localhost:3000/ua/catalog)
- **Адмін-панель**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔐 Доступ до адмін-панелі

- **Адреса**: `/admin` або `/admin/login`
- **Email за замовчуванням**: `admin@ulinail.com`
- **Пароль за замовчуванням**: `admin` *(можна змінити у змінній середовища `ADMIN_PASSWORD`)*

---

## 🗄️ База даних (PostgreSQL + Prisma)

> 💡 **Проєкт працює відразу без налаштування PostgreSQL!** Вбудований локальний сервісний шар [src/lib/store.ts](src/lib/store.ts) автоматично зберігає всі зміни товарів, замовлень та налаштувань у `.data/store.json`.

Якщо ви бажаєте підключити зовнішній сервер PostgreSQL:
1. Вкажіть рядок підключення у файлі `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/ulinail_db?schema=public"
   ```
2. Запустіть міграцію та початкове наповнення товарами:
   ```bash
   npx prisma migrate dev --name init
   npx tsx prisma/seed.ts
   ```

---

## 🛠️ Скрипти проекту

| Команда | Опис |
| :--- | :--- |
| `npm run dev` | Запуск сервера розробки на `http://localhost:3000` |
| `npm run build` | Оптимізована компіляція Next.js та перевірка типів TypeScript |
| `npm run start` | Запуск продакшн-сервера |
| `npx prisma generate` | Оновлення клієнта Prisma ORM |
| `npx prisma studio` | Візуальний вебінтерфейс перегляду бази даних Prisma |

---

## 📄 Ліцензія

Цей проєкт поширюється під ліцензією [MIT](LICENSE).
Розроблено для преміальних студій краси та майстрів нігтьової естетики.