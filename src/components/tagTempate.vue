<template>
    <div class="tag-container">
      <div class="tag-container__icon-container" :style="{backgroundColor: `rgba(${rgbColor}, 1)`}">
        <slot name="icon" ></slot>
      </div>
      <div class="tag-container__info-container">
        <div class="info-number-container" :style="{color: `rgba(${rgbColor}, 1)`}"><slot /></div>
        <div class="info-desc-container" :style="{backgroundColor: `rgba(${rgbColor}, 0.6)`}">{{desc}}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      desc: String,
      /** value must begin with 'icon-' */
      iconClass: String,
      /** value must formatted as r, b, a */
      rgbColor: String
    }
  }
  </script>
  
  <style scoped>
  .tag-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 10px;
    border: 1px rgba(0, 0, 0, 0.1) solid;
    transition: all 0.2s;
    overflow: hidden;
  }
  
  .tag-container:hover {
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  }
  
  .tag-container /deep/ .tag-container__icon-container {
    height: 100%;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px rgba(0, 0, 0, 0.1) solid;
  }
  
  .tag-container /deep/ .tag-container__icon-container i {
    line-height: 1;
    font-size: 28px;
    color: white;
  }
  
  .tag-container /deep/ .tag-container__info-container {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .tag-container /deep/ .tag-container__info-container .info-number-container {
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    font-weight: bold;
    padding-left: 8px;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  }
  
  .tag-container /deep/ .tag-container__info-container .info-number-container, .tag-container /deep/ .tag-container__info-container .info-number-container * {
    font-family: 'Courier New', Courier, monospace;
  }
  
  .tag-container /deep/ .tag-container__info-container .info-desc-container {
    line-height: 20px;
    font-size: 12px;
    padding-left: 8px;
    color: white;
  }
  
  </style>