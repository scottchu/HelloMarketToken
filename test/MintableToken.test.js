const shouldRevert = require("./helpers/shouldRevert")

const MintableToken = artifacts.require("MintableToken")

contract("MintableToken", (accounts) => {

  const alice = accounts[0]
  const bob = accounts[1]

  const name = "Mintable"
  const symbol = "M&M"
  const initialSupply = 99;

  describe("mint", () => {
    it("prevents bob (non-owner) from mint", async () => {
      const token = await MintableToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const mintSupply = 100
      const q = token.mint(alice, mintSupply, { from: bob })

      assert(await shouldRevert(q),
        "bob should not be able to mint new tokens")
    })

    it("adds newly minted tokens to total supply", async () => {
      const token = await MintableToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const mintSupply = 100
      await token.mint(alice, mintSupply, { from: alice })

      const totalSupply = await token.totalSupply()

      assert(totalSupply == (initialSupply + mintSupply),
        "total supply should increase by new minted token amount")
    })

    it("adds newly minted token to the recipient", async () => {
      const token = await MintableToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const mintSupply = 100
      await token.mint(bob, mintSupply, { from: alice })

      const balance = await token.balanceOf(bob)

      assert(balance == mintSupply,
        "bob should receive new minted tokens")
    })

    it("emits a Mint event", async () => {
      const token = await MintableToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const mintSupply = 100
      const { logs } = await token.mint(bob, mintSupply, { from: alice })

      const log = logs[0]

      assert(log.event == "Mint",
        "log event should be Mint")

      assert(log.args.to == bob,
        "log should record bob as the the recipient")

      assert(log.args.amount == mintSupply,
        "log should record the amount")
    })

    it("emits a Transfer event", async () => {
      const token = await MintableToken.new(
        name,
        symbol,
        initialSupply,
        { from: alice }
      )

      const mintSupply = 100
      const { logs } = await token.mint(bob, mintSupply, { from: alice })

      const log = logs[1]

      assert(log.event == "Transfer",
        "log event should be Transfer")

      assert(log.args.from == 0,
        "log should record Address<0> as the sender")

      assert(log.args.to == bob,
        "log should record bob as the the recipient")

      assert(log.args.value == mintSupply,
        "log should record the transfer value")
    })
  })
})