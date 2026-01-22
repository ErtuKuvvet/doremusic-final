<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Yönlendirme için router'ı ekledik
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter() // Router'ı kullanıma hazırla
const email = ref('')
const sifre = ref('')

const giris = async () => {
  // İşlem sonucunu bekliyoruz (True veya False döner)
  const basarili = await authStore.girisYap(email.value, sifre.value)
  
  // Eğer giriş başarılıysa ana sayfaya at
  if (basarili) {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2>Üye Girişi</h2>
      <p class="sub-text">Doremusic dünyasına hoş geldiniz!</p>

      <form @submit.prevent="giris">
        <div class="form-group">
          <label>E-Posta Adresi</label>
          <input type="email" v-model="email" placeholder="ornek@email.com" />
        </div>

        <div class="form-group">
          <label>Şifre</label>
          <input type="password" v-model="sifre" placeholder="******" />
        </div>

        <button class="btn-login">GİRİŞ YAP</button>

        <div class="extra-links">
          <span>Şifremi Unuttum</span>
          <span class="divider">|</span>
          <NuxtLink to="/uye-ol" class="register-link">Yeni Üyelik Oluştur</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Mevcut stiller aynen kalıyor */
.login-wrapper { display: flex; justify-content: center; align-items: center; padding: 50px; background-color: #f9f9f9; min-height: 60vh; }
.login-box { background: white; padding: 40px; width: 100%; max-width: 400px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
h2 { color: #333; margin-bottom: 10px; }
.sub-text { color: #777; font-size: 14px; margin-bottom: 30px; }
.form-group { margin-bottom: 20px; text-align: left; }
.form-group label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 5px; color: #555; }
.form-group input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; }
.form-group input:focus { border-color: #d32f2f; }
.btn-login { width: 100%; padding: 12px; background-color: #d32f2f; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 16px; margin-top: 10px; transition: background 0.3s; cursor: pointer; }
.btn-login:hover { background-color: #b71c1c; }
.extra-links { margin-top: 20px; font-size: 13px; color: #666; display: flex; justify-content: center; align-items: center; }
.extra-links span { cursor: pointer; }
.register-link { text-decoration: none; color: #666; cursor: pointer; }
.register-link:hover { color: #d32f2f; text-decoration: underline; }
.divider { margin: 0 10px; color: #ccc; }
</style>