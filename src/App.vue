<template>
  <div id="app">
    <PolygonData @data="onPolygonData"/>
    <br/>
    <FinanceTable v-bind:rows="records"/>
  </div>
</template>

<script>

import FinanceTable from './components/FinanceTable.vue'
import PolygonData from './components/PolygonData.vue'

// Vue app main
export default {
  name: 'App',
  components: {
    FinanceTable,
    PolygonData
  },
  data: function() {
    return { 
      records: [], // an array of object. each object represents a data points.
    }
  }, 
  methods: {
    onPolygonData: function(company, financial) {
      this.records = financial;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
