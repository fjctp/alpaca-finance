<template>
  <div class="financeTable">
     <vue-good-table
      :columns="columns"
      :rows="rows"/>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'FinanceTable',
  components: {
    VueGoodTable,
  },
  props: {
    rows: Array,
  },
  watch: {
    rows: function(newRows) {
      // update period's dropdown list options when this.rows changes
      var L = [];
      if (newRows.length > 0) {
        L = [...new Set(newRows.map(item => item.period))];
      }

      this.columns[1].filterOptions.filterDropdownItems = L;
    },
  },
  methods: {
    formatBigNumber: function(value) {
      const decimalSymbol = ['K', 'M', 'B', 'T'];
      
      if (value < 1000)
        return value;
      
      for (var i=0; i<decimalSymbol.length; i++) {
        var tmp = Math.round(value / 1000);
        if (tmp < 1000)
          return tmp + decimalSymbol[i];
        value = tmp;
      }
    },
    formatDollar: function(value) {
      return '$' + this.formatBigNumber(value);
    }
  },
  data: function() {
    return {
      columns: [
        {
          label: 'Symbol',
          field: 'ticker',
          type: 'string',
        },
        {
          label: 'Period',
          field: 'period',
          type: 'string',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'All', // placeholder for filter input
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: 'enter', //only trigger on enter not on keyup 
          },
        },
        {
          label: 'Year',
          field: 'calendarDate',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'yyyy',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'All', // placeholder for filter input
          },
        },
        {
          label: 'Month',
          field: 'calendarDate',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM',
        },
        {
          label: 'CashFlow',
          field: 'freeCashFlow',
          type: 'number',
          formatFn: this.formatDollar,
        },
        {
          label: 'Debt/Equity',
          field: 'debtToEquityRatio',
          type: 'number',
        },
        {
          label: 'P/E',
          field: 'priceToEarningsRatio',
          type: 'number',
        },
        {
          label: 'Revenues',
          field: 'revenuesUSD',
          type: 'number',
          formatFn: this.formatDollar,
        },
        {
          label: 'PayoutRatio',
          field: 'payoutRatio',
          type: 'percentage',
        },
        {
          label: 'Yield',
          field: 'dividendYield',
          type: 'percentage',
        },
        {
          label: 'MarketCap',
          field: 'marketCapitalization',
          type: 'number',
          formatFn: this.formatBigNumber,
        },
        {
          label: 'GrossMargin',
          field: 'grossMargin',
          type: 'percentage',
        },
        {
          label: 'TotalDebt',
          field: 'debtUSD',
          type: 'number',
          formatFn: this.formatDollar,
        },
      ],
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
