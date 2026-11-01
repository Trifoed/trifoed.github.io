# HMT12856 — بسته استقرار نهایی (۳۱ اکتبر ۲۰۲۶)

## سایت اصلی (Canonical)
https://bipod.pages.dev/

همه آینه‌ها باید با ۳۰۱ به این آدرس بروند.

---

## فایل‌های این بسته

| فایل | کاربرد |
|------|--------|
| `index.html` | صفحه اصلی کامل (با Schema، رادار، دانشنامه، SEO) |
| `HMT12856-FINAL-COMPLETE.html` | نسخه پشتیبان همان صفحه اصلی |
| `_redirects` | ریدایرکت ۳۰۱ برای Netlify و Cloudflare Pages |
| `netlify.toml` | تنظیم ریدایرکت برای Netlify |
| `redirect-index.html` | صفحه ساده ریدایرکت (اگر فقط HTML می‌پذیری) |
| `robots.txt` | اجازه به گوگل + معرفی sitemap |
| `sitemap.xml` | نقشه سایت فقط برای bipod.pages.dev |

---

## قدم ۱ — Cloudflare Pages (سایت اصلی)

1. برو به https://dash.cloudflare.com → Pages → پروژه bipod
2. فایل‌های زیر را آپلود کن (جایگزین قبلی‌ها):
   - index.html
   - robots.txt
   - sitemap.xml
3. Deploy کن.
4. آدرس https://bipod.pages.dev را باز کن و مطمئن شو درست کار می‌کند.

---

## قدم ۲ — Netlify (آینه‌ها)

برای هر کدام از این سایت‌ها:
- hemmati.netlify.app
- pedram.netlify.app
- hmt12856.netlify.app
- trifoed.netlify.app (اگر داری)

**روش پیشنهادی:**
در ریشه پروژه این دو فایل را بگذار و Deploy کن:
- `_redirects`
- `netlify.toml`

**روش ساده (اگر نمی‌توانی فایل تنظیمات بگذاری):**
فقط `redirect-index.html` را به‌جای `index.html` آپلود کن.

بعد از Deploy، آدرس آینه را باز کن → باید فوری به bipod.pages.dev برود.

---

## قدم ۳ — GitHub Pages (trifoed.github.io/Hemmati)

در ترموکس یا کامپیوتر:

```bash
# اگر قبلاً کلون نکردی:
git clone https://github.com/Trifoed/Hemmati.git
cd Hemmati

# فایل‌های ریدایرکت را کپی کن (مسیر دانلود را خودت جایگزین کن)
cp /sdcard/Download/hmt-deploy/_redirects .
cp /sdcard/Download/hmt-deploy/redirect-index.html index.html
# یا فقط redirect-index.html را به عنوان index.html بگذار

git add -A
git -c user.email="Hemmat12856@gmail.com" -c user.name="Trifoed" commit -m "HMT12856: 301 redirect to bipod.pages.dev"
git push origin main
```

اگر پسورد خواست → Personal Access Token بگذار (نه رمز گیت‌هاب).

---

## قدم ۴ — Google Search Console (خیلی مهم)

1. برو به: https://search.google.com/search-console
2. Add property → URL prefix → بنویس: `https://bipod.pages.dev`
3. تأیید مالکیت (HTML tag یا DNS یا فایل HTML)
4. بعد از تأیید:
   - سمت چپ → Sitemaps
   - آدرس را بنویس: `sitemap.xml`
   - Submit کن
5. URL Inspection → آدرس `https://bipod.pages.dev/` را بگذار → Request indexing

**نکته:** فقط bipod را اصلی کن. آینه‌ها را بعداً می‌توانی Change of Address کنی یا حذف کنی.

---

## قدم ۵ — لینک‌های خارجی

در همه کانال‌ها (تلگرام، لینکدین، اینستاگرام، ایکس، فارس‌نیوز، ایتا، بله، روبیکا)
فقط این لینک را بگذار:

**https://bipod.pages.dev/**

---

## تست نهایی

بعد از همه کارها این دستورات را در ترموکس بزن:

```bash
curl -I https://bipod.pages.dev
curl -I https://hemmati.netlify.app
curl -I https://pedram.netlify.app
curl -I https://hmt12856.netlify.app
```

کد وضعیت آینه‌ها باید **301** باشد و Location به bipod.pages.dev اشاره کند.

---

## پشتیبانی
اگر در هر قدم گیر کردی، آدرس پوشه‌ای که فایل‌ها را دانلود کردی بفرست تا قدم‌به‌قدم با هم پیش برویم.
