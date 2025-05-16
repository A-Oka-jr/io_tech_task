import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center items-center h-16 z-10 bg-transparent space-x-8 ">
      <Link className='text-white hover:text-blue-400' href="/">
        Home
      </Link>
      <Link className='text-white hover:text-blue-400' href="/about">
        About us
      </Link>
      <Link className='text-white hover:text-blue-400' href="/services">
        Services
      </Link>
      <Link className='text-white hover:text-blue-400' href="/blog">
        Blog
      </Link>
      <Link className='text-white hover:text-blue-400' href="/team">
        Our Team
      </Link>
      <Link className='text-white hover:text-blue-400' href="/contact">
        Contact us
      </Link>
    </nav>
  )
}
