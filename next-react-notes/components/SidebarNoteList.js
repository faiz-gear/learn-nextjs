import { getAllNotes } from '@/lib/redis'
import SidebarNoteListFilter from './SidebarNoteListFilter'
import SidebarNoteItemHeader from './SidebarNoteItemHeader'

export default async function NoteList() {
  const notes = await getAllNotes()

  const arr = Object.entries(notes)

  if (arr.length == 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          // 在这里将SidebarNoteItemHeader服务端组件作为props传给SidebarNoteListFilter客户端组件, SidebarNoteItemHeader的组件不会打包进客户端代码的bundle中
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
        }
      })}
    />
  )
}
