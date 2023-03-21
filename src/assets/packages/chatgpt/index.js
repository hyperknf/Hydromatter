const openai = require("openai")

module.exports = class ChatGPT {
  constructor(id) {
    this.client = new openai.OpenAIApi(new openai.Configuration({
      apiKey: process.env.openai_token,
    }))
  }
  
  async new(model, prompt) {
    if (model == "text-davinci-003") {
      const completion = await this.client.createCompletion(
        {
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0
        }
      )
      return completion.data.choices[0].text
    } else if (model == "gpt-3.5-turbo") {
      const completion = await this.client.createChatCompletion(
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 2048
        }
      )
      return completion.data.choices[0].message.content
    } else throw new Error("Please input a valid model")
  }
}