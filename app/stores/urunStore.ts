import { defineStore } from 'pinia'
import type { IUrun } from '@/types'

export const useUrunStore = defineStore('urun', {
  state: () => ({
    urunler: [] as IUrun[],
    yukleniyor: false
  }),
  
  actions: {
    // API'den Ürünleri Çek (PORT 3005)
    async urunleriGetir() {
      this.yukleniyor = true;
      try {
        const response = await fetch('http://localhost:3005/api/products');
        const data = await response.json();
        
        // API (title, price) -> Frontend (ad, fiyat) Dönüşümü
        this.urunler = data.map((item: any) => ({
          id: item.id,
          ad: item.title,
          fiyat: item.price,
          eskiFiyat: item.oldPrice,
          resim: item.image,
          kategori: item.category,
          // DÜZELTME: Sabit 'true' yerine API'den gelen stok sayısını (item.stock) alıyoruz
          stok: item.stock 
        }));
        
      } catch (error) {
        console.error("API Hatası:", error);
        this.urunler = []; 
      } finally {
        this.yukleniyor = false;
      }
    }
  }
})