const db = require("../database");
const {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} = require("../utils");

async function loginController(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) return res.status(400).send("No email provided");
  if (!password) return res.status(400).send("No password provided");
  // make sure the user exists
  try {
    const user = await db.findUserByEmail(email);

    // user dne
    if (!user) return res.status(404).send("User not found");

    // check password
    if (!verifyPassword(password, user.password))
      return res.status(403).send("Invalid password");

    const data = {
      id: user._id,
      username: user.username,
      email,
    };

    // generate tokens
    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    // add refresh token to cache


    return res.json({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

module.exports = {
  loginController,
};
