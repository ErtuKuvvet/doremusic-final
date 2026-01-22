<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Tip Tanımlaması (TypeScript için)
interface Slayt {
  id: number;
  resim: string;
  baslik: string;
  aciklama: string;
}

/* GÜNCELLENMİŞ SLIDER:
   - TypeScript uyumlu
   - 'Şimdi İncele' butonu /urunler sayfasına yönlendiriyor
   - Resimler Unsplash HD kaynaklı
*/

const slaytlar: Slayt[] = [
  {
    id: 1,
    // Piyano
    resim: 'https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=1200&auto=format&fit=crop',
    baslik: 'PİYANO GÜNLERİ',
    aciklama: 'Evinize yakışacak en şık piyanolar.'
  },
  {
    id: 2,
    // Elektro Gitar
    resim: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1200&auto=format&fit=crop',
    baslik: 'EFSANE GİTARLAR',
    aciklama: 'Sahne senin, gitarını seç.'
  },
  {
    id: 3,
    // Stüdyo
    resim: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    baslik: 'PROFESYONEL STÜDYO',
    aciklama: 'Hayalindeki kayıt ortamını kur.'
  },
  {
    id: 4,
    // Davul
    resim: 'https://images.unsplash.com/photo-1519892300165-cb5542fb4747?q=80&w=1200&auto=format&fit=crop',
    baslik: 'RİTMİ HİSSET',
    aciklama: 'Dünyaca ünlü davul setleri stoklarda.'
  },
  {
    id: 5,
    // Klasik Gitar
    resim: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1200&auto=format&fit=crop',
    baslik: 'BAŞLANGIÇ GİTARLARI',
    aciklama: 'Müziğe ilk adımını at.'
  }
]

const aktifSlayt = ref(0)

// HATA ÇÖZÜMÜ: Sonuna '!' ekleyerek TS'ye bu değerin kesinlikle var olduğunu belirttik.
const mevcutSlayt = computed<Slayt>(() => slaytlar[aktifSlayt.value] || slaytlar[0]!)

const ileriGit = () => {
  if (aktifSlayt.value === slaytlar.length - 1) aktifSlayt.value = 0
  else aktifSlayt.value++
}

const geriGit = () => {
  if (aktifSlayt.value === 0) aktifSlayt.value = slaytlar.length - 1
  else aktifSlayt.value--
}

const slaytDegistir = (index: number) => {
  aktifSlayt.value = index
}

// Butona tıklayınca Ürünler sayfasına git
const incele = () => {
  router.push('/urunler')
}
</script>

<template>
  <div class="slider-wrapper">
    
    <!-- BÜYÜK GÖRSEL -->
    <!-- slaytlar[aktifSlayt] yerine artık güvenli olan mevcutSlayt kullanıyoruz -->
    <div 
      class="main-slide" 
      :key="aktifSlayt"
      :style="{ backgroundImage: `url(${mevcutSlayt.resim})` }"
    >
      <div class="slide-content">
        <h2>{{ mevcutSlayt.baslik }}</h2>
        <p>{{ mevcutSlayt.aciklama }}</p>
        <!-- Tıklama özelliği eklendi -->
        <button class="btn-incele" @click="incele">ŞİMDİ İNCELE →</button>
      </div>
    </div>

    <!-- KÜÇÜK RESİMLER VE OKLAR -->
    <div class="thumbnail-strip">
      <button class="nav-btn prev" @click="geriGit">‹</button>

      <div class="thumbnails">
        <div 
          v-for="(slayt, index) in slaytlar" 
          :key="slayt.id" 
          class="thumb-item"
          :class="{ active: index === aktifSlayt }"
          @click="slaytDegistir(index)"
        >
          <img :src="slayt.resim" alt="thumb" />
          <div class="overlay"></div>
        </div>
      </div>

      <button class="nav-btn next" @click="ileriGit">›</button>
    </div>

  </div>
</template>

<style scoped>
.slider-wrapper { width: 100%; background: white; padding-bottom: 20px; }
.main-slide { height: 400px; width: 100%; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; margin-bottom: 10px; border-radius: 4px; background-color: #333; transition: background-image 0.3s ease-in-out; }
.main-slide::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%); border-radius: 4px; }
.slide-content { position: relative; color: white; margin-left: 50px; max-width: 400px; animation: fadeIn 0.5s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
.slide-content h2 { font-size: 2.5rem; font-weight: 900; text-transform: uppercase; margin-bottom: 10px; line-height: 1.1; text-shadow: 2px 2px 10px rgba(0,0,0,0.5); }
.slide-content p { font-size: 1.1rem; margin-bottom: 20px; opacity: 0.9; }
.btn-incele { background: white; color: #333; padding: 10px 25px; border: none; font-weight: bold; font-size: 14px; cursor: pointer; transition: all 0.3s; }
.btn-incele:hover { background: #d32f2f; color: white; }
.thumbnail-strip { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 0 10px; height: 80px; }
.nav-btn { width: 40px; height: 60px; background: white; border: 1px solid #ddd; color: #333; font-size: 30px; line-height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-family: monospace; padding-bottom: 5px; }
.nav-btn:hover { background: #f4f4f4; color: #d32f2f; border-color: #d32f2f; }
.thumbnails { display: flex; gap: 10px; overflow-x: auto; padding: 5px 0; }
.thumb-item { width: 120px; height: 60px; position: relative; cursor: pointer; border: 2px solid transparent; transition: all 0.3s; }
.thumb-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
.thumb-item .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); transition: background 0.3s; }
.thumb-item.active { border-color: #d32f2f; }
.thumb-item.active .overlay { background: rgba(0,0,0,0); }
.thumb-item:hover .overlay { background: rgba(0,0,0,0.1); }
</style>