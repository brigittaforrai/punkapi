<template>
<div class="text-xs-center">
  <v-pagination v-if="pageNum > 0" @input="changePage" v-model="page" :length="pageNum" :color="'orange'" style="margin-bottom: 24px;"></v-pagination>
  <div v-if="pageNum === 0">
    No result
  </div>
</div>
</template>

<script>
export default {
  name: 'paginator',
  data: function() {
    return {
      page: 1
    }
  },
  methods: {
    changePage(event) {
      this.page = event
      this.$store.commit('setPage', this.page)
    }
  },
  computed: {
    pageNum() {
      return this.$store.getters.getPageNum
    }
  }
}
</script>
