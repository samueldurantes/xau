import Link from 'next/link'

type HeaderProps = {
  isAuthenticated: boolean
}

const Header = ({ isAuthenticated }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between h-7 bg-green-600">
      <div className="flex">
        <Link href={'/'}>
          <a className="pl-2">xau</a>
        </Link>
        <p className="pl-2 pr-2 text-gray-800">|</p>
        <Link href={'/post/new'}>
          <a className="pr-2">new</a>
        </Link>
      </div>
      {isAuthenticated ? (
        <Link href={'/logout'}>
          <a className="pr-2 cursor-pointer">logout</a>
        </Link>
      ) : (
        <Link href={'/login'}>
          <a className="pr-2">login</a>
        </Link>
      )}
    </div>
  )
}

export default Header
