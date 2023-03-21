const words = require("./words.js")

module.exports = string => {
  if (typeof string != "string") throw new Error("Input was not a string")
  string = ` ${string.toLowerCase()} `
  let tagged = false
  for (let i = 0; i <= words.length; i++) {
    if (string.includes(`${words[i]} `) || string.includes(` ${words[i]}`)) tagged = true
  }
  return tagged
}