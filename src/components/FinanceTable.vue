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
    rows: Array
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
            filterDropdownItems: ['Q', 'QA', 'T', 'TA', 'Y', 'YA'], // dropdown (with selected values) instead of text input
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
//            filterDropdownItems: ['Q', 'QA', 'T', 'TA', 'Y', 'YA'], // dropdown (with selected values) instead of text input
//            trigger: 'enter', //only trigger on enter not on keyup 
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
