# قاموس هولندي - عربي 📚

موقع قاموس تفاعلي للترجمة بين الهولندية والعربية مع إمكانية النطق والامتحانات.

## المميزات ✨

- ✅ إضافة كلمات هولندية مع معانيها بالعربية
- ✅ البحث عن الكلمات بالهولندية
- ✅ إضافة معنى إضافي للكلمة
- ✅ الاستماع لنطق الكلمات والجمل بالهولندية
- ✅ إضافة جمل مع ترجمتها
- ✅ إنشاء امتحانات تفاعلية
- ✅ واجهة عربية جميلة وسهلة الاستخدام
- ✅ تصميم عصري ومتجاوب

## التثبيت المحلي 🛠️

1. استنساخ المشروع:
```bash
git clone https://github.com/Ramiabdelal-hue/Woordenboek.git
cd Woordenboek
```

2. تثبيت المكتبات:
```bash
npm install
```

3. إعداد قاعدة البيانات:
```bash
# انسخ ملف البيئة
cp .env.example .env

# عدّل DATABASE_URL في ملف .env بقاعدة بيانات Neon الخاصة بك

# تشغيل Prisma
npx prisma generate
npx prisma migrate dev
```

4. تشغيل المشروع:
```bash
npm run dev
```

5. افتح المتصفح على: http://localhost:3000

## النشر على Vercel 🚀

1. اذهب إلى [Vercel](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط "Add New Project"
4. اختر مستودع "Woordenboek"
5. أضف متغير البيئة:
   - `DATABASE_URL` = رابط قاعدة بيانات Neon
6. اضغط "Deploy"

## البنية 📁

- `/` - الصفحة الرئيسية
- `/words` - عرض قائمة الكلمات مع البحث
- `/words/add` - إضافة كلمة جديدة
- `/sentences` - عرض وإضافة الجمل
- `/quiz` - إنشاء وحل الامتحانات

## قاعدة البيانات (Prisma) 🗄️

النماذج:
- `Word` - الكلمات (هولندي، عربي، معنى إضافي)
- `Sentence` - الجمل المرتبطة بالكلمات
- `Quiz` - الامتحانات
- `QuizQuestion` - أسئلة الامتحانات

## التقنيات المستخدمة 💻

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Web Speech API (للنطق)
- CSS3 (تصميم مخصص)

## المتطلبات 📋

- Node.js 18+
- قاعدة بيانات PostgreSQL (يُنصح باستخدام [Neon](https://neon.tech))

## الترخيص 📄

MIT License
