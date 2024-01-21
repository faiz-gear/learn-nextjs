'use client'

import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
import { useSearchParams } from 'next/navigation'

export default function SidebarNoteListFilter({ notes }) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')

  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem
        if (!searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))) {
          // 如果直接使用SidebarNoteItem组件，那么SidebarNoteItem组件、sidebarNoteItemHeader组件(包括使用到的dayjs)会被打包进客户端代码的bundle中
          return (
            <SidebarNoteItemContent
              id={noteId}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">{note.content.substring(0, 20) || <i>(No content)</i>}</p>
              }
              key={noteId}
            >
              {header}
            </SidebarNoteItemContent>
          )
        }
      })}
    </ul>
  )
}
