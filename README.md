# alpaca-finance
Display stock's financial data using data provided by polygon.io

## Configuration
1. Make a copy of `src/config/secret.json.sample` and save it as `secret.json` in the same folder
2. Update API key in the file

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## To-Do

* add option for seach range. Example:
  *  period (quarter, term, annual)
  *  year
  *  max item
*  format dollar as 10B, 1M, 19K (no need to show full number)
*  plot selected column
*  compare with other company
