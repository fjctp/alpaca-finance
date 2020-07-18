<template>
  <div id="app">
    <input type="text" v-model="ticker" placeholder="Symbol">
    <input type="number" v-model="limit" placeholder="Limit">
    <select v-model="type" id="type">
      <option value="Q">Quarter</option>
      <option value="T">Term</option>
      <option value="Y">Year</option>
    </select>
    <button v-on:click="onSubmit()">Submit</button>
    <br/>
    <br/>
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

// getFinancialData(ticker, limit, type) gets financial data from server
async function getFinancialData(ticker, limit, type) {
  const response = await axios.get(`/v2/reference/financials/${ticker}?limit=${limit}&type=${type}`);
  if (response.status == 200) {
    return response.data.results;
  }
  return [];
}

// getCompanyData(ticker) gets company data from server
async function getCompanyData(ticker) {
  const response = await axios.get(`/v1/meta/symbols/${ticker}/company`);
  if (response.status == 200) {
    return response.data;
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
      company: {},
      ticker: '',
      limit: 5,
      type: 'Y',
    }
  }, 
  methods: {
    onSubmit: async function() {
      this.records = []; // reset records before submits
      if (this.ticker != '') {
        this.ticker = this.ticker.toUpperCase();
        this.company = await getCompanyData(this.ticker);
        this.records = await getFinancialData(this.ticker, this.limit, this.type);
      }
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
