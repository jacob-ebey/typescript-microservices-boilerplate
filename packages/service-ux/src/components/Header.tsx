import * as React from 'react'

import { DetailList } from './DetailList'

export class Header extends React.Component {
  public render () {
    return (
      <nav className='Header'>
        <div className='Header--item Header--item__dropdown Header--item__centered'>
          <div className='Header--avatar'>
            <div className='icon profile-solid' />
          </div>
          <span className='Header--username'>typescript-microservices-boilerplate</span>

          <div className='Header--item--dropdown'>
            <DetailList
              items={[
                { id: 1, label: 'test' }
              ]}
              keyProp='id'
              columns={[
                { key: 'user', icon: 'profile-solid' },
                {
                  key: 'label',
                  prop: 'label',
                  grow: true
                }
              ]}
            />
          </div>
        </div>

        <div className='Header--pusher' />

        <a className='Header--item Header--item__link' href='#'>Login</a>
      </nav>
    )
  }
}
