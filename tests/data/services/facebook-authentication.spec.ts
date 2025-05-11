import { FacebookAuthentication } from "@/domain/features";

class FacebookAuthenticationService {

  constructor(private readonly loadFacebookUserApi:LoadFacebookUserApi){
    this.loadFacebookUserApi = loadFacebookUserApi;
  }
  async perform(params:FacebookAuthentication.Params): Promise<void>{
    this.loadFacebookUserApi.loadUserByToken(params);
  }
}




interface LoadFacebookUserApi{
  loadUserByToken(token: LoadFacebookUserApi.Params):Promise<void>
}

export namespace LoadFacebookUserApi{
  export type Params = {
    token: string;
  }
}


class LoadFacebookUserByTokenApiSpy implements LoadFacebookUserApi{

  token?:string
  async loadUserByToken(params: LoadFacebookUserApi.Params): Promise<void> {
    await new Promise((resolve) => resolve({}));
    this.token = params.token;

  }

}


describe('FacebookAuthenticationService', () => {
  test('Should calls loadUserFacebookApi with correct params', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserByTokenApiSpy();
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
    await sut.perform({ token: 'any_token'})
    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  });
});
