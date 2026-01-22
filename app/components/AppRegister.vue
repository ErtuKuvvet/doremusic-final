<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// Form Verileri
const form = ref({
  ad: '',
  soyad: '',
  email: '',
  sifre: '',
  tip: 'bireysel' // Bireysel veya kurumsal
})

const kayitOl = () => {
  if (!form.value.ad || !form.value.email || !form.value.sifre) {
    alert("Lütfen zorunlu alanları doldurun!");
    return;
  }
  // Store üzerinden kayıt işlemini başlat
  authStore.kayitOl(form.value)
}
</script>

<template>
  <div class="register-wrapper">
    <div class="register-box">
      
      <!-- Üst Sekmeler -->
      <div class="auth-tabs">
        <NuxtLink to="/giris" class="tab inactive">GİRİŞ YAP</NuxtLink>
        <div class="tab active">ÜYE OL</div>
      </div>

      <!-- Tip Seçici -->
      <div class="type-selector">
        <label :class="{ selected: form.tip === 'bireysel' }">
          <input type="radio" value="bireysel" v-model="form.tip" name="type">
          <span>Bireysel</span>
        </label>
        <label :class="{ selected: form.tip === 'kurumsal' }">
          <input type="radio" value="kurumsal" v-model="form.tip" name="type">
          <span>Kurumsal</span>
        </label>
      </div>

      <!-- Form -->
      <form class="register-form" @submit.prevent="kayitOl">
        
        <div class="row">
          <div class="form-group half">
            <label>Adınız</label>
            <input type="text" v-model="form.ad" placeholder="Adınızı giriniz">
          </div>
          <div class="form-group half">
            <label>Soyadınız</label>
            <input type="text" v-model="form.soyad" placeholder="Soyadınızı giriniz">
          </div>
        </div>

        <div class="form-group">
          <label>E-Posta Adresiniz</label>
          <input type="email" v-model="form.email" placeholder="E-posta adresinizi giriniz">
        </div>

        <div class="form-group">
          <label>Şifre</label>
          <input type="password" v-model="form.sifre" placeholder="Şifrenizi giriniz">
        </div>

        <!-- Buton -->
        <button class="btn-register">ÜYE OL</button>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* Mevcut stiller korunuyor */
.register-wrapper { display: flex; justify-content: center; padding: 40px 20px; background-color: #f9f9f9; min-height: 80vh; }
.register-box { background: white; width: 100%; max-width: 450px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); overflow: hidden; }
.auth-tabs { display: flex; border-bottom: 1px solid #eee; }
.tab { flex: 1; text-align: center; padding: 15px; font-weight: bold; cursor: pointer; color: #777; background: #fcfcfc; text-decoration: none; display: block; }
.tab.active { background: white; color: #d32f2f; border-top: 3px solid #d32f2f; }
.tab.inactive:hover { background: #f0f0f0; }
.type-selector { display: flex; padding: 20px 20px 0 20px; gap: 15px; }
.register-form { padding: 20px; }
.row { display: flex; gap: 15px; }
.half { flex: 1; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; color: #333; }
.form-group input { width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; }
.form-group input:focus { border-color: #d32f2f; }
.btn-register { width: 100%; padding: 12px; background-color: #d32f2f; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 16px; margin-top: 10px; cursor: pointer; }
.btn-register:hover { background-color: #b71c1c; }
.type-selector label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: #555; }
.type-selector input[type="radio"] { accent-color: #d32f2f; width: 16px; height: 16px; }
</style>