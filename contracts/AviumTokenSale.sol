pragma solidity ^0.5.0;

import "./AviumToken.sol";

contract AviumTokenSale {
  address admin;
  AviumToken public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  constructor(AviumToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }

  event Sell(address _buyer, uint256 _amount);

  function multiply(uint x, uint y) internal pure returns (uint z) {
      require(y == 0 || (z = x * y) / y == x);
  }

  function buyTokens(uint256 _numberOfTokens) public payable {
    require(msg.value == multiply(_numberOfTokens, tokenPrice));
    //require that there are enough tokens in contracts
    //require that a transfer is successful

    tokensSold += _numberOfTokens;

    emit Sell(msg.sender, _numberOfTokens);
    //emit Sell Event
  }

}
