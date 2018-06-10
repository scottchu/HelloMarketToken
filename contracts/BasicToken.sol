pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./Token.sol";

contract BasicToken is Token {
  using SafeMath for uint256;

  mapping(address => uint256) public balances;

  uint256 _totalSupply;

  constructor(uint256 _initialSupply) public {
    _totalSupply = _initialSupply;
    balances[msg.sender] = _initialSupply;
  }

  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  function transfer(address _to, uint256 _value) public {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);

    emit Transfer(msg.sender, _to, -_value);
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }
}