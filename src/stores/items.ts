import { defineStore } from 'pinia'

export const useInventoryStore = defineStore({
  id: 'inventory',
  state: () => ({
    grid: Array(25).fill(null) as (ItemType | null)[],
    items: [
      {
        name: 'green',
        count: 4,
        position: 1,
        image: 'items/green.png'
      },
      {
        name: 'yellow',
        count: 2,
        position: 2,
        image: 'items/yellow.png'
      },
      {
        name: 'blue',
        count: 5,
        position: 3,
        image: 'items/blue.png'
      }
    ] as ItemType[]
  }),
  actions: {
    load() {
      const savedGrid = localStorage.getItem('grid')
      if (savedGrid) {
        this.grid = JSON.parse(savedGrid)
      } else {
        this.items.forEach((item) => {
          this.grid[item.position - 1] = item
        })
        this.save()
      }
    },
    save() {
      localStorage.setItem('grid', JSON.stringify(this.grid))
    },
    setItem(index: number, item: ItemType | null) {
      if (item != null) {
        item.position = index + 1
      }
      this.grid[index] = item

      this.save()
    }
  }
})

type ItemType = {
  name: string
  count: number
  position: number
  image: string
}
