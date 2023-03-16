const User = require('../models/user.model.js')
const tokenService = require('./token-service');


class UserService {


  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
}


async refresh(refreshToken,res ) {
    if (!refreshToken) {
      return res.status(400).json({message:"Token not found"})
  }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      console.log(userData)
      console.log(tokenFromDb)
      if (!userData || !tokenFromDb) {
        return res.status(400).json({message:"Token or user dara is not valid"});
    }
    const user = await User.findById(userData.id);
    const tokens = tokenService.generateTokens(...user.id, user.roles);

    await tokenService.saveToken(user.id, tokens.refreshToken);

     return res.json(...tokens, user);
}
}


module.exports = new UserService()