import { defineStore } from 'pinia'
import { useUrunStore } from '@/stores/urunStore' // Ürün store'u çağırıyoruz

export const useSepetStore = defineStore('sepet', {
  state: () => ({
    sepet: [] as any[],
    yukleniyor: false
  }),

  getters: {
    toplamTutar: (state) => {
      return state.sepet.reduce((toplam, item) => {
        const fiyat = item.urun ? item.urun.fiyat : item.price;
        const adet = item.adet || item.quantity;
        return toplam + (fiyat * adet);
      }, 0);
    },
    sepetAdedi: (state) => {
      return state.sepet.reduce((toplam, item) => toplam + (item.adet || item.quantity), 0);
    }
  },

  actions: {
    async sepetiGetir() {
      this.yukleniyor = true;
      try {
        const res = await fetch('http://localhost:3005/api/cart');
        const data = await res.json();
        
        this.sepet = data.map((item: any) => ({
          urun: {
            id: item.id,
            ad: item.title,
            fiyat: item.price,
            resim: item.image,
            kategori: item.category || 'Genel',
            stok: item.stock // API'den gelen güncel stok
          },
          adet: item.quantity,
          apiId: item.id
        }));
      } catch (error) {
        console.error("Sepet Hatası:", error);
      } finally {
        this.yukleniyor = false;
      }
    },

    async sepeteEkle(urun: any) {
      try {
        const apiUrun = {
          id: urun.id,
          title: urun.ad || urun.title,
          price: urun.fiyat || urun.price,
          image: urun.resim || urun.image,
          category: urun.kategori || 'Genel'
        };

        const res = await fetch('http://localhost:3005/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiUrun)
        });

        if(res.ok) {
          alert("Ürün Eklendi!");
          await this.sepetiGetir();
          
          // DÜZELTME: Ürün listesini de güncelle ki stok düşmüş görünsün
          const urunStore = useUrunStore();
          await urunStore.urunleriGetir();
        } else {
          // Stok hatası vs. varsa uyar
          const err = await res.json();
          alert("Hata: " + (err.error || "Bilinmeyen hata"));
        }
      } catch (error) {
        console.error("Ekleme Hatası:", error);
      }
    },
    
    async sepettenCikar(item: any) {
      try {
        const id = item.urun.id || item.apiId;
        await fetch(`http://localhost:3005/api/cart/${id}`, {
          method: 'DELETE'
        });
        await this.sepetiGetir();
        
        // Ürün listesini güncelle (Stok iade edildi)
        const urunStore = useUrunStore();
        await urunStore.urunleriGetir();
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    },

    async adetGuncelle(item: any, yeniAdet: number) {
      try {
        const id = item.urun.id || item.apiId;
        const res = await fetch(`http://localhost:3005/api/cart/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: yeniAdet })
        });
        
        if (res.ok) {
            await this.sepetiGetir();
            // Ürün listesini güncelle
            const urunStore = useUrunStore();
            await urunStore.urunleriGetir();
        } else {
            const err = await res.json();
            alert(err.error || "Güncelleme yapılamadı");
        }
      } catch (error) {
        console.error("Güncelleme hatası:", error);
      }
    }
  }
})