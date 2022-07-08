import type { NextPage } from 'next'
import { useContext } from 'react'
import Link from 'next/link'

import { AuthContext } from '../contexts/auth'

const Landing: NextPage = () => {
  const { isAuthenticated, logOut } = useContext(AuthContext)

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-3 w-full sm:w-6/12 flex-col">
        <div className="w-full flex justify-between h-7 bg-green-600">
          <p className="pl-2">recipes</p>
          {isAuthenticated ? (
            <a className="pr-2 cursor-pointer" onClick={logOut}>
              logout
            </a>
          ) : (
            <Link href={'/login'}>
              <a className="pr-2">login</a>
            </Link>
          )}
        </div>

        {/* posts */}
        <div className="bg-orange-50 p-2 flex">
          <button
            className="mr-2 text-gray-400"
            onClick={() => console.log(true)}
          >
            ▲
          </button>
          <div className="flex flex-col">
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p className="text-xs text-gray-400">5 votes | posted by samuel</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
