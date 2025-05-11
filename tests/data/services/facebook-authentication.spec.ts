import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi, } from '@/data/contracts/api'
import { AuthenticatioError } from "@/domain/errors";
import { mock } from 'jest-mock-extended';


describe('FacebookAuthenticationService', () => {
  test('Should calls loadUserFacebookApi with correct params', async () => {
    const loadFacebookUserApi =  mock<LoadFacebookUserApi>();
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    await sut.perform({ token: 'any_token'})
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token'})
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

    test('Should calll loadUserFacebookApi only once', async() => {
      const loadUserFacebookApi = mock<LoadFacebookUserApi>();
      const sut = new FacebookAuthenticationService(loadUserFacebookApi);
      await sut.perform({token: 'any_token'});
      expect(loadUserFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token'});
      expect(loadUserFacebookApi.loadUser).toHaveBeenCalledTimes(1);
  });

  test('Should returns AuthenticationError when loadUserFacebookApi returns undefined', async() => {
      const loadFacebookUserApi =mock<LoadFacebookUserApi>();
      const sut = new FacebookAuthenticationService(loadFacebookUserApi)
      const authResult = await sut.perform({ token: 'any_token'});
      expect(authResult).toEqual(new AuthenticatioError());
  })


});
