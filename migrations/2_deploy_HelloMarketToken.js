var HelloMarketToken = artifacts.require("./HelloMarketToken.sol")

module.exports = function(deployer) {
  deployer.deploy(HelloMarketToken, [1000])
}
