import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  
  const firebaseConfig = {
   
  apiKey: "AIzaSyBVOldafdAjJJqeziFEBA28Lqndp0QGwnw",
  authDomain: "doremusic-final.firebaseapp.com",
  projectId: "doremusic-final",
  storageBucket: "doremusic-final.firebasestorage.app",
  messagingSenderId: "859111776840",
  appId: "1:859111776840:web:78a865b158532cb809ae7d",
  measurementId: "G-JVFR8EWC6N"

  };

  // Firebase'i başlatıyoruz
  const app = initializeApp(firebaseConfig);
  
  // Veritabanını (Firestore) başlatıyoruz
  const db = getFirestore(app);

  // Uygulamanın her yerinden erişebilmek için 'provide' ediyoruz
  // Artık her yerden $db diyerek veritabanına ulaşabileceğiz
  return {
    provide: {
      db
    }
  }
})