<template>
  <iframe id="onlineIframe"
          src="./static/ViewerJS/index.html"
          width="100%"
          allowfullscreen
          webkitallowfullscreen>
  </iframe>
</template>

<script>
    export default {
      name: "MyReprotEnclosure",
      methods:{

      },
      computed:{
        actionUrl(){
          //src="${base}/ViewerJS/index.html#${base}/outDoc/${fileName}"
          return `/api/CMM/attachSave_uploadUserHead`;
        }
      }
    }
</script>

<style scoped>

</style>
