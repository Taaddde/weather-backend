const { build } = require('./app.js')
const app = build({ logger: true })

app.listen(process.env.PORT || 3000, process.env.HOSTNAME || '0.0.0.0', (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.info(`Server ready in port ${address}`)
})
