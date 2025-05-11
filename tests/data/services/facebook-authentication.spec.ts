import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/api'
import { AuthenticatioError } from "@/domain/errors";
import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: FacebookAuthenticationService;
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
}


const makeSut = ():SutTypes =>{
  const loadFacebookUserApi =  mock<LoadFacebookUserApi>();
  const sut = new FacebookAuthenticationService(loadFacebookUserApi)
  return {
    sut,
    loadFacebookUserApi,
  }
}

describe('FacebookAuthenticationService', () => {
  test('Should calls loadUserFacebookApi with correct params', async () => {
    const { sut, loadFacebookUserApi } = makeSut()
    await sut.perform({ token: 'any_token'})
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token'})
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

    test('Should calll loadUserFacebookApi only once', async() => {
      const { sut, loadFacebookUserApi } = makeSut()
      await sut.perform({token: 'any_token'});
      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token'});
      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

  test('Should returns AuthenticationError when loadUserFacebookApi returns undefined', async() => {
      const { sut } = makeSut();
      const authResult = await sut.perform({ token: 'any_token'});
      expect(authResult).toEqual(new AuthenticatioError());
  })


});
