pragma solidity ^0.4.24;

contract Token {
  event Transfer(address indexed from, address indexed to, uint256 value);

  function totalSupply() public view returns (uint256);

  function transfer(address _to, uint256 _value) public;

  function balanceOf(address _owner) public view returns (uint256);
}