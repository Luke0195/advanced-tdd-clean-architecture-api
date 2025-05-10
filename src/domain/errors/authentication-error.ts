export class AuthenticatioError extends Error{

  constructor(){
    super(`Authentication failed`)
    this.name = 'AuthenticationError'
  }

}
