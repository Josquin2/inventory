<template>
  <div class="main-view">
    <div class="center-view">
      <div class="item-info"></div>
      <div class="main-inventory"></div>
    </div>
    <div class="footer"></div>
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
    }

    .main-inventory {
      width: 525px;
      height: 500px;
      border: 1px solid #3c3c43;
      border-radius: 12px;
      background-color: #262626;
    }
  }

  .footer {
    width: 785px;
    height: 72px;
    border: 1px solid #3c3c43;
    border-radius: 12px;
    background-color: #262626;
  }
}
</style>
