'use client'

export default function Post({ params }) {
  console.log('params', params)

  return <h1>Post {JSON.stringify(params.slug)}</h1>
}
