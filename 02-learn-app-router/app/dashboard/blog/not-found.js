import Link from 'next/link'

/**
 * not-found.js 被用于当 notFound 函数被抛出的时候
 */
export default function NotFoundBoundary() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
