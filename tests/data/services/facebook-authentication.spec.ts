
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/api'
import { LoadUserAccountRepository } from '@/data/contracts/repositories'
import { AuthenticatioError } from "@/domain/errors";
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let sut:FacebookAuthenticationService;
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>;

  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock();
    loadUserAccountRepository = mock();
    sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserAccountRepository);
    loadFacebookUserApi.loadUser.mockResolvedValue(( {
      name: 'any_facebook_name',
      email: 'any_facebook_email@mail.com',
      facebookId: 'any_facebook_id'
      }
    ))
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
      const authResult = await sut.perform({ token });
      expect(authResult).toEqual(new AuthenticatioError());
  })

  test('Should calls LoadUserByEmailRepository when loadFacebookUserApi returns data', async() => {
      await sut.perform({token});
      expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: 'any_facebook_email@mail.com'});
      expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1);
    });

});

