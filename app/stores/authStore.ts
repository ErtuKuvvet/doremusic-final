import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    kullanici: null as any,
    girisYapildi: false
  }),

  actions: {
    // API ile Kayıt Ol
    async kayitOl(formVerisi: any) {
      try {
        const res = await fetch('http://localhost:3005/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formVerisi)
        });

        const data = await res.json();

        if (res.ok) {
          alert('Kayıt Başarılı! Giriş yapabilirsiniz.');
          return true;
        } else {
          alert(data.error || 'Kayıt başarısız');
          return false;
        }
      } catch (error) {
        console.error('Kayıt Hatası:', error);
        alert('Sunucu hatası');
        return false;
      }
    },

    // API ile Giriş Yap
    async girisYap(email: string, sifre: string) {
      try {
        const res = await fetch('http://localhost:3005/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, sifre })
        });

        const data = await res.json();

        if (res.ok) {
          this.kullanici = data.user;
          this.girisYapildi = true;
          alert('Giriş Başarılı! Hoşgeldin ' + data.user.ad);
          // Hata çıkaran router.push satırını buradan kaldırdık.
          // Yönlendirmeyi AppLogin.vue dosyası yapacak.
          return true;
        } else {
          alert(data.error || 'Giriş başarısız');
          return false;
        }
      } catch (error) {
        console.error('Giriş Hatası:', error);
        alert('Sunucu hatası');
        return false;
      }
    },

    cikisYap() {
      this.kullanici = null;
      this.girisYapildi = false;
    }
  }
})