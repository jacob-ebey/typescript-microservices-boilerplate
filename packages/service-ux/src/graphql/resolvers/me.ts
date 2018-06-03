export const Query = {
  me (source: any, args: any, context: any) {
    console.log(source)
    console.log(args)
    console.log(context)

    return {
      profile: {
        id: 1,
        username: 'test',
        email: 'test@test.com'
      }
    }
  }
}
