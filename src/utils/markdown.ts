// https://github.com/walinejs/waline/blob/main/packages/client/src/utils/markdown.ts
import { marked } from 'marked'

export type EmojiMaps = Record<string, string>
export type Highlighter =
  | ((code: string, lang: string) => string)
  | ((
    code: string,
    lang: string,
    callback?: (error: unknown | undefined, code?: string) => void
  ) => void)

export async function parseMarkdown(content: string) {
  marked.setOptions({
    breaks: true,
  })
  return await marked.parse(content)
}
