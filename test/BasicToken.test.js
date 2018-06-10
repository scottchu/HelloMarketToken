const shouldRevert = require("./helpers/shouldRevert")

const BasicToken = artifacts.require("BasicToken")

contract("BasicToken", (accounts) => {

  const alice = accounts[0]
  const bob = accounts[1]

  it("sets totalSupply to initialSupply on start", async () => {
    const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)
      const totalSupply = await basicToken.totalSupply()

      assert(totalSupply == initialSupply,
        "total supply should equals to initial supply")
  })

  it("gives initialSupply to message sender on start", async () => {
    const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply, { from: alice })
      const balance = await basicToken.balances(alice)

      assert(balance == initialSupply,
        "alice should have all initial supply")
  })

  describe("totalSupply", () => {
    it("returns the total amount of tokens", async () => {
      const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)
      const totalSupply = await basicToken.totalSupply()

      assert(totalSupply == initialSupply)
    })
  })

  describe("balanceOf", () => {
    it("returns 0 for any account by default", async () => {
      const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)
      const balance = await basicToken.balanceOf(bob)

      assert(balance == 0)
    })

    it("returns the balance when account has some token", async () => {
      const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)
      const balance = await basicToken.balanceOf(alice)

      assert(balance == initialSupply)
    })
  })

  describe("transfer", () => {
    it("prevents transfer to Address<0>", async () => {
      const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)

      const address = 0
      const amount = 49
      const q = basicToken.transfer(address, amount, { from: alice })

      assert(await shouldRevert(q),
        "transfer to Address<0> should be prohibited")
    })

    it("prevents transfer when sender does not have enough balance", async () => {
      const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)

      const amount = 101
      const q = basicToken.transfer(bob, amount, { from: alice })

      assert(await shouldRevert(q),
        "over spend should be prohibited")
    })

    it("transfers the requested amount when sender has enough balance", async () => {
      const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)

      const amount = 45
      await basicToken.transfer(bob, amount, { from: alice })

      const balanceOfAlice = await basicToken.balances(alice)
      const balanceOfBob = await basicToken.balances(bob)

      assert(balanceOfAlice == (initialSupply - amount),
        "alice's balance should deduct the transfer amount")

      assert(balanceOfBob == amount,
        "bob's balance should add the transfer amount")
    })

    it("emits Transfer event", async () => {
      const initialSupply = 100
      const basicToken = await BasicToken.new(initialSupply)

      const amount = 45
      const { logs } = await basicToken.transfer(bob, amount, { from: alice })

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