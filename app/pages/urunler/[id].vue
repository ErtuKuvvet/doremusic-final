<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSepetStore } from '@/stores/sepetStore'

const route = useRoute()
const sepetStore = useSepetStore()
const urun = ref(null)
const yukleniyor = ref(true)
const adet = ref(1)
const aktifResimIndex = ref(0) // Galeri için aktif resim sırası

// URL'den ID'yi alıp API'den o ürünü çekiyoruz
const urunGetir = async () => {
  try {
    const res = await fetch(`http://localhost:3005/api/products/${route.params.id}`)
    if(res.ok) {
      urun.value = await res.json()
      // Eğer ürünün images dizisi yoksa, ana resmi diziye koy ki galeri çalışsın
      if (!urun.value.images || urun.value.images.length === 0) {
        urun.value.images = [urun.value.image]
      }
    }
  } catch (error) {
    console.error("Ürün detayı hatası:", error)
  } finally {
    yukleniyor.value = false
  }
}

const sepeteEkle = () => {
  if (!urun.value) return;
  
  const eklenecekUrun = {
    id: urun.value.id,
    ad: urun.value.title,
    fiyat: urun.value.price,
    resim: urun.value.image,
    stok: urun.value.stock
  }
  
  // Seçilen adet kadar ekleme yap
  for(let i=0; i<adet.value; i++) {
    sepetStore.sepeteEkle(eklenecekUrun)
  }
}

// Galeri Fonksiyonları
const resimDegistir = (index) => { aktifResimIndex.value = index }

const sonrakiResim = () => {
  if (urun.value && urun.value.images) {
    if (aktifResimIndex.value === urun.value.images.length - 1) aktifResimIndex.value = 0
    else aktifResimIndex.value++
  }
}

const oncekiResim = () => {
  if (urun.value && urun.value.images) {
    if (aktifResimIndex.value === 0) aktifResimIndex.value = urun.value.images.length - 1
    else aktifResimIndex.value--
  }
}

onMounted(() => {
  urunGetir()
})
</script>

<template>
  <div class="detail-page container">
    <div v-if="yukleniyor" class="loading"><i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</div>
    
    <div v-else-if="urun" class="product-layout">
      
      <!-- SOL: Resim Galerisi (API'den Gelen Veri) -->
      <div class="gallery-section">
        <div class="main-image">
          <div class="promo-badge"><i class="fa-solid fa-star"></i> %3 Ek İndirim: DORE11</div>
          
          <!-- Veritabanındaki resim listesinden aktif olanı göster -->
          <img :src="urun.images[aktifResimIndex]" :alt="urun.title" />
          
          <button class="arrow left" @click="oncekiResim"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="arrow right" @click="sonrakiResim"><i class="fa-solid fa-chevron-right"></i></button>
        </div>

        <div class="thumbnails">
          <div 
            v-for="(img, index) in urun.images" 
            :key="index"
            class="thumb"
            :class="{ active: index === aktifResimIndex }"
            @mouseover="resimDegistir(index)"
            @click="resimDegistir(index)"
          >
            <img :src="img" alt="Thumb" />
          </div>
        </div>
      </div>

      <!-- SAĞ: Bilgiler -->
      <div class="info-section">
        <h1 class="title">{{ urun.title }}</h1>
        <p class="category">Kategori: {{ urun.category }}</p>
        
        <div class="price-box">
          <div v-if="urun.oldPrice && urun.oldPrice > urun.price" class="old-price">
            {{ Number(urun.oldPrice).toLocaleString('tr-TR') }} TL
          </div>
          <div class="current-price">
            {{ Number(urun.price).toLocaleString('tr-TR') }} TL
          </div>
        </div>

        <div class="stock-info" :class="{ 'no-stock': urun.stock <= 0 }">
          <i class="fa-solid fa-box"></i>
          {{ urun.stock > 0 ? `Stokta ${urun.stock} adet var` : 'Stok Tükendi' }}
        </div>

        <div class="actions">
          <div class="quantity">
            <button @click="adet > 1 ? adet-- : null">-</button>
            <input type="text" :value="adet" readonly />
            <button @click="adet < urun.stock ? adet++ : null">+</button>
          </div>
          <button 
            class="btn-add" 
            :disabled="urun.stock <= 0"
            @click="sepeteEkle"
          >
            {{ urun.stock > 0 ? 'SEPETE EKLE' : 'TÜKENDİ' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="not-found">Ürün bulunamadı.</div>
  </div>
</template>

<style scoped>
.container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; font-family: 'Segoe UI', sans-serif; }
.loading { text-align: center; font-size: 20px; padding: 50px; color: #666; }
.product-layout { display: flex; gap: 50px; background: white; padding: 30px; border-radius: 8px; border: 1px solid #eee; }

/* Galeri Stilleri */
.gallery-section { flex: 1; max-width: 500px; }
.main-image { width: 100%; height: 400px; border: 1px solid #eee; border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; margin-bottom: 15px; user-select: none; }
.main-image img { max-height: 90%; max-width: 90%; object-fit: contain; }
.promo-badge { position: absolute; top: 10px; left: 10px; background: white; border: 1px solid #ddd; padding: 5px 10px; border-radius: 20px; font-size: 12px; color: #666; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.promo-badge i { color: #f58220; }
.arrow { position: absolute; background: rgba(255, 255, 255, 0.9); border: 1px solid #ddd; font-size: 20px; color: #555; cursor: pointer; padding: 10px 15px; border-radius: 50%; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.arrow:hover { background: white; color: #000; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
.arrow.left { left: 10px; }
.arrow.right { right: 10px; }
.thumbnails { display: flex; gap: 10px; justify-content: center; }
.thumb { width: 70px; height: 70px; border: 1px solid #eee; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s; }
.thumb:hover, .thumb.active { border-color: #f58220; box-shadow: 0 0 5px rgba(245, 130, 32, 0.3); }
.thumb img { max-width: 100%; max-height: 100%; object-fit: contain; }

.info-section { flex: 1; }
.title { font-size: 28px; font-weight: 700; color: #333; margin-bottom: 10px; }
.category { color: #888; font-size: 14px; margin-bottom: 20px; }
.price-box { margin-bottom: 20px; }
.old-price { text-decoration: line-through; color: #999; font-size: 18px; }
.current-price { font-size: 32px; font-weight: 800; color: #f58220; }
.stock-info { margin-bottom: 30px; font-weight: bold; color: #28a745; display: flex; align-items: center; gap: 10px; }
.stock-info.no-stock { color: #dc3545; }
.actions { display: flex; gap: 20px; }
.quantity { display: flex; border: 1px solid #ddd; height: 50px; border-radius: 4px; }
.quantity button { width: 40px; border: none; background: #f9f9f9; font-size: 20px; cursor: pointer; }
.quantity input { width: 50px; border: none; text-align: center; font-weight: bold; font-size: 18px; border-left: 1px solid #eee; border-right: 1px solid #eee; }
.btn-add { flex: 1; background: #f58220; color: white; border: none; border-radius: 4px; font-size: 18px; font-weight: bold; cursor: pointer; transition: background 0.3s; }
.btn-add:hover { background: #d8690a; }
.btn-add:disabled { background: #ccc; cursor: not-allowed; }
</style>