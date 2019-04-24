var AviumToken = artifacts.require("./AviumToken.sol");
var AviumTokenSale = artifacts.require("./AviumTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(AviumToken, 1000000).then(function(){
    // Token price is 0.001 Ether 1000000000000000
    var tokenPrice = 1000000000000000
    return deployer.deploy(AviumTokenSale, AviumToken.address, tokenPrice)
  });
};
