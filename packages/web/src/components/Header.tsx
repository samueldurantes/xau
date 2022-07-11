// import Link from 'next/link'

function Header({ children }: any) {
  return (
    <div className="w-full flex justify-between h-7 bg-green-600">
      {children}
    </div>
  )
}

export default Header
