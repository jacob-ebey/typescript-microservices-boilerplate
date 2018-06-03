import gql from 'graphql-tag'

export default gql`
  query Me {
    me {
      profile {
        id
        username
        email
        phone
      }
    }
  }
`
