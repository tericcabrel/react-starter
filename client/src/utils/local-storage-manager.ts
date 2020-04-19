import { USER_ACCESS_TOKEN_KEY, USER_DATA_KEY, USER_REFRESH_TOKEN_KEY } from './constants';
import { User } from '../types/model';

/**
 * @class
 */
class LocalStorageManager {
  /**
   * Set a value in the cookie
   *
   * @param {string} cookieName
   * @param {string} cookieValue
   * @param {number} expireDays
   *
   * @return void
   */
  public static setCookie(cookieName: string, cookieValue: string, expireDays: number): void {
    const d: Date = new Date();

    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires: string = `expires=${d.toUTCString()}`;

    document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
  }

  /**
   * Get a cookie
   *
   * @param {string} cookieName
   *
   * @return string|null
   */
  public static getCookie(cookieName: string): string|null {
    const name: string = `${cookieName}=`;
    const ca: string[] = document.cookie.split(';');

    for (let i: number = 0; i < ca.length; i += 1) {
      let c: string = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return null;
  }

  /***
   * Save the access token of the in the cookie
   *
   * @param {string} token
   * @param {number} expiresIn Expiration date of the in days
   *
   * @return @void
   */
  public static saveUserAccessToken(token: string, expiresIn: number = 1): void {
    LocalStorageManager.setCookie(USER_ACCESS_TOKEN_KEY, token, expiresIn);
  }

  /***
   * Get the access token of user
   *
   * @return string|null
   */
  public static getUserAccessToken(): string|null {
    return LocalStorageManager.getCookie(USER_ACCESS_TOKEN_KEY);
  }

  /***
   * Save the refresh token of the in the local storage
   *
   * @param {string} token
   *
   * @return @void
   */
  public static saveUserRefreshToken(token: string): void {
    localStorage.setItem(USER_REFRESH_TOKEN_KEY, token);
  }

  /***
   * Get the refresh token of user
   *
   * @return string|null
   */
  public static getUserRefreshToken(): string|null {
    return localStorage.getItem(USER_REFRESH_TOKEN_KEY);
  }

  /***
   * Save user's information in the local storage
   *
   * @param {Object} data
   *
   * @return @void
   */
  public static saveUserInfo(data: Object): void {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  }

  /***
   * Get user's information in the local storage
   *
   * @return Object|null
   */
  public static getUserInfo(): User|null {
    const user: string|null = localStorage.getItem(USER_DATA_KEY);

    try {
      if (user) {
        return JSON.parse(user);
      }
    } catch (e) {
      console.log('User Data Parsing Error => ', e.toString());
    }

    return null;
  }

  /***
   * Delete all information about the user in the local storage
   *
   * @return void
   */
  public static logoutUser(): void {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(USER_REFRESH_TOKEN_KEY);
    // TODO delete cookie
  }
}

export default LocalStorageManager;
