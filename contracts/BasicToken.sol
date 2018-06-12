pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./Token.sol";

contract BasicToken is Token {
  using SafeMath for uint256;

  // Token name
  string internal name_;

  // Token symbol
  string internal symbol_;

  // Token total supply in decimals
  uint256 internal totalSupply_;

  // Account balances
  mapping(address => uint256) internal balances_;

  constructor(
    string _name,
    string _symbol,
    uint256 _initialSupply
  ) public {
    name_ = _name;
    symbol_ = _symbol;
    totalSupply_ = _initialSupply;
    balances_[msg.sender] = _initialSupply;

    emit Transfer(address(0), msg.sender, _initialSupply);
  }

  function name() public view returns (string) {
    return name_;
  }

  function symbol() public view returns (string) {
    return symbol_;
  }

  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return balances_[_owner];
  }

  function transfer(address _to, uint256 _value) public {
    require(_to != address(0));
    require(_to != msg.sender);
    require(_value <= balances_[msg.sender]);

    balances_[msg.sender] = balances_[msg.sender].sub(_value);
    balances_[_to] = balances_[_to].add(_value);

    emit Transfer(msg.sender, _to, _value);
  }
}