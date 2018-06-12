const shouldRevert = require("./helpers/shouldRevert")

const BasicToken = artifacts.require("BasicToken")

contract("BasicToken", (accounts) => {

  const alice = accounts[0]
  const bob = accounts[1]

  const name = "TestToken"
  const symbol = "TT"
  const initialSupply = 100;

  it("returns name, symbol, decimals, and totalSupply from getters", async () => {
    const token = await BasicToken.new(
      name,
      symbol,
      initialSupply
    )

    assert((await token.name()) == name,
      "name should be the same")

    assert((await token.symbol()) == symbol,
      "symbol should be the same")

    assert((await token.totalSupply()) == initialSupply,
      "totalSupply should be the same")
  })

  it("gives initialSupply to message sender on start", async () => {
    const token = await BasicToken.new(
      name,
      symbol,
      initialSupply,
      { from: alice }
    )

    const balance = await token.balanceOf(alice)

    assert(balance == initialSupply,
      "alice should have all initial supply")
  })

  describe("balanceOf", () => {
    it(" returns 0 by default", async () => {
      const token = await BasicToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const balance = await token.balanceOf(bob)

      assert(balance == 0,
        "bob should have balance 0")
    })

    it("returns the balance when account has some token", async () => {
      const decimals = 18
      const initialSupply = 99

      const token = await BasicToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const balance = await token.balanceOf(alice)

      assert(balance == initialSupply,
        "alice should have all 99 tokens")
    })
  })

  describe("transfer", () => {
    it("prevents transfer to Address<0>", async () => {
      const token = await BasicToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const address = 0
      const amount = 1
      const q = token.transfer(address, amount, { from: alice })

      assert(await shouldRevert(q),
        "transfer to Address<0> should be prohibited")
    })

    it("prevents transfer to sender self", async () => {
      const token = await BasicToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const amount = 10
      const q = token.transfer(alice, amount, { from: alice })

      assert(await shouldRevert(q),
        "wasting energy is prohibited")
    })

    it("prevents transfer when sender does not have enough balance", async () => {
      const token = await BasicToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const amount = initialSupply + 1
      const q = token.transfer(bob, amount, { from: alice })

      assert(await shouldRevert(q),
        "over spend should be prohibited")
    })

    it("transfers the requested amount when sender has enough balance", async () => {
      const token = await BasicToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const amount = 45
      await token.transfer(bob, amount, { from: alice })

      const balanceOfAlice = await token.balanceOf(alice)
      const balanceOfBob = await token.balanceOf(bob)

      assert(balanceOfAlice == (initialSupply - amount),
        "alice's balance should deduct the transfer amount")

      assert(balanceOfBob == amount,
        "bob's balance should add the transfer amount")
    })


    it("emits Transfer event", async () => {
      const token = await BasicToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const amount = 45
      const { logs } = await token.transfer(bob, amount, { from: alice })

      const log = logs[0]

      assert(log.event == "Transfer",
        "log event should be Transfer")

      assert(log.args.from == alice,
        "alice should be the sender")

      assert(log.args.to == bob,
        "bob should be the recipient")

      assert(log.args.value == amount,
        "transfer amount should be the same")

    })
  })
})