<script setup lang="ts">
const items = [
  {
    name: 'green',
    count: 4,
    position: '1 1',
    image: '/items/green.png'
  },
  {
    name: 'yellow',
    count: 2,
    position: '2 1',
    image: '/items/yellow.png'
  },
  {
    name: 'blue',
    count: 5,
    position: '3 1',
    image: '/items/blue.png'
  }
]
</script>

<template>
  <div class="main-view">
    <div class="center-view">
      <div class="item-info">
        <img src="/images/Img.png" alt="" class="info-image" />

        <img src="/images/info-skeleton.png" alt="" />
      </div>
      <div class="main-inventory">
        <div v-for="item in 25" class="one-item">
          <div v-if="item - 1 in items" class="actual-item">
            <div class="item-count">
              {{ items[item - 1].count }}
            </div>
            <img :src="items[item - 1].image" alt="" />
          </div>
        </div>
      </div>
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

  .center-view {
    display: flex;
    gap: 24px;

    .item-info {
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
        border: 1px solid #3c3c43;

        .actual-item {
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
