import React from 'react'
import IconThemeDark from './ThemeDark'
import IconThemeLight from './ThemeLight'
import IconClose from './Close'
import IconHamburger from './Hamburger'
import IconArrowDown from './ArrowDown'

const icons = {
  IconThemeDark: React.lazy(() => import('./ThemeDark')),
  IconThemeLight: React.lazy(() => import('./ThemeLight')),
  IconClose: React.lazy(() => import('./Close')),
  IconHamburger: React.lazy(() => import('./Hamburger')),
  IconArrowDown: React.lazy(() => import('./ArrowDown')),
}

export { IconThemeDark, IconThemeLight, IconClose, IconHamburger, IconArrowDown }
export default icons
