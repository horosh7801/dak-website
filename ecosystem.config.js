module.exports = {
  apps : [{
    name   : "currencyRates",
    script : "lib/scripts/cron.mjs"
  },{
    name   : "dev",
    script : "yarn dev"
  },{
    name   : "strapi",
    script : "cd backend; yarn start"
  },{
    name   : "start",
    script : "yarn start"
  }]
}
