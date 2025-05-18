import { useTranslation } from 'react-i18next'

const contact = () => {
  const { t } = useTranslation()
  return (
    <div className="h-screen w-full relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-black text-4xl font-bold">{t('contact')}</h1>
      </div>
    </div>
  )
}

export default contact