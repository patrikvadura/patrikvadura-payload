'use client'

import { acceptedCategory } from 'vanilla-cookieconsent'

declare global {
  interface Window {
    _ccRun: boolean
  }
}

interface CCDetail {
  changedCategories: CookieConsent.UserPreferences['acceptedCategories']
  changedServices: CookieConsent.UserPreferences['acceptedServices']
}

const addCookieConsentListeners = () => {
  /**
   * React specific fix: avoid adding event listeners twice
   */
  if (window._ccRun) return

  console.log('added cc listeners')

  window.addEventListener('cc:onConsent', () => {
    console.log('onConsent')

    if (acceptedCategory('analytics')) {
      console.log('accepted analytics')
    } else {
      console.log('rejected analytics')
    }
  })

  window.addEventListener('cc:onChange', (event: Event) => {
    const { changedCategories, changedServices } = (event as CustomEvent<CCDetail>)?.detail

    console.log('onChange:changedCategories', changedCategories)
    console.log('onChange:changedServices', changedServices)

    // if (changedCategories.includes('analytics')) {
    //   if (acceptedCategory('analytics')) {
    //     console.log('accepted analytics');
    //   } else {
    //     console.log('rejected analytics');
    //   }
    // }

    for (const category of changedCategories) {
      console.log(`${category} accepted:`, acceptedCategory(category))
    }
  })
}

export default addCookieConsentListeners
