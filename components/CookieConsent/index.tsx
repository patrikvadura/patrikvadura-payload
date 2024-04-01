'use client'

import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import * as CookieConsent from 'vanilla-cookieconsent'

import getConfig from './Config'
import addEventListeners from './Listeners'

import 'vanilla-cookieconsent/dist/cookieconsent.css'

const ResetCookieConsent = () => {
  CookieConsent.reset(true)
  CookieConsent.run(getConfig())
}

const CookieConsentComponent = () => {
  useEffect(() => {
    addEventListeners()
    CookieConsent.run(getConfig())
  }, [])

  return (
    <>
      <div
        className="flex text-white hover:underline cursor-pointer"
        onClick={CookieConsent.showPreferences}
      >
        <Icon icon="material-symbols:cookie-outline" className="mr-1 text-white text-2xl" />
        Cookies
      </div>
    </>
  )
}

export default CookieConsentComponent
