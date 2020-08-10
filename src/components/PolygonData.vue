<template>
  <div class="PolygonData">
     <vue-instant
      name="searchBar"
      placeholder="Symbol"
      type="google"
      v-model="queryStr"
      :suggestOnAllWords="true"
      :suggestions="suggestions"
      suggestion-attribute="Symbol"
      @input="changed"
      @click-button="submit">
    </vue-instant>
  </div>
</template>

<script>
import axios from 'axios'
import csvtojson from 'csvtojson/v2'

import secret from '../config/secret.json'

// axios default settings
const defaultAxios = axios.create({
  baseURL: '',

});
const polygon = axios.create({
 baseURL: 'https://api.polygon.io',
 params: secret
});

export default {
  name: 'PolygonData',
  computed: {
    finData: function() {
      return this.results.financial;
    },
    comData: function() {
      return this.results.company;
    },
  },
  mounted: async function() {
    this.allTickers = await getAllTicks();
  },
  methods: {
    submit: async function() {
      this.results.financial = [];
      this.results.company = {};
      this.$emit('data', this.comData, this.finData);

      this.results.financial = await getFinancialData(this.queryStr, 10, 'Y');
      this.results.company = await getCompanyData(this.queryStr);

      this.$emit('data', this.comData, this.finData);
    },
    changed: async function() {
      const that = this;
      that.suggestions = [];
      this.allTickers.forEach((ticker) => {
        if (ticker.Symbol.startsWith(this.queryStr.toUpperCase())) {
              that.suggestions.push(ticker);
            }
      });
    },
  },
  data: function() {
    return {
      queryStr: '',
      allTickers: [],
      suggestions: [],
      results: {
        financial: [],
        company: {}
      }
    }
  },
}


// Helper functions
// getAllTicks gets a company list on nasdaq, nyse, and amex.
async function getAllTicks() {
  // https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download
  // https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nyse&render=download
  // https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=amex&render=download

  const exchanges = ["nasdaq", "nyse", "amex"];
  var tickers = [];

  for(var i=0; i<exchanges.length; i++) {
    var response = await defaultAxios.get("/" + exchanges[i] + ".csv");
    var dataJson = await csvtojson().fromString(response.data);
    dataJson.forEach((x) => {tickers.push(x)});
  }
  var tickersSorted = tickers.sort((a, b) => {
    return ('' + a.Symbol).localeCompare(b.Symbol);
  });
  return tickersSorted.reverse();
}

// getFinancialData(ticker, limit, type) gets financial data from server
async function getFinancialData(ticker, limit, type) {
  const response = await polygon.get(`/v2/reference/financials/${ticker}?limit=${limit}&type=${type}`)
                            .catch((err) => {
                              if (err.response)
                                alert("Symbol does not exist");
                              else
                                alert("Server Error")
                              return [];
                            });
  return response.data.results;
}

// getCompanyData(ticker) gets company data from server
async function getCompanyData(ticker) {
  const response = await polygon.get(`/v1/meta/symbols/${ticker}/company`)
                            .catch((err) => {
                              if (err.response)
                                alert("Does not exist");
                              else
                                alert("Server Error")
                              return {};
                            });
  return response.data;
}

</script>
