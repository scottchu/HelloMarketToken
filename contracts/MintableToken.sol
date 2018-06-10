pragma solidity ^0.4.24;

import "./BasicToken.sol";
import "./Ownable.sol";

contract MintableToken is BasicToken, Ownable {
  event Mint(address indexed to, uint256 amount);

  constructor(uint256 _initialSupply)
    BasicToken(_initialSupply)
    public {}

  function mint(address _to, uint256 _amount) onlyOwner public {
    _totalSupply = _totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);

    emit Mint(_to, _amount);
    emit Transfer(address(0), _to, _amount);
  }
}