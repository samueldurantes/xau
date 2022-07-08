import type { NextPage } from 'next'
import Head from 'next/head'
import { useLazyLoadQuery, graphql } from 'react-relay'

const Landing: NextPage = () => {
  const query = useLazyLoadQuery(
    graphql`
      query signupQuery {
        hello
      }
    `,
    {},
  )

  console.log(query)

  return (
    <div>
      <Head>
        <title>signup</title>
      </Head>

      <div>
        <div>
          <p>login:</p>
          <input
            type="text"
            className="border-solid border-2 border-gray-500"
          />
        </div>
        <div>
          <p>password:</p>
          <input
            type="text"
            className="border-solid border-2 border-gray-500"
          />
        </div>
      </div>
    </div>
  )
}

export default Landing
