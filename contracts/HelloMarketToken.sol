pragma solidity ^0.4.24;

import "./MintableToken.sol";

contract HelloMarketToken is MintableToken {

  uint256 constant cost_ = 1;

  string public message_;

  event Talk(address from, string message);

  constructor(uint256 _initialSupply)
    MintableToken("BlahBlahBlah", "Blah", _initialSupply)
    public {}

  function cost() public pure returns (uint256) {
    return cost_;
  }

  function message() public view returns (string) {
    return message_;
  }

  function ledger() public view returns (uint256) {
    return balances_[this];
  }

  function talk(string _message) public {
    require(balances_[msg.sender] >= cost_);

    balances_[msg.sender] = balances_[msg.sender].sub(cost_);
    balances_[this] = balances_[this].add(cost_);

    message_ = _message;

    emit Talk(msg.sender, _message);
  }
}