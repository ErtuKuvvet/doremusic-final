<script setup>
import { onMounted } from 'vue'
import { useUrunStore } from '@/stores/urunStore'

const urunStore = useUrunStore()

onMounted(() => {
  urunStore.urunleriGetir()
})
</script>

<template>
  <div>
    <!-- Slider ve Kampanyalar Sadece Ana Sayfada Var -->
    <AppSlider />
    <AppCampaigns />
    
    <div class="products-carousel-section">
      <h2 class="section-title">Sizin İçin Seçtiklerimiz</h2>
      
      <div v-if="urunStore.yukleniyor" style="text-align:center; padding:20px;">
        <i class="fa-solid fa-spinner fa-spin"></i> Ürünler Yükleniyor...
      </div>

      <div v-else class="carousel-wrapper">
        <div class="carousel-window">
          <div class="carousel-track">
            
            <ProductCard 
              v-for="urun in urunStore.urunler" 
              :key="urun.id" 
              :id="urun.id"
              :urunResmi="urun.resim" 
              :urunAdi="urun.ad" 
              :fiyat="urun.fiyat" 
              :eskiFiyat="urun.eskiFiyat"
            />

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.products-carousel-section { padding: 40px 20px; background-color: white; }
.section-title { text-align: center; font-size: 1.5rem; color: #333; margin-bottom: 30px; }
.carousel-wrapper { max-width: 1100px; margin: 0 auto; overflow: hidden; }
.carousel-track { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;}
</style>