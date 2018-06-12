const shouldRevert = require("./helpers/shouldRevert")

const HelloMarketToken = artifacts.require("HelloMarketToken")

contract("HelloMarketToken", (accounts) => {

  const alice = accounts[0]
  const bob = accounts[1]

  describe("talk", () => {
    it("prevents sender sending message when sender does not have enough balance", async () => {
      const initialSupply = 0
      const token = await HelloMarketToken.new(initialSupply, { from: alice })

      const q = token.talk("hello world!", { from: alice })

      assert(await shouldRevert(q),
        "alice should not be able to talk")
    })

    it("sets message when sender has enough balance", async () => {
      const initialSupply = 100
      const token = await HelloMarketToken.new(initialSupply, { from: alice })

      const talkMessage = "hello world!"
      await token.talk(talkMessage, { from: alice })

      const lastMessage = await token.message()

      assert(lastMessage == talkMessage,
        "alice should be able to talk")
    })

    it("transfers the cost from sender's account to ledger", async () => {
      const initialSupply = 100
      const token = await HelloMarketToken.new(initialSupply, { from: alice })

      const talkMessage = "hello world!"
      await token.talk(talkMessage, { from: alice })
      await token.talk(talkMessage, { from: alice })

      const balance = await token.balanceOf(alice)

      const ledger = await token.ledger()

      assert(balance == (initialSupply - 2),
        "alice's balance should decrease by the 2")

      assert(ledger == 2,
        "ledger should increase by the 2")
    })

    it("emits a Talk event", async () => {
      const initialSupply = 100
      const token = await HelloMarketToken.new(initialSupply, { from: alice })

      const talkMessage = "hello world!"
      const { logs } = await token.talk(talkMessage, { from: alice })

      const log = logs[0]

      assert(log.event == "Talk",
        "log event should be Talk")

      assert(log.args.from == alice,
        "log should record sender is from alice")

      assert(log.args.message == talkMessage,
        "log should record message")
    })
  })

})