const User = require('../models/user.model.js')
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');


class UserService {


  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
}


async refresh(refreshToken ) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
  }
      const userData = tokenService.validateRefreshToken(refreshToken);// id and roles, on second refresh return { id: '6', roles: '3', iat: 1679050853, exp: 1681642853 }
      const tokenFromDb = await tokenService.findToken(refreshToken);//  _id, user ObjectId and refreshToken

      console.log(userData)
      console.log(tokenFromDb)
      if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }
    const user = await User.findById(userData.id);
    const tokens = tokenService.generateTokens(...user.id, user.roles);

    await tokenService.saveToken(user.id, tokens.refreshToken);

     return {...tokens, user};
}
}


module.exports = new UserService()