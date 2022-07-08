import type { NextPage } from 'next'
import Head from 'next/head'

const Landing: NextPage = () => {
  return (
    <div>
      <Head>
        <title>recipes</title>
      </Head>

      <div className="h-screen flex justify-center">
        <div className="mt-3 w-full sm:w-6/12 flex-col">
          <div className="w-full flex justify-between h-7 bg-green-600">
            <p className="pl-2">recipes</p>
            <p className="pr-2">login</p>
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
              <p className="text-xs text-gray-400">
                5 votes | posted by samuel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
