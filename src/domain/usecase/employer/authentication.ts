export interface Authentication {
  auth (authenticationParams: AuthenticationParams): Promise<AuthenticationResult>
}

export interface AuthenticationParams {
  employerId: string
  password: string
}

export interface AuthenticationResult {
  accessToken: string
  name: string
}
