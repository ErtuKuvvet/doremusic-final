<script setup>
import { useSepetStore } from '@/stores/sepetStore'

// Dışarıdan gelen veriler
const props = defineProps({
  id: [String, Number],
  urunResmi: String, 
  urunAdi: String,   
  fiyat: [String, Number],     
  eskiFiyat: [String, Number]
})

const sepetStore = useSepetStore()

// Fiyatı düzgün formatlayan fonksiyon (Örn: 5500 -> 5.500,00)
const formatFiyat = (deger) => {
  if (!deger) return '0,00';
  // Eğer string gelirse (örn: "5.500 TL") temizle, sayı gelirse direkt kullan
  const sayi = typeof deger === 'string' 
    ? parseFloat(deger.toString().replace(' TL', '').replace(/\./g, '').replace(',', '.')) 
    : parseFloat(deger);
    
  return isNaN(sayi) ? '0,00' : sayi.toLocaleString('tr-TR', { minimumFractionDigits: 2 });
}

const sepeteEkle = (e) => {
  const yeniUrun = {
    id: props.id, 
    ad: props.urunAdi,
    fiyat: props.fiyat,
    resim: props.urunResmi,
    kategori: 'Genel',
    stok: 20
  }
  sepetStore.sepeteEkle(yeniUrun)
}
</script>

<template>
  <!-- Karta tıklayınca /urunler/ID sayfasına git -->
  <NuxtLink :to="`/urunler/${id}`" class="product-card">
    
    <!-- İndirim Varsa Göster -->
    <div v-if="eskiFiyat && parseFloat(eskiFiyat) > parseFloat(fiyat)" class="discount-badge">%</div>

    <h3 class="title">{{ urunAdi }}</h3>

    <div class="image-container">
      <img :src="urunResmi" alt="Ürün Resmi" />
    </div>

    <div class="bottom-area">
      <div class="price-info">
        <span class="sepette-text">Sepette</span>
        <div class="current-price">{{ formatFiyat(fiyat) }} TL</div>
        <div class="old-price" v-if="eskiFiyat && parseFloat(eskiFiyat) > parseFloat(fiyat)">
          {{ formatFiyat(eskiFiyat) }} TL
        </div>
      </div>

      <!-- Sepete Ekle Butonu (.prevent ile linke gitmeyi engeller) -->
      <button class="btn-add-cart" @click.prevent="sepeteEkle">SEPETE EKLE</button>
    </div>

  </NuxtLink>
</template>

<style scoped>
/* Kartın Genel Yapısı - CSS Değişmedi */
.product-card {
  display: flex; flex-direction: column; justify-content: space-between;
  background: white; border: 1px solid #eee; border-radius: 4px;
  width: 250px; height: 400px; padding: 20px 15px;
  position: relative; text-align: center; transition: all 0.3s ease;
  cursor: pointer; text-decoration: none; color: inherit;
  flex-shrink: 0;
}
.product-card:hover { box-shadow: 0 5px 20px rgba(0,0,0,0.1); border-color: #ddd; }
.discount-badge { position: absolute; top: 15px; right: 15px; background: #d32f2f; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; z-index: 2; }
.title { font-size: 14px; color: #333; font-weight: 700; line-height: 1.4; height: 40px; overflow: hidden; margin-bottom: 10px; }
.image-container { flex: 1; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; }
.image-container img { max-height: 160px; max-width: 100%; object-fit: contain; }
.bottom-area { height: 80px; position: relative; display: flex; align-items: center; justify-content: center; }
.price-info { width: 100%; transition: opacity 0.3s, transform 0.3s; }
.sepette-text { color: #f58220; font-size: 12px; display: block; margin-bottom: 2px; }
.current-price { color: #f58220; font-size: 18px; font-weight: bold; }
.old-price { color: #999; font-size: 13px; text-decoration: line-through; }
.btn-add-cart { position: absolute; bottom: 0; left: 0; right: 0; width: 100%; padding: 12px 0; background-color: #f58220; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 14px; cursor: pointer; opacity: 0; transform: translateY(10px); transition: all 0.3s ease; }
.product-card:hover .price-info { opacity: 0; transform: translateY(-10px); }
.product-card:hover .btn-add-cart { opacity: 1; transform: translateY(0); }
</style>