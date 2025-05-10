import { AuthenticatioError } from "@/domain/errors";
import { FacebookAuthentication } from "@/domain/features";
import { AccessToken } from "@/domain/models";

class FacebookAuthenticationService implements FacebookAuthentication {

  constructor(private readonly loadFacebookUserApi:LoadFacebookUserApi){
    this.loadFacebookUserApi = loadFacebookUserApi;
  }

  async perform(params: FacebookAuthentication.Params): Promise<AccessToken | AuthenticatioError>{
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticatioError();
  }


}

interface LoadFacebookUserApi{
   loadUser(params:LoadFacebookUserByTokenApi.Params):Promise<void>;
}

namespace LoadFacebookUserByTokenApi{
  export type Params ={
    token: string
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi{
  token?:string

  async loadUser(params: LoadFacebookUserByTokenApi.Params): Promise<void> {
    this.token = params.token;
    await new Promise((resolve) => resolve(console.log('teste')))
  }



}

describe('FacebookAuthenticationService', () => {
  test('Should calls loadFacebookUserApi with correct value', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiSpy();
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi);
    await sut.perform({ token: 'any_token'})
    expect(loadFacebookUserByTokenApi.token).toEqual('any_token');
  })
})
