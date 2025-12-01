const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface SignupData {
  username: string;
  password: string;
  name: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface CreateRoomData {
  name: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
  }

  async signup(data: SignupData): Promise<ApiResponse<{ userId: string; token: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { error: result.message || 'Signup failed' };
      }

      // Assuming backend returns token on signup
      if (result.token) {
        this.setToken(result.token);
      }

      return { data: result };
    } catch (error) {
      return { error: 'Network error. Please try again.' };
    }
  }

  async signin(data: SignInData): Promise<ApiResponse<{ userId: string; token: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { error: result.message || 'Sign in failed' };
      }

      if (result.token) {
        this.setToken(result.token);
      }

      return { data: result };
    } catch (error) {
      return { error: 'Network error. Please try again.' };
    }
  }

  async createRoom(data: CreateRoomData): Promise<ApiResponse<{ roomId: string; slug: string }>> {
    try {
      const token = this.getToken();
      const response = await fetch(`${this.baseUrl}/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { error: result.message || 'Failed to create room' };
      }

      return { data: result };
    } catch (error) {
      return { error: 'Network error. Please try again.' };
    }
  }

  async getChats(roomId: string): Promise<ApiResponse<any[]>> {
    try {
      const token = this.getToken();
      const response = await fetch(`${this.baseUrl}/chats/${roomId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { error: result.message || 'Failed to fetch chats' };
      }

      return { data: result };
    } catch (error) {
      return { error: 'Network error. Please try again.' };
    }
  }

  async getRoomBySlug(slug: string): Promise<ApiResponse<any>> {
    try {
      const token = this.getToken();
      const response = await fetch(`${this.baseUrl}/room/${slug}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { error: result.message || 'Room not found' };
      }

      return { data: result };
    } catch (error) {
      return { error: 'Network error. Please try again.' };
    }
  }

  logout(): void {
    this.removeToken();
  }

  getStoredToken(): string | null {
    return this.getToken();
  }
}

export const api = new ApiClient(API_BASE_URL);
