import { useState } from 'react'
import Head from '../components/Head'
import Feat from '../components/Feat'


function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=' overflow-hidden'>
    <div className='w-full'>
    <Head/>
    </div>
    <Feat/>
    </div>
    </>
  )
}

export default Home
