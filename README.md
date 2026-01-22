🎸 Dore Music E-Ticaret Uygulaması (Full Stack)

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, Nuxt 3 tabanlı, performans odaklı ve ölçeklenebilir bir e-ticaret platformudur.

Proje, sadece bir arayüz tasarımından ibaret olmayıp, arka tarafta Node.js & Express ile yazılmış özel bir RESTful API ile haberleşen, CRUD (Veri Ekleme, Okuma, Güncelleme, Silme) işlemlerinin tamamını gerçekleştirebilen Full Stack bir mimariye sahiptir.

🚀 Proje Hakkında

Bu uygulamanın temel amacı, modern bir e-ticaret sitesinin gereksinim duyduğu; dinamik ürün yönetimi, sepet mantığı, kullanıcı yetkilendirme (Auth) ve stok takibi gibi karmaşık süreçleri TypeScript güvenliği ve Pinia durum yönetimi ile profesyonel bir yapıda sunmaktır.

Kullanıcılar ürünleri inceleyebilir, sepete ekleyebilir, stok durumunu canlı takip edebilir ve sipariş oluşturabilirken; yöneticiler (Admin) panel üzerinden ürünlerin fiyat ve stok bilgilerini anlık olarak güncelleyebilir.

🛠️ Kullanılan Teknolojiler ve Mimari

Proje, Frontend ve Backend olmak üzere iki ana katmandan oluşur.

⚡ Frontend (İstemci Tarafı)

Framework: Nuxt 3 (Vue 3 tabanlı SSR & CSR desteği)

Dil: TypeScript (Tip güvenliği ve hatasız kodlama için)

State Management: Pinia (4 modüler Store ile merkezi veri yönetimi)

Routing: Nuxt File System Routing

UI/Styling: Özel CSS ve Responsive Tasarım

Icons: FontAwesome

🔌 Backend (Sunucu Tarafı)

Runtime: Node.js

Framework: Express.js

Veritabanı: JSON tabanlı yerel veritabanı simülasyonu (Low-DB mantığı)

API Mimarisi: RESTful API (GET, POST, PUT, DELETE uç noktaları)

⭐ Temel Özellikler

1. Gelişmiş Sepet ve Stok Yönetimi

Ürünler sepete eklendiğinde API üzerinden anlık stok kontrolü yapılır.

Stoktan düşme ve iade işlemleri backend tarafında yönetilir.

Sepet durumu sayfa yenilense dahi korunur (Persistency).

2. Yönetim Paneli (Admin Dashboard)

/admin rotası üzerinden erişilebilen özel panel.

Ürünlerin fiyatlarını, eski fiyatlarını (indirim simülasyonu için) ve stok miktarlarını güncelleme imkanı.

Yeni ürün ekleme özelliği.

3. Kullanıcı Yetkilendirme (Authentication)

Kullanıcı Kayıt (Register) ve Giriş (Login) işlemleri.

Giriş yapan kullanıcıya özel oturum yönetimi.

4. Dinamik ve Reaktif Arayüz

Ürün Detay: Her ürün için dinamik oluşturulan (/urunler/:id) detay sayfaları.

Galeri: Ürünlere ait çoklu görsel desteği ve interaktif galeri.

Arama: Header üzerinden ürün arama simülasyonu.

📂 Proje Klasör Yapısı

Kodun okunabilirliği ve sürdürülebilirliği için modüler bir yapı tercih edilmiştir:

dore-final/
├── app/
│   ├── components/    # Yeniden kullanılabilir UI bileşenleri (Header, Kartlar vb.)
│   ├── layouts/       # Sayfa düzenleri (Default ve Auth layoutları)
│   ├── pages/         # Sayfa rotaları ve görünümler
│   ├── stores/        # Pinia durum yönetim dosyaları (İş Mantığı buradadır)
│   └── types/         # TypeScript interface tanımları (Veri modelleri)
├── server/
│   ├── db.json        # Veritabanı dosyası
│   └── index.js       # Express API ve Backend mantığı
└── nuxt.config.ts     # Proje konfigürasyonu


📦 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

Ön Hazırlık

Node.js'in bilgisayarınızda yüklü olduğundan emin olun.

1. Projeyi Klonlayın ve Paketleri Yükleyin

git clone https://github.com/ErtuKuvvet/doremusic-final
cd dore-final
npm install


2. Backend Sunucusunu Başlatın

Veritabanı işlemlerinin çalışması için önce API sunucusunu ayağa kaldırmanız gerekir. Bu komut localhost:3005 portunda sunucuyu başlatır:

npm run api


3. Uygulamayı Başlatın

Yeni bir terminal sekmesi açın ve frontend uygulamasını başlatın:

npm run dev


Uygulama http://localhost:3000 adresinde yayına girecektir.

👨‍💻 Geliştirici Notu

Bu proje, Full Stack geliştirme yeteneklerimi sergilemek, Nuxt 3 ekosistemine hakimiyetimi göstermek ve gerçek hayat senaryolarına (stok takibi, sepet mantığı) uygun çözümler üretmek amacıyla geliştirilmiştir.

İletişim: ertugkuvvet@gmail.com