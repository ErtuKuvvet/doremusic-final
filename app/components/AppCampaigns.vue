<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const git = (adres: string) => {
  router.push(adres)
}
</script>

<template>
  <div class="campaigns-container">
    
    <!-- Banner Tıklanabilir Oldu -->
    <div class="campaign-banner" @click="git('/urunler')">
      <div class="banner-text">
        <span class="sub-title">EFSANE KASIMDA EN İYİ</span>
        <h2 class="main-title">DİJİTAL PİYANOLAR</h2>
        <div class="line"></div>
      </div>
    </div>

    <!-- Hızlı Linkler Tıklanabilir -->
    <div class="quick-links">
      <div class="link-card" @click="git('/urunler')">
        <span>Yeni Eklenen Ürünler</span>
        <div class="icon-box"><i class="fa-solid fa-star"></i></div>
      </div>

      <div class="link-card" @click="git('/urunler')">
        <span>İndirimli Ürünler</span>
        <div class="icon-box"><i class="fa-solid fa-bag-shopping"></i></div>
      </div>

      <div class="link-card" @click="git('/urunler')">
        <span>Outlet Ürünler</span>
        <div class="icon-box"><i class="fa-solid fa-tags"></i></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Stiller aynı kalıyor */
.campaigns-container { max-width: 1200px; margin: 0 auto; padding: 30px 20px; font-family: 'Segoe UI', sans-serif; }
.campaign-banner { display: flex; align-items: center; height: 200px; background-image: url('https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200&auto=format&fit=crop'); background-size: cover; background-position: center; border-radius: 4px; overflow: hidden; position: relative; margin-bottom: 30px; cursor: pointer; }
.campaign-banner::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, #310b4b 35%, rgba(49, 11, 75, 0.8) 55%, rgba(0,0,0,0) 100%); z-index: 1; }
.banner-text { position: relative; z-index: 2; padding-left: 50px; color: white; text-transform: uppercase; }
.sub-title { display: block; font-size: 1.1rem; letter-spacing: 1px; margin-bottom: 5px; font-weight: 600; opacity: 0.9; }
.main-title { font-size: 2.8rem; font-weight: 900; line-height: 1; text-shadow: 0 0 15px rgba(255, 255, 255, 0.6); font-family: sans-serif; }
.line { width: 100%; height: 2px; background: rgba(255,255,255,0.3); margin-top: 10px; }
.quick-links { display: flex; justify-content: space-between; gap: 20px; }
.link-card { flex: 1; background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.02); background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #fafafa 10px, #fafafa 20px); }
.link-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); border-color: #5cb85c; }
.link-card span { font-size: 1.1rem; color: #333; font-weight: 600; }
.icon-box { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5cb85c; position: relative; }
.icon-box::before { content: ''; position: absolute; width: 100%; height: 100%; background: radial-gradient(circle, rgba(92,184,92,0.2) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; transform: scale(1.5); }
.icon-box i { position: relative; z-index: 2; text-shadow: 2px 2px 0px white; }
</style>