# Türkiye Fındık - Dijital Fındık Pazarı

Türkiye Fındık, üretici ve fabrikaları buluşturan dijital fındık pazarı platformudur. Güvenli, hızlı ve kolay fındık ticareti için tasarlanmış modern web uygulaması.

## 🚀 Özellikler

- **Üretici Paneli**: Çiftçiler kolayca fındık satış talebi oluşturabilir
- **Fabrika Paneli**: Fabrikalar talepleri görüp takip edebilir
- **QR Kodlu Teslimat**: Güvenli ve hızlı teslimat süreci
- **Otomatik Ödeme**: Teslimat onayı sonrası otomatik ödeme
- **Fiyat Takibi**: Canlı fındık fiyatları ve analitik
- **Mobil Uygulama**: iOS ve Android desteği
- **Gerçek Zamanlı Bildirimler**: Anlık güncellemeler

## 🛠️ Teknolojiler

- **Frontend**: Astro + Tailwind CSS V4
- **Stil**: Modern CSS ve Tailwind CSS
- **JavaScript**: Alpine.js
- **Deployment**: Vercel, Netlify uyumlu

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcıda açın
# http://localhost:3000
```

## 🏗️ Proje Yapısı

```
/
├── public/                 # Statik dosyalar
│   ├── logo.svg           # Logo
│   └── og-image.png       # Sosyal medya görseli
├── src/
│   ├── components/        # Bileşenler
│   │   ├── Forms/         # Form bileşenleri
│   │   ├── global/        # Global bileşenler
│   │   ├── infopages/     # Bilgi sayfaları
│   │   └── landing/       # Ana sayfa bileşenleri
│   ├── layouts/           # Sayfa düzenleri
│   ├── pages/             # Sayfalar
│   └── styles/            # Stil dosyaları
└── package.json
```

## 📄 Sayfalar

- **Ana Sayfa** (`/`) - Platform tanıtımı ve özellikler
- **Giriş** (`/login`) - Kullanıcı girişi
- **Kayıt** (`/signup`) - Yeni kullanıcı kaydı
- **SSS** (`/faq`) - Sık sorulan sorular
- **Gizlilik** (`/privacy`) - Gizlilik politikası
- **Şartlar** (`/terms`) - Kullanım şartları

## 🎨 Tailwind CSS V4 Kullanımı

Bu proje Tailwind CSS V4 Alpha sürümünü kullanmaktadır. Stil dosyası `src/styles/global.css` içinde:

```css
// Tailwind CSS import
@import "tailwindcss";
// Tailwind eklentileri
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";

@theme {
  /* Özel stiller buraya */
}
```

## 🚀 Komutlar

| Komut                | Açıklama                                    |
| :------------------- | :------------------------------------------ |
| `npm install`        | Bağımlılıkları yükler                       |
| `npm run dev`        | Geliştirme sunucusunu başlatır (localhost:3000) |
| `npm run build`      | Üretim için derler (`./dist/`)              |
| `npm run preview`    | Derlenmiş siteyi önizler                    |
| `npm run astro ...`  | Astro CLI komutlarını çalıştırır            |

## 🌐 Canlı Demo

- **Ana Site**: [https://trfturkiyefindik.com](https://trfturkiyefindik.com)
- **Demo**: [https://demo.trfturkiyefindik.com](https://demo.trfturkiyefindik.com)

## 📱 Mobil Uygulama

- **iOS App Store**: [Türkiye Fındık iOS](https://apps.apple.com/app/turkiye-findik)
- **Google Play**: [Türkiye Fındık Android](https://play.google.com/store/apps/details?id=com.trfturkiyefindik)

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje [GPL-3.0 lisansı](https://opensource.org/licenses/GPL-3.0) altında lisanslanmıştır.

## 👥 Geliştirici

**Türkiye Fındık** - Dijital fındık ticareti platformu

- **Website**: [https://trfturkiyefindik.com](https://trfturkiyefindik.com)
- **E-posta**: info@trfturkiyefindik.com
- **Telefon**: +90 xxx xxx xx xx

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/trfturkiyefindik/trfturkiyefindik.com)

---

**Türkiye Fındık** - Fındık ticaretinin dijital geleceği 🌰
