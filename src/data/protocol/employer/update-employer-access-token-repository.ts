export interface UpdateEmployerAccessTokenRepository {
  updateAccessToken(id: any, accessToken: string): Promise<boolean>
}
