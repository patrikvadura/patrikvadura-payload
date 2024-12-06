import React from 'react'
import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { TypoOnly } from '@/heros/TypoOnly'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  typoOnly: TypoOnly,
}

type RenderHeroProps = Page['hero'] & { locale: string }

export const RenderHero: React.FC<RenderHeroProps> = (props) => {
  const { type, locale } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} locale={locale} />
}
