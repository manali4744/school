export function isAuthenticated() {
    const token = localStorage.getItem('jwt_token');
    return token;
  }