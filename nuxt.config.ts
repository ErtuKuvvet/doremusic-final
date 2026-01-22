// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // İŞTE EKSİK OLAN KRİTİK SATIR BU:
  srcDir: 'app/',

  // Pinia modülünü ekliyoruz
  modules: ['@pinia/nuxt'],

  // CSS dosyasını tanıtıyoruz (Artık app/assets içinde olduğu için ~ işareti app klasörünü temsil eder)
  css: ['~/assets/main.css'],

  // VİZEDEKİ GÖRÜNÜMÜ SAĞLAMAK İÇİN GEREKLİ AYARLAR:
  app: {
    head: {
      title: 'doremusic Final',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        // FontAwesome İkon Kütüphanesi (Vizedeki index.html'den buraya taşıdık)
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  }
})