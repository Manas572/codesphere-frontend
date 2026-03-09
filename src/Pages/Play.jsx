import React from 'react'
import { Navbar } from '../components/Navbar'
import Ide from '../components/Ide'
import Out from '@/components/Out'

const Play = () => {
  
  return (
    <div className="flex flex-col h-screen bg-[#060707]">
      <div className="relative w-full">
        <Navbar />
      </div>

      <div className="flex flex-1 w-full py-3 px-2 gap-2 overflow-hidden">
        <div className='w-1/2 h-full border border-gray-700 rounded-lg overflow-hidden'>
          <Ide />
        </div>
        <div className='w-1/2 h-full border border-gray-700 rounded-lg overflow-hidden'>
          <Out />
        </div>
      </div>
    </div>
  )
}

export default Play