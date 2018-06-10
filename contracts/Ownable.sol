pragma solidity ^0.4.24;

contract Ownable {
  address public owner;

  event OwnershipTransferred(address indexed from, address indexed to);

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address _to) public onlyOwner {
    require(_to != address(0));

    emit OwnershipTransferred(owner, _to);

    owner = _to;
  }
}