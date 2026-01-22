<script setup>
import { onMounted } from 'vue'
import { useSepetStore } from '@/stores/sepetStore'

// Store'u bağla
const sepetStore = useSepetStore()

// Sayfa açılınca API'den sepeti çek
onMounted(() => {
  sepetStore.sepetiGetir()
})

const artir = (item) => {
  sepetStore.adetGuncelle(item, item.adet + 1)
}

const azalt = (item) => {
  if (item.adet > 1) {
    sepetStore.adetGuncelle(item, item.adet - 1)
  }
}

const sil = (item) => {
  if(confirm('Ürünü silmek istediğinize emin misiniz?')) {
    sepetStore.sepettenCikar(item)
  }
}

// YENİ: Siparişi Tamamla Fonksiyonu (Bütünleme Şartı)
const siparisiTamamla = async () => {
  if(sepetStore.sepet.length === 0) return alert("Sepetiniz boş!");
  
  try {
    // API'ye 'Siparişi Oluştur' emri gönderiyoruz (Port 3005)
    const res = await fetch('http://localhost:3005/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // Sepettekileri siparişe dönüştür
    });
    
    if(res.ok) {
      alert("Siparişiniz başarıyla alındı! Teşekkür ederiz.");
      // Sepeti güncelle (Boşalmış halini getir)
      sepetStore.sepetiGetir(); 
    } else {
      const err = await res.json();
      alert("Hata: " + (err.error || "Sipariş oluşturulamadı"));
    }
  } catch (error) {
    console.error("Sipariş Hatası", error);
    alert("Sunucuya bağlanılamadı!");
  }
}
</script>

<template>
  <div class="basket-container">
    <h2 class="page-title">Sepetim ({{ sepetStore.sepetAdedi }} Ürün)</h2>

    <!-- Yükleniyor Göstergesi -->
    <div v-if="sepetStore.yukleniyor" class="loading">
      <i class="fa-solid fa-spinner fa-spin"></i> Veriler yükleniyor...
    </div>

    <div v-else class="basket-layout">
      
      <!-- SOL TARAF: Ürün Listesi -->
      <div class="basket-items">
        <!-- Sepet Boşsa -->
        <div v-if="sepetStore.sepet.length === 0" class="empty-cart">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Sepetiniz şu an boş.</p>
          <NuxtLink to="/urunler" class="continue-shopping">Alışverişe Başla</NuxtLink>
        </div>

        <!-- Ürünler Varsa -->
        <div 
          v-else
          class="item-card" 
          v-for="item in sepetStore.sepet" 
          :key="item.apiId"
        >
          <div class="item-img">
            <img :src="item.urun.resim" alt="Ürün" />
          </div>

          <div class="item-details">
            <h3>{{ item.urun.ad }}</h3>
            <!-- Stok Durumu -->
            <p class="stock-status">
              Stokta Var 
              <span style="color: #666; font-weight: normal;">(Kalan: {{ item.urun.stok }})</span>
            </p>
          </div>

          <div class="item-quantity">
            <button @click="azalt(item)">-</button>
            <input type="text" :value="item.adet" readonly />
            <button @click="artir(item)">+</button>
          </div>

          <div class="item-price">
            {{ (item.urun.fiyat * item.adet).toLocaleString('tr-TR') }} TL
          </div>

          <button class="btn-delete" @click="sil(item)">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>

      <!-- SAĞ TARAF: Sipariş Özeti -->
      <div class="order-summary" v-if="sepetStore.sepet.length > 0">
        <h3>Sipariş Özeti</h3>
        
        <div class="summary-row">
          <span>Ara Toplam</span>
          <span>{{ sepetStore.toplamTutar.toLocaleString('tr-TR') }} TL</span>
        </div>
        <div class="summary-row">
          <span>Kargo</span>
          <span>Ücretsiz</span>
        </div>
        
        <div class="total-row">
          <span>Ödenecek Tutar</span>
          <span class="total-price">{{ sepetStore.toplamTutar.toLocaleString('tr-TR') }} TL</span>
        </div>

        <!-- SİPARİŞİ TAMAMLA BUTONU -->
        <button class="btn-checkout" @click="siparisiTamamla">ALIŞVERİŞİ TAMAMLA</button>
        
        <div class="trust-badges">
          <i class="fa-brands fa-cc-visa"></i>
          <i class="fa-brands fa-cc-mastercard"></i>
          <p>Güvenli Alışveriş</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.basket-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
}

.page-title {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  color: #333;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}

.basket-layout {
  display: flex;
  gap: 30px;
}

/* Sol Taraf */
.basket-items {
  flex: 2;
}

.item-card {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 15px;
  background: white;
  border-radius: 4px;
}

.item-img img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 20px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

.stock-status {
  color: #42b983; /* Yeşil */
  font-size: 13px;
  font-weight: bold;
}

.item-quantity {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 30px;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.item-quantity input {
  width: 40px;
  height: 30px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  outline: none;
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
  min-width: 120px;
  text-align: right;
}

.btn-delete {
  background: none;
  border: none;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}
.btn-delete:hover { color: #d32f2f; }

/* Sağ Taraf */
.order-summary {
  flex: 1;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
  height: fit-content;
}

.order-summary h3 {
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

.total-price { color: #d32f2f; }

.btn-checkout {
  width: 100%;
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 15px;
  margin-top: 20px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
.btn-checkout:hover { background-color: #b71c1c; }

.trust-badges {
  margin-top: 20px;
  text-align: center;
  color: #999;
  font-size: 24px;
  display: flex; justify-content: center; gap: 10px;
}
.trust-badges p { font-size: 12px; margin-top: 5px; width: 100%; }

.empty-cart {
  text-align: center;
  padding: 50px;
  color: #999;
}
.empty-cart i { font-size: 50px; margin-bottom: 10px; }
.continue-shopping {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>