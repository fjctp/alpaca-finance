<template>
  <div id="app">
    <input v-model="ticker" placeholder="Symbol">
    <button v-on:click="onSubmit()">Submit</button>

    <FinanceTable v-bind:rows="records"/>
  </div>
</template>

<script>
import axios from 'axios'
import FinanceTable from './components/FinanceTable.vue'
import secret from './config/secret.json';

// axios default settings
axios.defaults.baseURL = 'https://api.polygon.io';
axios.defaults.params = secret;

// getFinancialData(ticker) gets financial data from server
async function getFinancialData(ticker) {
  const response = await axios.get(`/v2/reference/financials/${ticker}`);
  if (response.status == 200) {
    return response.data.results;
  }
  return [];
}

// Vue app main
export default {
  name: 'App',
  components: {
    FinanceTable
  },
  data: function() {
    return { 
      records: [], // an array of object. each object represents a data points.
      ticker: '',
    }
  }, 
  methods: {
    onSubmit: async function() {
      this.records = []; // reset records before submits
      if (this.ticker != '')
        this.records = await getFinancialData(this.ticker);
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
