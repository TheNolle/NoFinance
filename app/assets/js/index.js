import { _titlebar } from './utils/titlebar.js'
import { _themeDefault } from './utils/theme.js'
import { loadMe } from './finance.js'

window.addEventListener('load', _ => {
    _titlebar()
    _themeDefault()
    loadMe()
})