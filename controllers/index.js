const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// GoogleGenerativeAI 配置
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// 模型初始化
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

const history = [];


/**
 * 基于给定的提示生成响应。
 * @param {Object} req - 请求对象.
 * @param {Object} res - 响应对象.
 * @returns {Promise}
 */
const generateResponse = async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
  
      history.push(text);
      console.log(history);
  
      res.send({ response: text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.history = history;
  exports.generateResponse = generateResponse;