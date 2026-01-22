<script setup>
import { ref, onMounted } from 'vue'

const urunler = ref([])
// Yeni ürün için model
const yeniUrun = ref({ title: '', price: 0, oldPrice: 0, stock: 10, category: 'Gitar', image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=400' })

const verileriGetir = async () => {
  const res = await fetch('http://localhost:3005/api/products')
  urunler.value = await res.json()
}

const guncelle = async (urun) => {
  await fetch(`http://localhost:3005/api/products/${urun.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(urun)
  })
  alert('Ürün ve Fiyatlar Güncellendi!')
}

// ... ekle fonksiyonu aynı kalabilir ...
onMounted(() => verileriGetir())
</script>

<template>
  <div class="admin-container">
    <h1>Admin Paneli: Fiyat ve İndirim Yönetimi</h1>
    
    <div class="product-list">
      <table>
        <thead>
          <tr>
            <th>Resim</th>
            <th>Ürün Adı</th>
            <th>Satış Fiyatı (TL)</th>
            <th>Eski Fiyat (İndirim İçin)</th>
            <th>Stok</th>
            <th>Kaydet</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="urun in urunler" :key="urun.id">
            <td><img :src="urun.image" class="thumb" /></td>
            <td><input v-model="urun.title" class="input-text" /></td>
            
            <!-- FİYATLAR -->
            <td><input v-model.number="urun.price" type="number" class="input-num" /></td>
            <td>
              <input v-model.number="urun.oldPrice" type="number" class="input-num" />
              <div style="font-size:10px; color:#666;">(Satış fiyatından yüksekse indirim görünür)</div>
            </td>
            
            <td><input v-model.number="urun.stock" type="number" class="input-num" /></td>
            <td><button @click="guncelle(urun)" class="btn-save">GÜNCELLE</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* CSS'ler önceki admin.vue ile aynı */
.admin-container { padding: 40px; max-width: 1200px; margin: 0 auto; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
th, td { border: 1px solid #ddd; padding: 15px; text-align: left; }
th { background: #333; color: white; }
.thumb { width: 60px; height: 60px; object-fit: contain; }
.input-text { width: 100%; padding: 8px; border: 1px solid #ddd; }
.input-num { width: 100px; padding: 8px; border: 1px solid #ddd; }
.btn-save { background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; }
</style>