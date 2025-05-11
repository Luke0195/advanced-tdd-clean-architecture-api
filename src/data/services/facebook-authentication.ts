import { CreateFacebookAccountRepository } from './../contracts/repositories/user-account';
import { LoadFacebookUserApi} from '@/data/contracts/api'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticatioError } from '@/domain/errors'
import { LoadUserAccountRepository } from '@/data/contracts/repositories/user-account';

export class FacebookAuthenticationService {

  constructor(
    private readonly facebookApi:LoadFacebookUserApi,
    private readonly userAccountRepo:LoadUserAccountRepository & CreateFacebookAccountRepository,
  ){
    this.facebookApi = facebookApi;
    this.userAccountRepo = userAccountRepo;
  }

  async perform(params:FacebookAuthentication.Params): Promise<FacebookAuthentication.Result>{
    const facebookData = await this.facebookApi.loadUser(params);
    if(facebookData !== undefined){
      const facebookAccount = await this.userAccountRepo.load({ email: facebookData.email});
      await this.userAccountRepo.createFromFacebook(facebookData);
    }
    return new AuthenticatioError();
}}
