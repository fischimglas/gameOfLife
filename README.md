#paropakaram.com - website frontent 

## DEV
```yarn start```
open http://localhost:3001/

### UNIT TESTING
```yarn jest```

```test```

### Build for Production
```brunch build``` 
[or]
```yarn build```

## Start PHP Server FB / GOOGLE pages
```php -S localhost:8000```

## BRUNCH Builder
https://brunch.io/docs/config

### Plugin SocialSharing
@see https://www.npmjs.com/package/vue-social-sharing

### Plugin numeral
@see http://numeraljs.com/#format

#vue Plugin session
@see https://www.npmjs.com/package/vue-session

### Plugin money.js
special port because it was not ES5 compat
@see http://openexchangerates.github.io/money.js/

### Plugin Vue Stripe
@see https://www.npmjs.com/package/vue-stripe

### Plugin Vee Validate (form)
@see https://logaretm.github.io/vee-validate/

TODO new version is incompatible! UPDATE

Test Cards, @see https://stripe.com/docs/testing
NUMBER	BRAND
- 4242424242424242	Visa
- 4000056655665556	Visa (debit)
- 5555555555554444	Mastercard
- 2223003122003222	Mastercard (2-series)
- 5200828282828210	Mastercard (debit)
- 5105105105105100	Mastercard (prepaid)
- 378282246310005	    American Express
- 371449635398431	    American Express
- 6011111111111117	Discover
- 6011000990139424	Discover
- 30569309025904	    Diners Club
- 38520000023237	    Diners Club
- 3566002020360505	JCB
- 6200000000000005	UnionPay
 
### Plugin vue meta
@see https://github.com/declandewet/vue-meta

```
metaInfo: {
  title: 'Räucherstäbchen ',
  style: [
	{ cssText: '.foo { color: red }', type: 'text/css' }
  ],
  link: [
	{ rel: 'stylesheet', href: '/css/index.css' },
	{ rel: 'favicon', href: 'favicon.ico' }
  ],
   script: [
	{ innerHTML: '{ "@context": "http://schema.org" }', type: 'application/ld+json' }
  ],
  meta: [
  	{ vmid: 'description', name: 'still-&-sanitized', content: '& I will not be <sanitized>'}
	{'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
	{name: 'viewport', content: 'width=device-width, initial-scale=1'},
	{name: 'keywords', content: 'Fair Trade'},
	{name: 'description', content: 'Fair Trade and Sustainable Tourism'}  
  ],

}
```
### PWA Builder Google WORKBOX

workbox generateSW workbox-config.js
