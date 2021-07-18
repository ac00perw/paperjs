<template>
  <div id="app">
    <div id="nav" class="fixed top-0 right-0 m-0 z-50">
      <router-link to="/">Home</router-link> |
      <router-link to="/string">String</router-link> |
      <router-link to="/lava">Waves</router-link> |
      <router-link to="/scroll">Scroll</router-link> |
      <router-link to="/scroll-2">Scroll2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  margin: 0;
  padding:  0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
