export interface LoadFacebookUserApi{
  loadUserByToken(token: LoadFacebookUserApi.Params):Promise<void>
}

export namespace LoadFacebookUserApi{
  export type Params = {
    token: string;
  }
}

