import { redirect } from 'next/navigation'

type Props = {
  params: {
    locale: string
  }
}

export default function LocalePage({ params }: Props) {
  const { locale } = params

  // Přesměrování na `/[locale]/home`
  redirect(`/${locale}/home`)
}
