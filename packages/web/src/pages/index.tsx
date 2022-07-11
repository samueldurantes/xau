import type { NextPage, GetServerSideProps } from 'next'
// import { useContext } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { parseCookies } from 'nookies'
import Link from 'next/link'

// import { AuthContext } from '../contexts/auth'
import { pagesQuery$data } from '../../__generated__/pagesQuery.graphql'
import Header from '../components/Header'

const postsQuery = graphql`
  query pagesQuery {
    posts {
      edges {
        node {
          id
          title
          votes
          createdAt
          author {
            username
          }
        }
      }
    }
  }
`

const Landing: NextPage = ({ isAuthenticated }: any) => {
  // const { logOut } = useContext(AuthContext)
  const { posts } = useLazyLoadQuery(postsQuery, {}) as pagesQuery$data

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-3 w-full sm:w-6/12 flex-col">
        <Header>
          <div className="flex">
            <Link href={'/'}>
              <a className="pl-2">recipes</a>
            </Link>
            <p className="pl-2 pr-2 text-gray-800">|</p>
            <Link href={'/post/new'}>
              <a className="pr-2">new</a>
            </Link>
          </div>
          {isAuthenticated ? (
            <a className="pr-2" onClick={() => console.log(true)}>
              logout
            </a>
          ) : (
            <Link href={'/login'}>
              <a className="pr-2">login</a>
            </Link>
          )}
        </Header>

        {posts.edges.map((post) => (
          <div className="bg-orange-50 p-2 flex" key={post?.node?.id}>
            <a className="mr-2 text-gray-400" onClick={() => console.log(true)}>
              ▲
            </a>
            <div className="flex flex-col">
              <p>{post?.node?.title}</p>
              <p className="text-xs text-gray-400">
                {post?.node?.votes} votes | posted by{' '}
                {post?.node?.author?.username} | {post?.node?.createdAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth.token': token } = parseCookies(ctx)
  let isAuthenticated = false

  if (token) {
    isAuthenticated = true

    return {
      props: {
        isAuthenticated,
      },
    }
  }

  return {
    props: {
      isAuthenticated,
    },
  }
}

export default Landing
