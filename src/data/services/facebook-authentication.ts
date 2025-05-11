import { LoadFacebookUserApi} from '@/data/contracts/api'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticatioError } from '@/domain/errors'
import { LoadUserAccountRepository } from '@/data/contracts/repositories/user-account';

export class FacebookAuthenticationService {

  constructor(private readonly loadFacebookUserApi:LoadFacebookUserApi, private readonly loadUserAccountRepository:LoadUserAccountRepository){
    this.loadFacebookUserApi = loadFacebookUserApi;
    this.loadUserAccountRepository = loadUserAccountRepository;
  }

  async perform(params:FacebookAuthentication.Params): Promise<FacebookAuthentication.Result>{
    const facebookData = await this.loadFacebookUserApi.loadUser(params);
    if(facebookData !== undefined){
      await this.loadUserAccountRepository.load({ email: facebookData.email});
    }
    return new AuthenticatioError();
}}
