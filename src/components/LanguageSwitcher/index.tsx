'use client'

import { useRouter, usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (lang: string) => {
    const currentPathWithoutLocale = pathname.replace(/^\/(cs|en)/, '') || ''
    const newPath = `/${lang}${currentPathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <Select
      value={routing.locales.find((locale) => pathname.startsWith(`/${locale}`))}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-auto border-none uppercase text-sm">
        <SelectValue placeholder={routing.defaultLocale.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {routing.locales.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
