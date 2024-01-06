<template>
  <div>
    <AppHeader />
    <div class="flex flex-row">
      <AppSideBar />
      <BookmarkList :items="bookmarkList" />
    </div>
  </div>
</template>

<script>
import AppSideBar from "@/components/Home/AppSideBar.vue";
export default {
  components: {
    AppSideBar,
  },
  data(){
    return {
      bookmarkList:[]
    }
  },
  created(){
    this.$axios.get("/bookmarks?_expand=category&_expand=user").then(res => {
      console.log(res.data)
      this.bookmarkList = res?.data || []
    })
  },
};
</script>
