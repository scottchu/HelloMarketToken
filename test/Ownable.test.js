const shouldRevert = require("./helpers/shouldRevert")

const Ownable = artifacts.require("Ownable")

contract("Ownable", (accounts) => {
  const alice = accounts[0]
  const bob = accounts[1]

  it("sets message sender to owner on deploy", async () => {
    const ownable = await Ownable.new({ from: bob })

    const owner = await ownable.owner()

    assert(owner === bob,
      "Bob should be the owner")
  })

  it("transfers ownership when call by owner", async () => {
    const ownable = await Ownable.new({ from: alice })

    await ownable.transferOwnership(bob)

    let owner = await ownable.owner()

    assert(owner === bob,
      "Bob should be the new owner")
  })

  it("prevents transfer ownership when call by non-owner", async () => {
    const ownable = await Ownable.new({ from: alice })

    const q = ownable.transferOwnership(bob, { from: bob })

    assert(await shouldRevert(q),
      "Bob should not be able to transfer ownership")
  })

  it("prevents transfer ownership to Address<0>", async () => {
    const ownable = await Ownable.new({ from: alice })

    const q = ownable.transferOwnership(0)

    assert(await shouldRevert(q),
      "transfer ownership to Address<0> should be prevented")
  })
})