import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Navbar() {

    const { t, i18n } = useTranslation()

     const changeLang = (lng) => {
    i18n.changeLanguage(lng)
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  }

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center items-center h-16 z-10 bg-transparent space-x-8 ">
      <Link className='text-white hover:text-blue-400' href="/">
        {t('home')}
      </Link>
      <Link className='text-white hover:text-blue-400' href="/about">
        {t('about')}
      </Link>
      <Link className='text-white hover:text-blue-400' href="/services">
        {t('services')}
      </Link>
      <Link className='text-white hover:text-blue-400' href="/blog">
        {t('blog')}
      </Link>
      <Link className='text-white hover:text-blue-400' href="/team">
        {t('team')}
      </Link>
      <Link className='text-white hover:text-blue-400' href="/contact">
        {t('contact')}
      </Link>
       <button onClick={() => changeLang('en')} className="text-white">EN</button>
      <button onClick={() => changeLang('ar')} className="text-white">العربية</button>
    </nav>
  )
}
