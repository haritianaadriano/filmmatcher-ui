import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly USER_ID_KEY = 'connected_user_id';

  /** TODO: PRIVATE: store connected user id */
  storeConnectedUserId(userId: string): void {
    localStorage.setItem(this.USER_ID_KEY, userId);
  }

  /** PUBLIC: get connected user id */
  getConnectedUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  /** Optional: clear on logout */
  clearConnectedUser(): void {
    localStorage.removeItem(this.USER_ID_KEY);
  }
}
