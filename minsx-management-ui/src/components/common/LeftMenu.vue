<template>
  <div class="LeftMenu">
    <li>
    <span @click="toggle">
      <i v-if="isFolder" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
      <i v-if="!isFolder" class="icon file-text"></i>
      {{ model.menuName }}
    </span>
      <ul v-show="open" v-if="isFolder">
        <LeftMenu v-for="item in model.children" :key="item.menuCode" :model="item" ></LeftMenu>
      </ul>
    </li>
  </div>
</template>

<script>
  export default {
    name: 'LeftMenu',
    props: ['model'],
    data() {
      return {
        open: true,
        isFolder: true
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      }
    }
  }
</script>

<style scoped>

</style>
