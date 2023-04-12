import type { NextPage, GetServerSideProps } from 'next'
import { useLazyLoadQuery, graphql, useFragment } from 'react-relay'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

import Header from '../../components/Header'

import { IdQuery } from '../../../__generated__/IdQuery.graphql'
import { Id_query$key } from '../../../__generated__/Id_query.graphql'

const Post: NextPage = ({ isAuthenticated }: any) => {
  const router = useRouter()

  const response = useLazyLoadQuery<IdQuery>(
    graphql`
      query IdQuery($id: ID!) {
        ...Id_query @arguments(id: $id)
      }
    `,
    {
      id: router.query.id as string,
    },
    {
      fetchPolicy: 'store-or-network',
    },
  )

  const query = useFragment<Id_query$key>(
    graphql`
      fragment Id_query on Query @argumentDefinitions(id: { type: "ID!" }) {
        post: node(id: $id) {
          ... on Post {
            id
            title
            body
            votes
            author {
              username
            }
            createdAt
          }
        }
      }
    `,
    response,
  )

  const { post } = query

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-3 w-full sm:w-6/12 flex-col">
        <Header isAuthenticated={isAuthenticated} />

        <div className="bg-orange-50">
          <div className="p-2 flex flex-col gap-2.5">
            <div className="flex">
              <a
                className="mr-2 text-gray-400"
                onClick={() => console.log(true)}
              >
                ▲
              </a>
              <div className="flex flex-col">
                <p>{post?.title}</p>
                <p className="text-xs text-gray-400">
                  {post?.votes} votes | posted by {post?.author?.username} |{' '}
                  {post?.createdAt}
                </p>
              </div>
            </div>
            <p className="text-sm">{post?.body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth.token': token } = parseCookies(ctx)
  if (!token) {
    return {
      props: {
        isAuthenticated: false,
      },
    }
  }

  return {
    props: {
      isAuthenticated: true,
    },
  }
}

export default Post
