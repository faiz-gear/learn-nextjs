import React, { memo, use } from 'react'

const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return {
    data: 'About data'
  }
}

const About = memo(() => {
  // const { data } = await getData()
  // use hook实验性功能，接收一个Promise或者Context
  const { data } = use(getData())
  return <div>Hello Dashboard About: message-{data}</div>
})
About.displayName = 'About'

export default About
