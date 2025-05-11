import { LoadFacebookUserApi, } from '@/data/contracts/api/facebook'
import { AuthenticatioError } from "@/domain/errors";
import { FacebookAuthentication } from "@/domain/features";

class FacebookAuthenticationService {

  constructor(private readonly loadFacebookUserApi:LoadFacebookUserApi){
    this.loadFacebookUserApi = loadFacebookUserApi;
  }

  async perform(params:FacebookAuthentication.Params): Promise<FacebookAuthentication.Result>{
    await this.loadFacebookUserApi.loadUserByToken(params);
    return new AuthenticatioError();
}}


class LoadFacebookUserByTokenApiSpy implements LoadFacebookUserApi{
  token?:string
  result:undefined;
  async loadUserByToken(params: LoadFacebookUserApi.Params): Promise<void> {
    await new Promise((resolve) => resolve({}));
    this.token = params.token;
  }

}


describe('FacebookAuthenticationService', () => {
  test('Should calls loadUserFacebookApi with correct params', async () => {
    const loadFacebookUserByTokenApiSpy = new LoadFacebookUserByTokenApiSpy();
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApiSpy)
    await sut.perform({ token: 'any_token'})
    expect(loadFacebookUserByTokenApiSpy.token).toBe('any_token')
  });

  test('Should returns AuthenticationError when loadUserFacebookApi returns undefined', async() => {
      const loadFacebookUserByTokenApi = new LoadFacebookUserByTokenApiSpy();
      loadFacebookUserByTokenApi.result = undefined;
      const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
      const authResult = await sut.perform({ token: 'any_token'});
      expect(authResult).toEqual(new AuthenticatioError());
  })
});
