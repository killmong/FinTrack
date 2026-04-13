export interface User {
  _id:   string
  name:  string
  email: string
  role:  'admin' | 'viewer'
  token: string
}

export interface LoginCredentials {
  email:    string
  password: string
}

export interface RegisterCredentials {
  name:     string
  email:    string
  password: string
}