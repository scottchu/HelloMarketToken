const revert = new RegExp("revert$")

module.exports = async (promise) => {
  try {
    await promise
    assert.fail("")
  } catch (error) {
    return revert.test(error.message)
  }
}