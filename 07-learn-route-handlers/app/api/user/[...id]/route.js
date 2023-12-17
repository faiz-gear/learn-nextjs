import { NextResponse } from 'next/server'

export function GET(request, context) {
  const { id } = context.params
  const data = { message: `Hello Nextjs! ${id} user`, request, context }
  return NextResponse.json(data)
}
