import { usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useMemo, useState } from 'react'

const LanguageSwitcher = () => {
  const pathname = usePathname()
  const router = useRouter()
  const locales = useMemo(() => ['en', 'cs'], [])

  const [selectedLanguage, setSelectedLanguage] = useState<string>('cs')

  useEffect(() => {
    const currentLocale = pathname.split('/')[1]
    if (locales.includes(currentLocale)) {
      setSelectedLanguage(currentLocale)
    } else {
      setSelectedLanguage('cs')
    }
  }, [pathname, locales])

  const handleLanguageChange = (lang: string) => {
    const currentPathWithoutLocale = pathname.replace(/^\/(en|cs)/, '') || ''
    const newPath = `/${lang}${currentPathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto border-none uppercase text-sm">
        <SelectValue placeholder={selectedLanguage.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher
