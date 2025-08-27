# Türkiye Fındık - Dijital Fındık Pazarı

Türkiye Fındık, üretici ve fabrikaları buluşturan dijital fındık pazarı platformudur. Güvenli, hızlı ve kolay fındık ticareti için tasarlanmış modern web uygulaması.

## 🚀 Özellikler

- **Üretici Paneli**: Çiftçiler kolayca fındık satış talebi oluşturabilir
- **Fabrika Paneli**: Fabrikalar talepleri görüp takip edebilir
- **Teslimat Sistemi**: Üreticiler için teslimat oluşturma ve yönetimi
- **QR Kodlu Teslimat**: Güvenli ve hızlı teslimat süreci
- **Fabrika Teslimat Paneli**: Fabrikalar için teslimat yönetim sistemi
- **QR Kod Tarama**: Kamera ile QR kod okuma özelliği
- **Randıman ve Ödeme**: Fabrikalar için randıman ve ödeme girişi
- **Otomatik Ödeme**: Teslimat onayı sonrası otomatik ödeme
- **Fiyat Takibi**: Canlı fındık fiyatları ve analitik
- **Dashboard**: Kullanıcı yönetim paneli ve fiyat yönetimi
- **Mobil Uygulama**: iOS ve Android desteği
- **Gerçek Zamanlı Bildirimler**: Anlık güncellemeler

## 🛠️ Teknolojiler

- **Frontend**: Astro + Tailwind CSS V4
- **Backend**: PocketBase (BaaS)
- **Stil**: Modern CSS ve Tailwind CSS
- **JavaScript**: Alpine.js
- **Deployment**: Vercel, Netlify uyumlu

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
pnpm install

# PocketBase'i başlatın (ayrı terminal)
# PocketBase executable'ını çalıştırın

# Geliştirme sunucusunu başlatın
pnpm run dev

