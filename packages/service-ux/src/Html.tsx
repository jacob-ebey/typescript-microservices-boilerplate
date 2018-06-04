import * as React from 'react'
import { HelmetData } from 'react-helmet'

export interface HtmlProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
  app: string
  css: string
  graphqlState: any
  helmet: HelmetData
  normalize: string
}

export const Html = ({ app, css, graphqlState, helmet, normalize }: HtmlProps) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}

        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='Description' content='A microservice boilerplate.' />
        <link rel='shortcut icon' href='/favicon.ico' />

        <style dangerouslySetInnerHTML={{ __html: normalize }}></style>
        <style dangerouslySetInnerHTML={{ __html: css }}></style>
        <script async defer src='/static/js/vendor.js' />
        <script async defer src='/static/js/bundle.js' />
      </head>
      <body {...bodyAttrs}>
        <div id='container' dangerouslySetInnerHTML={{ __html: app }} />

        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(graphqlState).replace(/</g, '\\u003c')};`
        }} />
      </body>
    </html>
  )
}
