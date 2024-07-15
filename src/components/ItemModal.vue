<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useInventoryStore } from '@/stores/items'
import Close from '@/components/icons/Close.vue'

const props = defineProps({
  item: Object
})

const deleteCount: Ref<number | undefined> = ref()

const store = useInventoryStore()

function onCloseButtonClick() {
  deleteCount.value = undefined
  const modal = document.getElementById('modal')
  if (modal) {
    modal.classList.add('hidden')
    modal.classList.remove('slide-in')
  }

  if (!document.getElementById('pop-up')?.classList.contains('hidden')) {
    document.getElementById('pop-up')?.classList.add('hidden')
  }
}

function onDeleteButtonClick() {
  document.getElementById('pop-up')?.classList.remove('hidden')
}
function onCancelButtonClick() {
  document.getElementById('pop-up')?.classList.add('hidden')
}

function onConfirmButtonClick() {
  if (deleteCount.value != undefined) {
    const item = {
      name: props.item?.name,
      count: props.item?.count - deleteCount.value,
      position: props.item?.position,
      image: props.item?.image
    }

    if (item.count < 1) {
      store.setItem(props.item?.position - 1, null)
      onCloseButtonClick()
    } else {
      store.setItem(props.item?.position - 1, item)
      onCloseButtonClick()
    }
  }
}
</script>

<template>
  <div class="item-modal slide-in hidden" id="modal">
    <div class="close-button" @click="onCloseButtonClick">
      <Close />
    </div>

    <div class="main-image">
      <img :src="props.item?.image" alt="" />
    </div>

    <span class="divider upper-divider"></span>

    <div class="item-info">
      <img src="/images/title-skeleton.png" alt="" />
      <img src="/images/item-skeleton.png" alt="" />
    </div>

    <span class="divider bottom-divider"></span>

    <div class="delete-item">
      <div class="delete-pop-up slide-up hidden" id="pop-up">
        <input type="text" placeholder="Введите количество" v-model="deleteCount" />
        <div class="buttons">
          <button class="cancel" @click="onCancelButtonClick">Отмена</button>
          <button class="confirm" @click="onConfirmButtonClick">Подтвердить</button>
        </div>
      </div>
      <button class="delete-button" @click="onDeleteButtonClick()">Удалить предмет</button>
    </div>
  </div>
</template>
