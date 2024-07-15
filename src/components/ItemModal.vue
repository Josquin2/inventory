<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useInventoryStore } from '@/stores/items'

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
      <img src="/icons/footer-close.svg" alt="" />
    </div>

    <div class="main-image">
      <img :src="props.item?.image" alt="" />
    </div>

    <span class="upper-divider"></span>

    <div class="item-info">
      <img src="/images/title-skeleton.png" alt="" />
      <img src="/images/item-skeleton.png" alt="" />
    </div>

    <span class="bottom-divider"></span>

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

<style lang="scss">
.hidden {
  display: none !important;
}
.item-modal {
  position: absolute;
  width: 250px;
  height: 500px;
  background-color: #262626e0;
  margin-left: 533px;
  border: 1px solid #4d4d4d;
  border-radius: 0px 12px 12px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  overflow: hidden;

  .close-button {
    cursor: pointer;
    align-self: flex-end;
    display: flex;
  }

  .main-image {
    margin-top: 23px;
    display: flex;

    img {
      width: 130px;
      height: 130px;
    }
  }

  .upper-divider {
    display: flex;
    width: 220px;
    height: 1px;
    margin-top: 30px;
    background-color: #4d4d4d;
  }

  .item-info {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .bottom-divider {
    display: flex;
    width: 220px;
    height: 1px;
    margin-top: 24px;
    background-color: #4d4d4d;
  }

  .delete-item {
    margin-top: 18px;

    .delete-button {
      cursor: pointer;
      width: 220px;
      height: 39px;
      border: none;
      border-radius: 8px;
      background-color: #fa7272;
      color: #ffffff;
    }

    .delete-pop-up {
      position: absolute;
      width: 250px;
      height: 133px;
      background-color: #262626d0;
      border: 1px solid #4d4d4d;
      border-radius: 0px 0px 12px 0px;
      margin-left: -15px;
      margin-top: -77px;
      padding: 20px 21px;
      display: flex;
      flex-direction: column;

      input {
        width: 210px;
        height: 40px;
        background-color: transparent;
        border: 1px solid #4d4d4d;
        border-radius: 4px;
        padding-left: 12px;
        font-size: 14px;
        color: #ffffff;
      }

      .buttons {
        margin-top: 20px;
        display: flex;
        gap: 10px;

        button {
          height: 33px;
          border: none;
          border-radius: 8px;
        }
        .cancel {
          width: 88px;
        }
        .confirm {
          width: 112px;
          background-color: #fa7272;
          color: #ffffff;
        }
      }
    }
  }
}
@keyframes slideIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.slide-up {
  animation: slide-up 0.4s ease-out;
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}
</style>
