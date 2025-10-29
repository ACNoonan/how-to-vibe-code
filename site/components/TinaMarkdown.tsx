import React from 'react'
import { TinaMarkdown as TinaMarkdownBase, TinaMarkdownContent } from 'tinacms/dist/rich-text'

export function TinaMarkdown({ content }: { content: TinaMarkdownContent }) {
  return (
    <div className="prose">
      <TinaMarkdownBase content={content} />
    </div>
  )
}

