# NoFinance

Get real-time finance data from https://stooq.com/.
`Watch out, you are daily rate limited, but i've implemented a caching system so if it's achieved, you will get the latest saved informations`

Add your own finance you want to follow in '[finance.json](app/assets/media/finance.json)' by following the plan:
```json
{
    "symbol": "<SYMBOL> (get it at https://stooq.com/)",
    "image": "[IMGUR URL]",
    "card_cl": "[CSS COLOR CODE FOR THE TEXT]",
    "card_bg": "[CSS COLOR CODE FOR THE CARD]",
    "title": "[NAME] (you can use html)"
}
```
`<•••> - required` `[•••] - optional`


---


#### App based on my [ElectronJS Template App](https://github.com/TheNolle/ElectronJS-Template-App)