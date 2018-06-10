module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 1000000,
      gasPrice: 10000000000
    }
  },
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions : {
      currency: "CAD",
      gasPrice: 21
    }
  }
}
