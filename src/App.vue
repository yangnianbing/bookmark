<template>
  <div id="app">
    <Header/>
    <LeftMenu/>
    <RecordList/>
  </div>
</template>

<script>
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'
import RecordList from './components/RecordList'

export default {
  components: {Header, RecordList, LeftMenu},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background-color: rgb(248, 249, 250);
  text-align: center;
}

html,body{
  height: 100%;
  width: 100%;
  margin: 0px;
}
</style>
