<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSepetStore } from '@/stores/sepetStore'

const sepetStore = useSepetStore()
const router = useRouter()
const aramaMetni = ref('')

// Arama Fonksiyonu
const aramaYap = () => {
  if (aramaMetni.value.trim()) {
    // Arama yapılmış gibi ürünler sayfasına yönlendiriyoruz
    router.push('/urunler')
    aramaMetni.value = ''
  }
}

// Henüz sayfası olmayan iç linkler için (Bildirimler vb.)
const yapimAsamasinda = (linkAdi: string) => {
  alert(`${linkAdi} paneli hazırlanıyor.`)
}
</script>

<template>
  <div class="header-wrapper">
    
    <!-- 1. EN ÜST ŞERİT -->
    <div class="top-bar">
      <div class="container top-flex">
        <div class="top-links">
          <!-- GÜNCELLEME: Linkler artık gerçek adreslere gidiyor (Yeni sekmede) -->
          <a href="https://www.do-re.com.tr/akademi" target="_blank">Akademi</a>
          <a href="https://www.instagram.com/doremusic" target="_blank">Sosyal</a>
          <a href="https://blog.do-re.com.tr/" target="_blank">Blog</a>
          <a href="https://www.do-re.com.tr/magazalarimiz" target="_blank">Mağazalar</a>
          <a href="https://www.do-re.com.tr/siparis-takibi" target="_blank">Sipariş Takibi</a>
          <a href="https://www.do-re.com.tr/iletisim" target="_blank">İletişim</a>
        </div>
        <div class="phone-contact">
          <i class="fa-solid fa-phone"></i>
          <span>0850 955 77 77</span>
        </div>
      </div>
    </div>

    <!-- 2. ORTA KISIM -->
    <div class="main-header">
      <div class="container header-flex">
        
        <div class="logo">
          <NuxtLink to="/">doremusic</NuxtLink>
        </div>

        <!-- Arama Çubuğu -->
        <div class="search-container">
          <input 
            type="text" 
            v-model="aramaMetni" 
            @keyup.enter="aramaYap"
            placeholder="Aramak istediğiniz ürünü yazın" 
          />
          <button class="search-btn" @click="aramaYap">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div class="user-actions">
          <NuxtLink to="/giris" class="account-area">
            <i class="fa-regular fa-user user-icon"></i>
            <div class="account-text">
              <span class="bold-text">Giriş Yap</span>
              <span class="light-text">veya <strong>Üye Ol</strong></span>
            </div>
          </NuxtLink>

          <div class="divider"></div>

          <!-- Bildirim Zili -->
          <div class="icon-item" @click="yapimAsamasinda('Bildirimler')">
            <i class="fa-regular fa-bell"></i>
            <span class="badge">2</span>
          </div>

          <NuxtLink to="/sepet" class="cart-area">
            <div class="icon-item">
              <i class="fa-solid fa-cart-shopping"></i>
              <span class="badge">{{ sepetStore.sepetAdedi }}</span>
            </div>
            <div class="cart-text">
              <span class="light-text">Alışveriş</span>
              <span class="bold-text">Sepetim</span>
            </div>
          </NuxtLink>
        </div>

      </div>
    </div>

    <!-- 3. ALT MENÜ -->
    <nav class="main-nav">
      <div class="container">
        <ul>
          <!-- Tüm kategorileri aktif Ürünler sayfasına yönlendirdik -->
          <li><NuxtLink to="/urunler">PİYANOLAR</NuxtLink></li>
          <li><NuxtLink to="/urunler">TUŞLULAR</NuxtLink></li>
          <li><NuxtLink to="/urunler">GİTARLAR</NuxtLink></li>
          <li><NuxtLink to="/urunler">AMFİ & PEDAL</NuxtLink></li>
          <li><NuxtLink to="/urunler">YAYLILAR</NuxtLink></li>
          <li><NuxtLink to="/urunler">NEFESLİLER</NuxtLink></li>
          <li><NuxtLink to="/urunler">DAVUL</NuxtLink></li>
          <li><NuxtLink to="/urunler">STÜDYO</NuxtLink></li>
          <!-- Outlet butonu ürünlere yönlensin -->
          <li class="outlet-btn"><NuxtLink to="/urunler" style="color:black">OUTLET</NuxtLink></li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<style scoped>
.header-wrapper { background: white; font-family: 'Segoe UI', sans-serif; }
.container { width: 95%; max-width: 1300px; margin: 0 auto; }
a { text-decoration: none; color: inherit; }
.top-bar { background-color: #fff; color: #666; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #eee; }
.top-flex { display: flex; justify-content: flex-end; align-items: center; gap: 20px; }
.top-links a { margin-left: 15px; transition: color 0.2s; cursor: pointer; }
.top-links a:hover { color: #d32f2f; }
.phone-contact { display: flex; align-items: center; gap: 5px; font-weight: bold; color: #333; }
.main-header { padding: 25px 0; }
.header-flex { display: flex; justify-content: space-between; align-items: center; }
.logo a { font-size: 38px; font-weight: 400; letter-spacing: -1px; color: #000; font-family: sans-serif; }
.search-container { display: flex; align-items: center; width: 45%; border: 1px solid #ddd; border-radius: 50px; padding: 5px 20px; margin: 0 30px; background: #fff; }
.search-container input { flex: 1; border: none; outline: none; font-size: 14px; padding: 10px 0; color: #555; }
.search-btn { background: none; border: none; font-size: 18px; color: #333; cursor: pointer; }
.user-actions { display: flex; align-items: center; gap: 20px; }
.account-area { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.user-icon { font-size: 28px; color: #333; }
.account-text { display: flex; flex-direction: column; line-height: 1.2; font-size: 13px; }
.divider { width: 1px; height: 30px; background-color: #ddd; }
.icon-item { position: relative; cursor: pointer; }
.icon-item i { font-size: 24px; color: #333; }
.badge { position: absolute; top: -8px; right: -8px; background-color: #f58220; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.cart-area { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.cart-text { display: flex; flex-direction: column; line-height: 1.2; font-size: 13px; }
.bold-text { font-weight: 700; color: #000; }
.light-text { font-weight: 400; color: #555; }
.main-nav { background-color: #000; color: #fff; }
.main-nav ul { display: flex; align-items: center; list-style: none; justify-content: space-between; }
.main-nav li { padding: 15px 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: color 0.3s; white-space: nowrap; }
.main-nav li a { color: white; }
.main-nav li:hover { color: #ccc; }
.outlet-btn { background-color: white; color: black !important; border-radius: 4px; padding: 5px 15px !important; margin-left: 10px; font-weight: 900 !important; cursor: pointer; }
.outlet-btn:hover { background-color: #eee; }
</style>