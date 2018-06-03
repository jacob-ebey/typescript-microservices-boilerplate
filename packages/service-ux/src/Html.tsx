import * as React from 'react'
import { HelmetData } from 'react-helmet'

export interface HtmlProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
  app: string
  helmet: HelmetData
}

export const Html = ({ app, helmet }: HtmlProps) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div id='container' dangerouslySetInnerHTML={{ __html: app }} />

        <script src='bundle.js' />
      </body>
    </html>
  )
}
