'use client'

export default function Home() {
  const getApi = async () => {
    console.time()
    const res = await fetch('/api?id=1')
      .then((res) => res.json())
      .then((data) => {
        console.timeEnd()
        console.log(data)
      })
  }
  const getApiUserById = async () => {
    const res = await fetch('/api/user/1')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  const postApi = async () => {
    const data = JSON.stringify({
      username: 'admin',
      password: '123456'
    })
    const formData = new FormData()
    formData.append('username', 'admin')
    formData.append('password', '123456')
    const res = await fetch('/api', {
      method: 'POST',
      body: formData
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  const getAbout = async () => {
    const res = await fetch('/about/2')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <div>
      <div>
        <button onClick={getApi}>调用GET /api</button>
      </div>
      <div>
        <button onClick={getApiUserById}>调用GET /api/user/1</button>
      </div>
      <div>
        <button onClick={postApi}>调用POST /api</button>
      </div>
      <div>
        <button onClick={getAbout}>调用GET /about</button>
      </div>
    </div>
  )
}
