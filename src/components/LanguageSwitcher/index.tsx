'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LanguageSwitcher = () => {
  const pathname = usePathname()
  const locales = ['en', 'cs'] // Podporované jazyky

  return (
    <div className="flex flex-row items-center space-x-4 translate-y-3">
      {locales.map((lang) => {
        // Zkontrolujeme, jestli jsme na rootu `/` nebo `/[locale]`
        const currentPathWithoutLocale = pathname.replace(/^\/(en|cs)/, '') || ''
        const newPath = `/${lang}${currentPathWithoutLocale}`

        return (
          <Link key={lang} href={newPath} className="text-white">
            <button>{lang.toUpperCase()}</button>
          </Link>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
