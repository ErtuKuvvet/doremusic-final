<script setup>
import { onMounted } from 'vue'
import { useUrunStore } from '@/stores/urunStore'

// Ürün mağazasını (store) çağırıyoruz
const urunStore = useUrunStore()

// Sayfa yüklendiğinde ürünleri API'den çek
onMounted(() => {
  urunStore.urunleriGetir()
})
</script>

<template>
  <div class="page-content">
    <h2 class="section-title">Tüm Ürünler</h2>
    
    <!-- Yükleniyor Göstergesi -->
    <div v-if="urunStore.yukleniyor" class="loading">
      <i class="fa-solid fa-spinner fa-spin"></i> Ürünler Yükleniyor...
    </div>
    
    <!-- Ürün Listesi (Grid Yapısı) -->
    <div v-else class="grid">
      <!-- 
        Ürün Kartı Bileşeni 
        - :key -> Döngü performansı için benzersiz anahtar
        - :id -> Detay sayfasına gitmek için ürün ID'si
        - :urunResmi, :urunAdi, :fiyat, :eskiFiyat -> Görüntülenecek veriler
      -->
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
</template>

<style scoped>
/* Sayfa Genel Düzeni */
.page-content { 
  padding: 40px 20px; 
  max-width: 1200px; 
  margin: 0 auto; 
}

/* Başlık Stili */
.section-title { 
  text-align: center; 
  margin-bottom: 40px; 
  color: #333; 
  font-size: 1.8rem;
  font-weight: 600;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
  display: inline-block;
  /* Başlığı ortalamak için h2 blok element olduğu için parent'a text-align center verdik, 
     burada display inline-block ile alt çizginin yazı kadar olmasını sağlıyoruz */
}

/* Yükleniyor Alanı */
.loading { 
  text-align: center; 
  padding: 50px; 
  font-size: 1.2rem; 
  color: #666; 
}

/* Izgara (Grid) Yapısı */
.grid { 
  display: flex; 
  flex-wrap: wrap; /* Sığmayanları aşağı at */
  gap: 30px; /* Kartlar arası boşluk */
  justify-content: center; /* Ortala */
}
</style>