# Tarayıcıda açın
# http://localhost:4321
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
│   │   ├── landing/       # Ana sayfa bileşenleri
│   │   └── dashboard/     # Dashboard bileşenleri
│   ├── layouts/           # Sayfa düzenleri
│   ├── lib/               # Yardımcı kütüphaneler
│   │   └── pocketbase.js  # PocketBase API helper
│   ├── pages/             # Sayfalar
│   │   ├── api/           # API endpoints
│   │   └── dashboard/     # Dashboard sayfaları
│   └── styles/            # Stil dosyaları
└── package.json
```

## 📄 Sayfalar

- **Ana Sayfa** (`/`) - Platform tanıtımı ve özellikler
- **Giriş** (`/login`) - Kullanıcı girişi
- **Kayıt** (`/signup`) - Yeni kullanıcı kaydı
- **Dashboard** (`/dashboard`) - Kullanıcı yönetim paneli
- **Fındık Fiyatları** (`/dashboard/prices`) - Canlı fiyat takibi
- **Teslimatlar** (`/dashboard/deliveries`) - Üretici teslimat yönetimi
- **Fabrika Teslimatları** (`/dashboard/factory-deliveries`) - Fabrika teslimat yönetimi
- **Teslimat Detayı** (`/delivery/[id]`) - QR kod ile erişilebilir teslimat detayı
- **SSS** (`/faq`) - Sık sorulan sorular
- **Gizlilik** (`/privacy`) - Gizlilik politikası
- **Şartlar** (`/terms`) - Kullanım şartları

## 🔐 Kullanıcı Rolleri

- **user**: Normal kullanıcı (üretici)
- **factory**: Fabrika kullanıcısı
- **company**: Şirket kullanıcısı
- **admin**: Yönetici (fiyat ekleme yetkisi)

## 🚀 Komutlar

| Komut                | Açıklama                                    |
| :------------------- | :------------------------------------------ |
| `pnpm install`       | Bağımlılıkları yükler                       |
| `pnpm run dev`       | Geliştirme sunucusunu başlatır (localhost:4321) |
| `pnpm run build`     | Üretim için derler (`./dist/`)              |
| `pnpm run preview`   | Derlenmiş siteyi önizler                    |
| `pnpm run astro ...` | Astro CLI komutlarını çalıştırır            |

## 📊 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Kullanıcı çıkışı
- `GET /api/auth/me` - Mevcut kullanıcı bilgileri

### Fiyat Yönetimi
- `GET /api/prices` - Tüm fiyatları getir
- `POST /api/prices/add` - Yeni fiyat ekle (admin only)

### Teslimat Yönetimi
- `GET /api/deliveries` - Kullanıcının teslimatlarını getir
- `POST /api/deliveries` - Yeni teslimat oluştur
- `GET /api/deliveries/[id]` - Teslimat detayını getir
- `PUT /api/deliveries/[id]` - Teslimat güncelle (fabrika/admin only)
- `GET /api/deliveries/factory` - Fabrikaya gelen teslimatları getir
- `GET /api/factories` - Kullanıcının şehrindeki fabrikaları getir

## 📋 Changelog

### [1.2.0] 
#### ✨ Yeni Özellikler
- **Teslimat Sistemi**: Üreticiler için teslimat oluşturma ve yönetimi
- **QR Kodlu Teslimat Fişleri**: Her teslimat için benzersiz QR kod
- **Fabrika Teslimat Paneli**: Fabrikalar için teslimat yönetim sistemi
- **QR Kod Tarama**: Kamera ile QR kod okuma özelliği
- **Teslimat Durumu Takibi**: Beklemede/Tamamlandı durum yönetimi
- **Randıman ve Ödeme Sistemi**: Fabrikalar için randıman ve ödeme girişi
- **Teslimat Filtreleme**: Durum bazlı teslimat filtreleme
- **Teslimat Arama**: ID ile manuel teslimat arama

#### 🔧 Teknik İyileştirmeler
- **QR Code Kütüphanesi**: `qrcode` ve `html5-qrcode` entegrasyonu
- **Teslimat API'leri**: CRUD operasyonları için API endpoints
- **Rol Tabanlı Erişim**: Teslimat sayfaları için yetki kontrolü
- **TypeScript Güvenliği**: Form işlemleri için tip güvenliği
- **Error Handling**: Teslimat işlemleri için gelişmiş hata yönetimi
- **Responsive Modal**: Teslimat detayları için responsive modal tasarımı

#### 🐛 Hata Düzeltmeleri
- Üretici bilgileri tutarlılık sorunu çözüldü
- API endpoint'lerinde import path düzeltmeleri
- Dashboard layout sorunları giderildi
- TypeScript tip hataları düzeltildi

### [1.1.0] 
#### ✨ Yeni Özellikler
- **Dashboard Sistemi**: Kullanıcı yönetim paneli eklendi
- **Fındık Fiyatları Sayfası**: Canlı fiyat takibi ve yönetimi
- **PocketBase Entegrasyonu**: Backend-as-a-Service entegrasyonu
- **Kullanıcı Kimlik Doğrulama**: Kayıt, giriş, çıkış sistemi
- **Rol Tabanlı Erişim**: Admin, user, factory, company rolleri
- **Fiyat Yönetimi**: Admin kullanıcılar için fiyat ekleme
- **Fiyat Geçmişi**: Son 10 fiyat güncellemesi timeline
- **Responsive Tasarım**: Mobil uyumlu dashboard

#### 🔧 Teknik İyileştirmeler
- **Astro SSR**: Server-side rendering aktif edildi
- **API Routes**: Astro API endpoints eklendi
- **TypeScript**: Tip güvenliği artırıldı
- **Tailwind CSS**: Modern UI tasarımı
- **Form Validasyonu**: Client-side ve server-side validasyon
- **Error Handling**: Gelişmiş hata yönetimi

#### 🐛 Hata Düzeltmeleri
- Kayıt formu SSR sorunu çözüldü
- Dashboard beyaz ekran sorunu düzeltildi
- API endpoint'lerinde prerender sorunu çözüldü

### [1.0.0] - 2024-12-18
#### 🎉 İlk Sürüm
- Landing page tasarımı
- Temel sayfa yapısı
- Tailwind CSS V4 entegrasyonu
- Responsive tasarım

## 🌐 Canlı Demo

- **Ana Site**: [https://trfturkiyefindik.com](https://trfturkiyefindik.com)

## 📱 Mobil Uygulama

- **iOS App Store**: [Türkiye Fındık iOS (Yakında)](https://apps.apple.com/app/turkiye-findik)
- **Google Play**: [Türkiye Fındık Android (Yakında)](https://play.google.com/store/apps/details?id=com.trfturkiyefindik)

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

---

**Türkiye Fındık** - Fındık ticaretinin dijital geleceği 🌰
