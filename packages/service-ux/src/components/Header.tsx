import * as React from 'react'

export class Header extends React.Component {
  public render () {
    return (
      <nav className='Header'>
        <div className='Header--item Header--item__dropdown Header--item__centered'>
          <div className='Header--avatar'>
            <div className='icon profile-solid' />
          </div>
          <span className='Header--username'>typescript-microservices-boilerplate</span>
        </div>

        <div className='Header--pusher' />

        <a className='Header--item Header--item__link' href='#'>Login</a>
      </nav>
    )
  }
}
