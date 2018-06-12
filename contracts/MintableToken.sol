pragma solidity ^0.4.24;

import "./BasicToken.sol";
import "./Ownable.sol";

contract MintableToken is BasicToken, Ownable {
  event Mint(address indexed to, uint256 amount);

  constructor(
    string _name,
    string _symbol,
    uint256 _initialSupply
  )
    BasicToken(
      _name,
      _symbol,
      _initialSupply
    )
    public {}

  function mint(address _to, uint256 _amount) onlyOwner public {
    totalSupply_ = totalSupply_.add(_amount);
    balances_[_to] = balances_[_to].add(_amount);

    emit Mint(_to, _amount);
    emit Transfer(address(0), _to, _amount);
  }
}