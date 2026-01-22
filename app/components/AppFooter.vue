<script setup lang="ts">
// TypeScript desteği için script setup lang="ts"
</script>

<template>
  <footer class="footer-wrapper">
    
    <div class="footer-content container">
      
      <!-- Sütun 1: Kategoriler (Site İçi Ürünlere Gider) -->
      <div class="footer-col">
        <h3>Kategoriler</h3>
        <ul>
          <li><NuxtLink to="/urunler">Piyanolar</NuxtLink></li>
          <li><NuxtLink to="/urunler">Tuşlular</NuxtLink></li>
          <li><NuxtLink to="/urunler">Gitarlar</NuxtLink></li>
          <li><NuxtLink to="/urunler">Amfi & Pedal</NuxtLink></li>
          <li><NuxtLink to="/urunler">Yaylılar</NuxtLink></li>
          <li><NuxtLink to="/urunler">Nefesliler</NuxtLink></li>
          <li><NuxtLink to="/urunler">Davul & Perküsyon</NuxtLink></li>
          <li><NuxtLink to="/urunler">Stüdyo & DJ</NuxtLink></li>
        </ul>
      </div>

      <!-- Sütun 2: Önemli Bilgiler (GERÇEK LİNKLER - Yeni Sekme) -->
      <div class="footer-col">
        <h3>Önemli Bilgiler</h3>
        <ul>
          <li><a href="https://www.do-re.com.tr/hakkimizda" target="_blank">Hakkımızda</a></li>
          <li><a href="https://www.do-re.com.tr/insan-kaynaklari" target="_blank">İnsan Kaynakları</a></li>
          <li><a href="https://www.do-re.com.tr/garanti-ve-iade-kosullari" target="_blank">Garanti ve İade Koşulları</a></li>
          <li><a href="https://www.do-re.com.tr/kisisel-verilerin-korunmasi" target="_blank">Kişisel Verilerin Korunması</a></li>
          <li><a href="https://www.do-re.com.tr/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a></li>
          <li><a href="https://www.do-re.com.tr/cerez-politikasi" target="_blank">Çerez Politikası</a></li>
          <li><a href="https://www.do-re.com.tr/aydinlatma-metni" target="_blank">Aydınlatma Metni</a></li>
          <li><a href="https://www.do-re.com.tr/iletisim" target="_blank">İletişim</a></li>
        </ul>
      </div>

      <!-- Sütun 3: Bizi Takip Edin -->
      <div class="footer-col right-col">
        <h3>Bizi Takip Edin</h3>
        <div class="social-icons">
          <!-- Dış linkler yeni sekmede açılır -->
          <a href="https://facebook.com/doremusic" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://twitter.com/doremusic" target="_blank"><i class="fa-brands fa-twitter"></i></a>
          <a href="https://youtube.com/doremusic" target="_blank"><i class="fa-brands fa-youtube"></i></a>
          <a href="https://instagram.com/doremusic" target="_blank"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://linkedin.com/company/doremusic" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>

        <div class="payment-grid">
          <i class="fa-brands fa-cc-visa payment-icon"></i>
          <i class="fa-brands fa-cc-mastercard payment-icon"></i>
          <span class="bank-logo">BKM Express</span>
          <span class="bank-logo">Axess</span>
          <span class="bank-logo">World</span>
          <span class="bank-logo">Bonus</span>
        </div>

        <div class="app-buttons">
          <a href="https://apps.apple.com/tr/app/doremusic/id1450505050" target="_blank" class="store-btn">
            <i class="fa-brands fa-apple"></i>
            <div class="btn-text">
              <span class="small">App Store'dan</span>
              <span class="big">İndirin</span>
            </div>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.ticimax.doremusic" target="_blank" class="store-btn">
            <i class="fa-brands fa-google-play"></i>
            <div class="btn-text">
              <span class="small">Google Play</span>
              <span class="big">DEN ALIN</span>
            </div>
          </a>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <div class="container bottom-flex">
        <p>copyright © doremusic | Türkiye'nin En Büyük Müzik Aletleri Mağazalar Zinciri</p>
        <p>Tasarım: <strong>invenera</strong></p>
      </div>
    </div>

  </footer>
</template>

<style scoped>
.footer-wrapper { background-color: #000; color: #fff; font-family: 'Segoe UI', sans-serif; padding-top: 60px; font-size: 14px; margin-top: auto; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.footer-content { display: flex; justify-content: space-between; padding-bottom: 50px; flex-wrap: wrap; }
.footer-col { flex: 1; min-width: 200px; margin-bottom: 20px; }
.right-col { flex: 1.2; padding-left: 40px; }
.footer-col h3 { font-size: 18px; margin-bottom: 25px; font-weight: 600; color: #fff; }
.footer-col ul { list-style: none; padding: 0; }
.footer-col li { margin-bottom: 12px; }
.footer-col a { text-decoration: none; color: #ccc; transition: color 0.2s; display: inline-block; }
.footer-col a:hover { color: #fff; transform: translateX(5px); } /* Hover'da hafif sağa kayma efekti */
.social-icons { display: flex; gap: 15px; margin-bottom: 30px; }
.social-icons a { background: #fff; color: #000; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: background 0.3s, color 0.3s; }
.social-icons a:hover { background: #d32f2f; color: #fff; }
.payment-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; align-items: center; }
.payment-icon { font-size: 32px; color: #fff; }
.bank-logo { font-size: 12px; font-weight: 800; color: #fff; text-transform: uppercase; opacity: 0.8; }
.app-buttons { display: flex; gap: 15px; }
.store-btn { display: flex; align-items: center; background: transparent; border: 1px solid #666; border-radius: 5px; padding: 8px 15px; color: #fff; cursor: pointer; transition: border-color 0.3s; text-decoration: none; }
.store-btn:hover { border-color: #fff; }
.store-btn i { font-size: 24px; margin-right: 10px; }
.btn-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2; }
.btn-text .small { font-size: 10px; opacity: 0.8; }
.btn-text .big { font-size: 14px; font-weight: bold; }
.footer-bottom { background-color: #111; padding: 20px 0; font-size: 12px; color: #666; border-top: 1px solid #222; }
.bottom-flex { display: flex; justify-content: space-between; align-items: center; }
</style>