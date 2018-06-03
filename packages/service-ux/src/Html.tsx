import * as React from 'react'
import { HelmetData } from 'react-helmet'

export interface HtmlProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
  app: string
  helmet: HelmetData
  graphqlState: any
}

export const Html = ({ app, graphqlState, helmet }: HtmlProps) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}

        <link rel='shortcut icon' href='/favicon.ico' />

        <link rel='stylesheet' type='text/css' href='/static/normalize.css' />
      </head>
      <body {...bodyAttrs}>
        <div id='container' dangerouslySetInnerHTML={{ __html: app }} />

        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(graphqlState).replace(/</g, '\\u003c')};`
        }} />
        <script src='/static/bundle.js' />
      </body>
    </html>
  )
}
