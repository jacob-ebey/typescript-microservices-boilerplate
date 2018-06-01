export const whitelist: Set<string | undefined> = process.env.NODE_ENV === 'development'
  ? new Set([
    undefined,
    'http://localhost:3001'
  ])
  : new Set([
    'https://gh-service-auth.herokuapp.com/'
  ])
