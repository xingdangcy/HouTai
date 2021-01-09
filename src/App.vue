<template>
  <div id="app" style="position:relative">
    <transition >
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  watch:{
    '$route'(to,from,next){
      
    }
  }
}
</script>
<style>
body{
  margin: 0px;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active{
  transition: all 500ms ease;
  position: absolute;
  top:0px;
  bottom: 100%;
}
.slide-right-enter{
  transform: translateX(-100%);
}
.slide-right-leave-to{
  transform: translateX(100%);
}
.slide-left-enter{
  transform: translateX(100%);
}
.slide-left-leave-to{
  transform: translateX(-100%);
}
</style>
