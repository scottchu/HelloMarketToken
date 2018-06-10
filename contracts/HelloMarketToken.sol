pragma solidity ^0.4.24;

import "./MintableToken.sol";

contract HelloMarketToken is MintableToken {

  uint256 constant cost = 1;

  string public message;

  uint256 public ledger;

  event Talk(address from, string message);

  constructor(uint256 _initialSupply)
    MintableToken(_initialSupply)
    public {}

  function talk(string _message) public {
    require(balances[msg.sender] >= cost);

    balances[msg.sender] = balances[msg.sender].sub(cost);
    ledger = ledger.add(cost);

    message = _message;

    emit Talk(msg.sender, _message);
  }
}