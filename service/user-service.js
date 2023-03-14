const User = require('../models/user.model.js')
const tokenService = require('./token-service');


class UserService {


  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
}


async refresh(refreshToken) {
    if (!refreshToken) {
      return res.status(400).json({message:"Token not found"})
  }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
        return res.status(400).json({message:"Token or user dara is not valid"});
    }
    const user = await User.findById(userData._id);
    const tokens = tokenService.generateTokens(...user._id, user.roles);

    await tokenService.saveToken(user._id, tokens.refreshToken);

     return res.json(...tokens, user);
}
}


module.exports = new UserService()