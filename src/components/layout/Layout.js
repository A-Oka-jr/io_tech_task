import Navbar from './Navbar'
import HeroCarousel from './HeroCarousel'

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <HeroCarousel />
      <main>{children}</main>
    </div>
  )
}
