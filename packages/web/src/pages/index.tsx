import type { NextPage, GetServerSideProps } from 'next'
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { parseCookies } from 'nookies'
import Link from 'next/link'

import Header from '../components/Header'

import { pagesQuery } from '../../__generated__/pagesQuery.graphql'
import { PagesPaginationQuery } from '../../__generated__/PagesPaginationQuery.graphql'
import { pages_query$key } from '../../__generated__/pages_query.graphql'

const Landing: NextPage = ({ isAuthenticated }: any) => {
  const response = useLazyLoadQuery<pagesQuery>(
    graphql`
      query pagesQuery($first: Int, $after: String) {
        ...pages_query @arguments(first: $first, after: $after)
      }
    `,
    {},
    {
      fetchPolicy: 'store-or-network',
    },
  )

  const {
    data: query,
    // loadNext,
    // loadPrevious,
    // hasNext,
    // hasPrevious,
    // isLoadingNext,
    // isLoadingPrevious,
    // refetch, // For refetching connection
  } = usePaginationFragment<PagesPaginationQuery, pages_query$key>(
    graphql`
      fragment pages_query on Query
      @refetchable(queryName: "PagesPaginationQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String", defaultValue: null }
      ) {
        posts(first: $first, after: $after)
          @connection(key: "Pages_query_posts") {
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
    `,
    response,
  )

  const { posts } = query

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

        <div className="flex flex-col gap-0.5 bg-orange-50">
          {posts.edges.length === 0 && (
            <div className="flex justify-center my-4">
              <h1>No posts</h1>
            </div>
          )}
          {posts.edges.map((post) => (
            <div key={post?.node?.id} className="p-2 flex">
              <a
                className="mr-2 text-gray-400"
                onClick={() => console.log(true)}
              >
                ▲
              </a>
              <div className="flex flex-col">
                <Link href={`/post/${post?.node?.id}`}>
                  <a className="hover:underline cursor-pointer">
                    {post?.node?.title}
                  </a>
                </Link>
                <p className="text-xs text-gray-400">
                  {post?.node?.votes} votes | posted by{' '}
                  {post?.node?.author?.username} | {post?.node?.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
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
