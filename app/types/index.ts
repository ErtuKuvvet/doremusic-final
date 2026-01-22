// 1. Ürün Tipi (Gitar, Piyano vb.)
export interface IUrun {
  id: string;
  ad: string;
  fiyat: number;
  eskiFiyat?: number; // ? işareti 'olmayabilir' demektir
  resim: string;
  kategori: string;
  stok: boolean;
}

// 2. Sepet Öğesi Tipi (Sepetteki ürün)
export interface ISepetOgesi {
  urun: IUrun;
  adet: number;
}

// 3. Kullanıcı Tipi (Giriş yapan kişi)
export interface IKullanici {
  uid: string;
  email: string;
  adSoyad: string;
  rol: 'musteri' | 'admin'; // Sadece bu iki değer olabilir
}

// 4. Kampanya Tipi (Bannerlar için)
export interface IKampanya {
  id: string;
  baslik: string;
  aciklama: string;
  resimUrl: string;
  aktif: boolean;
}