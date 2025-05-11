import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/api'
import { AuthenticatioError } from "@/domain/errors";
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let sut:FacebookAuthenticationService;
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock();
    sut = new FacebookAuthenticationService(loadFacebookUserApi);
  })

  test('Should calls loadUserFacebookApi with correct params', async () => {
    await sut.perform({ token})
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token})
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

    test('Should calll loadUserFacebookApi only once', async() => {
      await sut.perform({token});
      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token});
      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

  test('Should returns AuthenticationError when loadUserFacebookApi returns undefined', async() => {
      const authResult = await sut.perform({ token});
      expect(authResult).toEqual(new AuthenticatioError());
  })


});
