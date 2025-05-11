
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/api'
import { LoadUserAccountRepository, CreateFacebookAccountRepository} from '@/data/contracts/repositories'
import { AuthenticatioError } from "@/domain/errors";
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let sut:FacebookAuthenticationService;
  let userAccountRepository: MockProxy<CreateFacebookAccountRepository & LoadUserAccountRepository>
  let facebookApi: MockProxy<LoadFacebookUserApi>;


  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock();
    userAccountRepository = mock();
    sut = new FacebookAuthenticationService(facebookApi, userAccountRepository);
    facebookApi.loadUser.mockResolvedValue(( {
      name: 'any_facebook_name',
      email: 'any_facebook_email@mail.com',
      facebookId: 'any_facebook_id'
      }
    ))
  })

  test('Should calls loadUserFacebookApi with correct params', async () => {
    await sut.perform({ token})
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token})
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1);
  });

    test('Should calll loadUserFacebookApi only once', async() => {
      await sut.perform({token});
      expect(facebookApi.loadUser).toHaveBeenCalledWith({ token});
      expect(facebookApi.loadUser).toHaveBeenCalledTimes(1);
  });

  test('Should returns AuthenticationError when loadUserFacebookApi returns undefined', async() => {
      const authResult = await sut.perform({ token });
      expect(authResult).toEqual(new AuthenticatioError());
  })

  test('Should calls LoadUserByEmailRepository when loadFacebookUserApi returns data', async() => {
      await sut.perform({token});
      expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_facebook_email@mail.com'});
      expect(userAccountRepository.load).toHaveBeenCalledTimes(1);
    });

  test('should call CreateUserAccountRepository when LoadUserAccountReturns undefined', async() => {
    userAccountRepository.load.mockResolvedValueOnce(undefined)
    await sut.perform({ token });
    expect(userAccountRepository.createFromFacebook)
    .toHaveBeenCalledWith({ name: 'any_facebook_name', email: 'any_facebook_email@mail.com',
      facebookId: 'any_facebook_id'})
    expect(userAccountRepository.createFromFacebook).toHaveBeenCalledTimes(1)
    })
});

