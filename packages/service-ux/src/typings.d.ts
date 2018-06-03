// TODO: Figure out why ts is building the node_modules dir that is requiring this
declare module 'ws' {
  export type ServerOptions = any
  export type Server = any
}

declare module 'react-router-dom/StaticRouter'

declare module '*.graphql'
declare module '*.graphql' {
  const value: string;
  export default value
}
