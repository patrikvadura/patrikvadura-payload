import { redirect } from 'next/navigation'

type Props = {
  params: {
    locale: 'cs' | 'en' | undefined
  }
}

export default function LocalePage({ params }: Props) {
  const { locale } = params

  redirect(`/${locale}/home`)
}
