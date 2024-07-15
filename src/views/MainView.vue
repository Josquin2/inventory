<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/items'
import ItemModal from '@/components/ItemModal.vue'
import Close from '@/components/icons/Close.vue'

const store = useInventoryStore()

onMounted(() => {
  store.load()
})

let draggedItemIndex: number | null = null

function dragStart(index: number): void {
  draggedItemIndex = index
}

function drop(index: number): void {
  if (draggedItemIndex !== null) {
    const itemToMove = store.grid[draggedItemIndex]
    store.setItem(draggedItemIndex, null)
    store.setItem(index, itemToMove)
  }
}

const clickedItem = ref({})

function onItemClick(item: object) {
  console.log(item)
  clickedItem.value = item
  const modal = document.getElementById('modal')
  if (modal) {
    modal.classList.remove('hidden')
    modal.classList.add('slide-in')
  }
}
</script>

<template>
  <div class="main-view">
    <div class="center-view">
      <div class="main-info">
        <img src="/images/Img.png" alt="" class="info-image" />

        <img src="/images/info-skeleton.png" alt="" />
      </div>
      <div class="main-inventory">
        <div
          v-for="(item, index) in store.grid"
          :key="index"
          class="one-item"
          :draggable="item !== null"
          @dragstart="dragStart(index)"
          @dragover.prevent
          @drop="drop(index)"
        >
          <div v-if="item" class="actual-item" @click="onItemClick(item)">
            <div class="item-count">
              {{ item.count }}
            </div>
            <img :src="item.image" alt="" draggable="false" />
          </div>
        </div>
      </div>
      <!-- Modal -->
      <ItemModal :item="clickedItem" />
    </div>
    <div class="footer">
      <img src="/images/footer-skeleton.png" alt="" />
      <Close class="close-icon" />
    </div>
  </div>
</template>
