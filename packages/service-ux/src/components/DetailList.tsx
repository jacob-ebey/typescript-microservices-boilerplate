import * as React from 'react'

export interface DetailListColumnComponentProps<T> {
  value: T
}

export type DetailListColumnComponent<T> = React.ComponentType<DetailListColumnComponentProps<T>>

export interface DetailListColumn<T> {
  component?: DetailListColumnComponent<T>
  grow?: boolean
  icon?: string | boolean
  key: string
  prop?: keyof T | string
}

export interface DetailListProps<T> {
  className?: string
  columns: DetailListColumn<T>[]
  keyProp: keyof T | string
  items?: T[]
  title?: string
}

interface DetailColumnProps<T> {
  column: DetailListColumn<T>
  item: T
}

const DetailColumn = <T,>({ item, column }: DetailColumnProps<T>) => {
  if (column.component) {
    return <column.component value={item} />
  }

  const content = column.icon
    ? <div className={`icon ${column.icon}`} />
    : item && (item as any)[column.prop]

  return content || null
}

export const DetailList = <T,>({ className, columns, items, keyProp, title }: DetailListProps<T>) => {
  const finalClass = `DetailList ${className || ''}`

  return (
    <div className={finalClass}>
      { title && <div className='DetailList--title'>{title}</div> }
      {
        items && items.map((item: T) => (
          <div key={(item as any)[keyProp]} className='DetailList--row'>
            {
              columns.map((column: DetailListColumn<T>) => (
                <div key={column.key} className={`DetailList--row--column ${column.grow ? 'DetailList--row--column__grow' : ''}`}>
                  <DetailColumn column={column} item={item} />
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
