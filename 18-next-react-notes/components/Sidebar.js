import React, { Suspense } from 'react'
import Link from 'next/link'

import SidebarSearchField from '@/components/SidebarSearchField'
import SidebarNoteList from '@/components/SidebarNoteList'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from '@/components/NoteListSkeleton'
import { useTranslation } from '@/app/i18n'

// // 移除数据请求部分，为 SidebarNoteList 添加 Suspense 以及 fallback UI NoteListSkeleton
export default async function Sidebar({ lng }) {
  const { t } = await useTranslation(lng, 'basic')
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img className="logo" src={lng ? `${lng}/vercel.svg` : '/vercel.svg'} alt="" role="presentation" />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton noteId={null}>{t('new')}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
