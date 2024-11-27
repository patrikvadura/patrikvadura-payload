import React from 'react'
import IconThemeDark from './ThemeDark'
import IconThemeLight from './ThemeLight'
import IconClose from './Close'
import IconHamburger from './Hamburger'

const icons = {
  IconThemeDark: React.lazy(() => import('./ThemeDark')),
  IconThemeLight: React.lazy(() => import('./ThemeLight')),
  IconClose: React.lazy(() => import('./Close')),
  IconHamburger: React.lazy(() => import('./Hamburger')),
}

export { IconThemeDark, IconThemeLight, IconClose, IconHamburger }
export default icons
