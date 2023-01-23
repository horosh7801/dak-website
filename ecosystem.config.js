module.exports = {
  apps : [{
    name   : "currencyRates",
    script : "lib/scripts/cron.js"
  },{
    name   : "dev",
    script : "yarn dev"
  }]
}
