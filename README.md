# Mazad Online — Complete Fix v6

هذه النسخة تتضمن إصلاحًا كاملًا لمرحلة اختيار فيلم/مشهور المواجهة النهائية.

## أهم إصلاح
تمت إضافة مسار HTTP آمن لاختيار الفيلم (`/api/game/select-film`) بدل الاعتماد على Socket.IO acknowledgement في متصفح الهاتف. ما زال Socket.IO يعمل كمسار احتياطي، لكن الاختيار الأساسي يتم عبر طلب HTTP مع جلسة الحساب.

## الملفات التي يجب رفعها
- `public/` كاملًا
- `server.js`
- `package.json`
- `render.yaml`
- `supabase-schema.sql` كما هو
- `.env.example`

`index.html` في الجذر نسخة مطابقة لـ `public/index.html` لتجنب وجود نسخة قديمة عند رفع المشروع.

## Render
لا تغيّر:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- إعدادات Supabase الحالية

بعد الرفع انتظر Deploy حتى يظهر Live، ثم افتح الموقع بتحميل كامل للصفحة.
