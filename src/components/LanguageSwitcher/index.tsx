'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LanguageSwitcher = () => {
  const pathname = usePathname()
  const locales = ['en', 'cs']

  return (
    <Select>
      <SelectTrigger className="w-auto border-none uppercase text-sm">
        <SelectValue placeholder="cs" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((lang) => {
            const currentPathWithoutLocale = pathname.replace(/^\/(en|cs)/, '') || ''
            const newPath = `/${lang}${currentPathWithoutLocale}`

            return (
              <SelectItem key={lang} value={lang}>
                <Link href={newPath} className="text-sm text-white">
                  <button>{lang.toUpperCase()}</button>
                </Link>
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher
