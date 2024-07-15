<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/items'
import ItemModal from '@/components/ItemModal.vue'

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
      <img src="/icons/footer-close.svg" alt="" class="close-icon" />
    </div>
  </div>
</template>

<style lang="scss">
.main-view {
  width: 849px;
  height: 660px;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  overflow-y: hidden;

  .center-view {
    display: flex;
    gap: 24px;

    .main-info {
      width: 236px;
      height: 500px;
      border: 1px solid #4d4d4d;
      border-radius: 12px;
      padding: 18px 14px;
      background-color: #262626;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .main-inventory {
      width: 525px;
      height: 500px;
      border: 1px solid #3c3c43;
      border-radius: 12px;
      background-color: #262626;
      display: grid;
      grid-template-rows: repeat(5, minmax(0, 1fr));
      grid-template-columns: repeat(5, minmax(0, 1fr));
      overflow: hidden;

      .one-item {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.5px solid #3c3c43;

        .actual-item {
          cursor: pointer;

          .item-count {
            width: 16px;
            height: 16px;
            border: 1px solid #3c3c43;
            border-radius: 6px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            color: #ffffff88;
            margin-top: 63px;
            margin-left: 63px;
            font-size: 10px;
            font-weight: 200;
          }
        }
      }
    }
  }

  .footer {
    width: 785px;
    height: 72px;
    border: 1px solid #3c3c43;
    border-radius: 12px;
    background-color: #262626;
    padding: 18px;

    .close-icon {
      position: absolute;
      margin-left: 36px;
      margin-top: -10px;
      cursor: pointer;
    }
  }
}
</style>
