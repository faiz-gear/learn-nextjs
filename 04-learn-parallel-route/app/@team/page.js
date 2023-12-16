import { use } from 'react'

const getTeam = () => new Promise((resolve) => setTimeout(() => resolve('Team'), 3000))

export default function Team() {
  use(getTeam())
  return <div>Team</div>
}
