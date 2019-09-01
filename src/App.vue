<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition name="fadeToggle">
      <router-view />
    </transition>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display:none;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* // 淡入淡出,<transition  name="fadeToggle"> */
.fadeToggle-enter,.fadeToggle-leave-to{
    opacity: 0;
}
.fadeToggle-enter-to,.fadeToggle-leave{
    opacity: 1;
}
.fadeToggle-enter-active{
    transition: all 2s;
}
.fadeToggle-leave-active{
    transition: all 0.3s;
}

</style>
