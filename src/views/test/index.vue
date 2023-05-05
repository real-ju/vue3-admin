<template>
  <div class="basic-page">
    {{ num }}
    <a-button @click="add">测试</a-button>
  </div>
</template>

<script setup lang="ts" name="VTest1">
const num = ref(1);

const add = () => {
  num.value++;
};
</script>

<style></style>
