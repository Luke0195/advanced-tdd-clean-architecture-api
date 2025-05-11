import { LoadFacebookUserApi} from '@/data/contracts/api'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticatioError } from '@/domain/errors'

export class FacebookAuthenticationService {

  constructor(private readonly loadFacebookUserApi:LoadFacebookUserApi){
    this.loadFacebookUserApi = loadFacebookUserApi;
  }

  async perform(params:FacebookAuthentication.Params): Promise<FacebookAuthentication.Result>{
    await this.loadFacebookUserApi.loadUserByToken(params);
    return new AuthenticatioError();
}}
