import { defineStore } from 'pinia'
import type { IKampanya } from '@/types'

export const useKampanyaStore = defineStore('kampanya', {
  state: () => ({
    kampanyalar: [] as IKampanya[]
  }),

  actions: {
    kampanyalariGetir() {
      this.kampanyalar = [
        { id: '1', baslik: 'Dijital Piyanolar', aciklama: 'Efsane Kasım İndirimi', resimUrl: '...', aktif: true },
        { id: '2', baslik: 'Gitarlar', aciklama: 'Sahne Seni Bekliyor', resimUrl: '...', aktif: true }
      ];
    }
  }
})