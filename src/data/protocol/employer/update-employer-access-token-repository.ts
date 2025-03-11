export interface UpdateEmployerAccessTokenRepository {
  updateAccessToken(id: string, accessToken: string): Promise<boolean>
}
