<template>
  <div ref="warpRef" class="warp"></div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {moveEvent} from '@nimble-ui/move';

defineOptions({name: 'YMove'});
const list = reactive([
  {id: 1, title: '测试1'},
  {id: 2, title: '测试2'},
  {id: 3, title: '测试3'},
  {id: 4, title: '测试4'},
  {id: 5, title: '测试5'},
  {id: 6, title: '测试6'},
  {id: 7, title: '测试7'},
  {id: 8, title: '测试8'},
  {id: 9, title: '测试9'},
  {id: 10, title: '测试10'},
]);

setTimeout(() => {
  list.push({id: 11, title: '测试11'});
}, 3000);

const warpRef = ref<HTMLElement>();
const getEl = () => warpRef.value;
const {on} = moveEvent<{down: {a: number}}>(getEl);

on('down', (data) => {
  console.log(data);
  return {a: 111};
});

on('move', ({value}) => {
  console.log(value.down);
});
</script>

<style lang="scss">
.warp {
  width: 500px;
  height: 400px;
  background-color: red;

  .move {
    width: 150px;
    height: 50px;
  }
}
.horizontal {
  width: 400px;
  &-content {
    white-space: nowrap;
    padding: 5px 0;
  }
}
</style>
