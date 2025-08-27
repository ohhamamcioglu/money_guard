# Money Guard - Kişisel Finans Yönetim Uygulaması

Bu proje, kişisel gelir ve giderlerinizi takip etmenizi sağlayan modern bir web uygulamasıdır.

## 🚀 Özellikler

### ✅ Tamamlanan Bileşenler

- **Balance**: Mevcut bakiyeyi görüntüler
- **TransactionsList**: İşlemlerin listesini görüntüler (kaydırılabilir)
- **TransactionsItem**: Her işlemin detaylarını gösterir (düzenle/sil butonları ile)
- **ButtonAddTransactions**: Yeni işlem ekleme butonu (ekranın sağ alt köşesinde sabit)
- **ModalAddTransaction**: Yeni işlem ekleme modal penceresi
- **AddTransactionForm**: Yeni işlem ekleme formu (react-hook-form + yup validasyonu)
- **ModalEditTransaction**: İşlem düzenleme modal penceresi
- **EditTransactionForm**: İşlem düzenleme formu (react-hook-form + yup validasyonu)

### 🔧 Teknik Özellikler

- **React 19** ile modern component yapısı
- **Redux Toolkit** ile state yönetimi
- **React Hook Form + Yup** ile form validasyonu
- **React DatePicker** ile tarih seçimi
- **Styled Components** ile modern CSS-in-JS yaklaşımı
- **React Toastify** ile bildirimler
- **Axios** ile API istekleri
- **Lucide React** ile ikonlar
- **Responsive Design** (mobil, tablet, desktop)

### 📱 Responsive Tasarım

- **Mobil**: İşlemler kart görünümünde, renk kodlu (gelir: turuncu, gider: mercan)
- **Tablet**: Optimize edilmiş layout
- **Desktop**: İki sütunlu düzen (bakiye sol, işlemler sağ)

### 🛡️ Form Validasyonu

- Tüm alanlar zorunlu
- Tutar pozitif olmalı
- Tarih gelecekte olamaz
- Gider işlemleri için kategori zorunlu
- Yorum 255 karakter sınırı

## 🏗️ Redux State Yönetimi

### Async Thunks

1. `fetchTransactions` - Yetkili kullanıcının tüm işlemlerini getirir
2. `fetchTransactionsByCategory` - Kategoriye göre işlemleri filtreler
3. `addTransaction` - Yeni işlem ekler
4. `editTransaction` - Mevcut işlemi düzenler
5. `deleteTransaction` - İşlemi siler
6. `fetchCategories` - Kategorileri getirir

### State Güncellemeleri

- İşlem eklendiğinde bakiye otomatik güncellenir
- İşlem düzenlendiğinde bakiye yeniden hesaplanır
- İşlem silindiğinde bakiye düzeltilir
- Tüm güncellemeler sayfa yenilenmeden gerçekleşir

## 🌐 API Entegrasyonu

Backend URL: `https://wallet.b.goit.study`

### Endpoints

- `GET /api/transactions` - Tüm işlemleri getir
- `GET /api/transactions?category={id}` - Kategoriye göre filtrele
- `POST /api/transactions` - Yeni işlem ekle
- `PATCH /api/transactions/{id}` - İşlem güncelle
- `DELETE /api/transactions/{id}` - İşlem sil
- `GET /api/transaction-categories` - Kategorileri getir

## 📦 Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Development sunucusunu başlatın
npm run dev

# Production build oluşturun
npm run build
```

## 🎨 Kullanılan Teknolojiler

- **React 19** - UI Library
- **Vite** - Build Tool
- **Redux Toolkit** - State Management
- **React Hook Form** - Form Management
- **Yup** - Schema Validation
- **Styled Components** - CSS-in-JS
- **React DatePicker** - Date Selection
- **React Toastify** - Notifications
- **Axios** - HTTP Client
- **Lucide React** - Icons+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
