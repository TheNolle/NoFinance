import { _titlebarUpdate } from './utils/titlebar.js'

const finance = window.utils.finance()

export function loadMe() {
    const main = document.createElement('main')
    document.body.append(main)
    finance.forEach(f => {
        const obj = f
        const type = obj.symbol
        const card_bg = obj.card_bg || '#fefefe'
        const card_cl = obj.card_cl || '#1a1a1a'
        const image = obj.image || 'dnhfUID'
        const title = obj.title || '<small>Not set, please correct me</small>'

        if (!type) return

        const card = document.createElement('div')
        const image_el = document.createElement('div')
        image_el.setAttribute('image', '')
        card.append(image_el)
        const data_el = document.createElement('div')
        data_el.setAttribute('data', '')
        card.append(data_el)
        const h3_el = document.createElement('h3')
        data_el.append(h3_el)
        const h4_el = document.createElement('h4')
        data_el.append(h4_el)
        const span_el = document.createElement('span')
        h4_el.append(span_el)
        const small_el = document.createElement('small')
        h4_el.append(small_el)
        main.append(card)

        card.style.color = card_cl
        card.style.backgroundColor = card_bg
        card.style.setProperty('--cardBG', card_bg)
        card.title = `Click me to know more about ${type}'s finance\nURL: https://stooq.com/q/?s=${type}`
        card.addEventListener('click', _ => window.utils.openExternal(`https://stooq.com/q/?s=${type}`))

        const xhr = new XMLHttpRequest()
        xhr.open('GET', `https://stooq.com/q/l/?f=sd2t2ohlc&h&e=json&s=${type}`)
        xhr.send()
        xhr.addEventListener('load', _ => {
            if (xhr.status === 200) {
                var r_data = xhr.responseText
                if (r_data !== 'Exceeded the daily hits limit') {
                    _titlebarUpdate(`${document.title} • Live`)
                    r_data = JSON.parse(xhr.responseText).symbols[0]
                    localStorage.setItem(type, JSON.stringify(r_data))
                    const previous = parseFloat(r_data.open, 10)
                    const current = parseFloat(r_data.close, 10)
                    let change = Math.round((current - previous) * 100) / 100
                    if (change >= 0) change = `+${change}`

                    card.querySelector('div[data]').querySelector('h4').querySelector('span').textContent = `$${current.toLocaleString()}`
                    card.querySelector('div[data]').querySelector('h4').querySelector('small').textContent = `(${change})`
                } else {
                    if (localStorage.getItem(type)) {
                        _titlebarUpdate(`${document.title} • From Cache`)
                        r_data = JSON.parse(localStorage.getItem(type))
                        const previous = parseFloat(r_data.open, 10)
                        const current = parseFloat(r_data.close, 10)
                        let change = Math.round((current - previous) * 100) / 100
                        if (change >= 0) change = `+${change}`
                        card.querySelector('div[data]').querySelector('h4').querySelector('span').textContent = `$${current.toLocaleString()}`
                        card.querySelector('div[data]').querySelector('h4').querySelector('small').textContent = `(${change})`
                    } else {
                        _titlebarUpdate(`${document.title} • No Cache`)
                        if (!card.querySelector('div[data]').querySelector('h4').querySelector('span').textContent)
                        card.querySelector('div[data]').querySelector('h4').querySelector('span').textContent = '$••.••'
                        if (!card.querySelector('div[data]').querySelector('h4').querySelector('small').textContent)
                        card.querySelector('div[data]').querySelector('h4').querySelector('small').textContent = '(•.•)'
                    }
                    setTimeout(_ => loadMe(), 1000 * 60 * 60)
                }
                card.querySelector('div[data]').querySelector('h3').innerHTML = title
                card.querySelector('div[image]').style.backgroundImage = `url(https://i.imgur.com/${image}.jpg?maxwidth=123456789&shape=thumb&fidelity=high)`
            }
        })
    })
}