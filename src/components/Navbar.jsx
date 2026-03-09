import React from 'react'
import { NavLink } from 'react-router-dom'
import { AuroraText } from "@/components/ui/aurora-text";

const data = [
  { name: 'HOME', path: '/' },
  { name: 'Play', path: '/play' },
  { name: 'Chatbot', path: '/chatbot' },
  { name: 'Analysis', path: '/userID' },
]

export const Navbar = () => {
  return (
    <div>
      <nav className="relative flex justify-between z-10 items-center px-5 py-5 w-full">
        <div className="text-4xl font-IBMPlexBold ">
          <NavLink to="/">
          CodeSphere
          </NavLink>
        </div>

        <div className="flex font-IBMPlexBold text-cyan-100">
          {data.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 ${
                    isActive
                      ? 'text-blue-500 '   
                      : 'text-cyan-100'    
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
