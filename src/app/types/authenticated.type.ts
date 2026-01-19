export interface RefreshTokenResponse {
  token_type: 'Bearer';
  issued_at: string;
  expires_at: string;
  access_expires_in: number;
  access_token: string;
  id_token?: string;
}
