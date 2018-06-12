pragma solidity ^0.4.24;

contract Ownable {
  address internal owner_;

  event OwnershipTransferred(address indexed from, address indexed to);

  constructor() public {
    owner_ = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner_);
    _;
  }

  function owner() public view returns (address) {
    return owner_;
  }

  function transferOwnership(address _to) public onlyOwner {
    require(_to != address(0));
    require(_to != owner_);

    emit OwnershipTransferred(owner_, _to);

    owner_ = _to;
  }
}