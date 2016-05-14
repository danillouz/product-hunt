# Product Hunt
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]

[npm-image]: https://img.shields.io/badge/npm-v0.0.1-blue.svg
[npm-url]: https://www.npmjs.com/package/product-hunt
[travis-image]: https://travis-ci.org/danillouz/product-hunt.svg?branch=master
[travis-url]: https://travis-ci.org/danillouz/product-hunt
[coverage-image]: https://coveralls.io/repos/danillouz/product-hunt/badge.svg?branch=master&service=github
[coverage-url]: https://coveralls.io/github/danillouz/product-hunt?branch=master

Unofficial wrapper of the public Product Hunt API.

![Product Hunt](https://raw.githubusercontent.com/danillouz/product-hunt/master/img/ph-kitty.png "Product Hunt")

## Installation
`npm i -S product-hunt`

## Interface
The module exposes a couple of methods to build a request
Object which can be executed in order to retrieve products
from Product Hunt.

This is done by using **one** of the _category_ specific
request builder methods.

| Request Builder Method | Category | Default |
| --- | --- | --- |
| popular  | type  | yes |
| newest  | type  | no |
| today  | timeframe  | yes |
| yesterday  | timeframe  | no |
| daysAgo  | timeframe  | no |

After building the request Object, it can be executed by
using the `.exec()` method. This returns a `Promise` which
resolves with the retrieved products.

_When using multiple methods of the same category, the last
invoked method is used to build the request Object._

## Syntax
```javascript
productHunt
	.popular()
	.today()
	.exec()
	.then()
	.catch();
```

## Methods
After requiring the module, the following methods can be
used:

### .popular()
Request builder method used to retrieve the most popular
products from Product Hunt.

| Query Builder Method | Category | Default |
| --- | --- | --- |
| yes  | type  | yes |

#### Arguments
None.

#### Returns
`productHunt` Object which can be executed with the `.exec()`
method.

### .newest()
Request builder method used to retrieve the newest products
from Product Hunt.

| Query Builder Method | Category | Default |
| --- | --- | --- |
| yes  | type  | no |

#### Arguments
None.

#### Returns
`productHunt` Object which can be executed with the `.exec()`
method.

### .today()
Request builder method used to retrieve todays products from
Product Hunt.

| Query Builder Method | Category | Default |
| --- | --- | --- |
| yes  | timeframe  | yes |

#### Arguments
None.

#### Returns
`productHunt` Object which can be executed with the `.exec()`
method.

### .yesterday()
Request builder method used to retrieve yesterdays products
from Product Hunt.

| Query Builder Method | Category | Default |
| --- | --- | --- |
| yes  | timeframe  | no |

#### Arguments
None.

#### Returns
`productHunt` Object which can be executed with the `.exec()`
method.

### .daysAgo(n)
Request builder method used to retrieve Product Hunt
products from `n` days ago.

*`0` denotes today, `1` denotes yesterday, etc.*

| Query Builder Method | Category | Default |
| --- | --- | --- |
| yes  | timeframe  | no |

#### Arguments
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| n  | Number  | yes | The number of days in the past. _Must be `0` or greater._

#### Returns
`productHunt` Object which can be executed with the `.exec()`
method.

### .exec()
Executes the built request.

After executing the `productHunt` Object, the built request
Object will be reset, meaning it will default to _popular_
and _today_.

#### Arguments
None.

#### Returns
`Promise` Object with resolves with an products Array, where
each element is an [product Object](#product-object-representation).

## Product Object Representation
```json
{
	"id": 62330,
	"category_id": 1,
	"slug": "li-st",
	"user_id": 187835,
	"name": "li.st",
	"comment_count": 5,
	"tagline": "Create lists about anything, by B.J. Novak & Devin Flaherty",
	"topics": [
		{
			"id": 2,
			"name": "Android",
			"slug": "android",
			"trending": false
		},
		{
			"id": 8,
			"name": "iPhone",
			"slug": "iphone",
			"trending": false
		}
	],
	"created_at": "2016-05-11T11:10:05.558-07:00",
	"featured_at": "2016-05-12T00:01:00.000-07:00",
	"url": "/tech/li-st",
	"shortened_url": "/r/611d59ec8d02e8/62330",
	"vote_count": 51,
	"product_state": "default",
	"category": {
		"has_upcoming": true,
		"id": 1,
		"slug": "tech",
		"name": "Tech",
		"item_name": "product",
		"color": "#5898f1"
	},
	"exclusive": null,
	"user": {
		"id": 187835,
		"username": "bjnovak",
		"name": "B.J. Novak",
		"headline": "",
		"image_urls": {
			"60": "https://ph-avatars.imgix.net/187835/original?auto=format&fit=crop&crop=faces&w=60&h=60",
			"160": "https://ph-avatars.imgix.net/187835/original?auto=format&fit=crop&crop=faces&w=160&h=160"
		},
		"link": "/@bjnovak",
		"avatar_url": "https://ph-avatars.imgix.net/187835/original?auto=format&fit=crop&crop=faces&w=160&h=160",
		"is_maker": true
	},
	"thumbnail": {
		"id": 163210,
		"kindle_asin": null,
		"media_type": "image",
		"platform": null,
		"video_id": null,
		"url": null,
		"image_url": "https://ph-files.imgix.net/c02512f1-525b-42a8-8737-10cee482368f?auto=format&fit=max&h=570&w=430"
	},
	"shortened_link": "611d59ec8d02e8",
	"author": {
		"id": 187835,
		"username": "bjnovak",
		"name": "B.J. Novak",
		"headline": "",
		"image_urls": {
			"60": "https://ph-avatars.imgix.net/187835/original?auto=format&fit=crop&crop=faces&w=60&h=60",
			"160": "https://ph-avatars.imgix.net/187835/original?auto=format&fit=crop&crop=faces&w=160&h=160"
		},
		"link": "/@bjnovak",
		"avatar_url": "https://ph-avatars.imgix.net/187835/original?auto=format&fit=crop&crop=faces&w=160&h=160",
		"is_maker": true
	},
	"category_slug": "tech",
	"is_featured": true
}
```

## Example 1
Fetch yesterdays newest products:

```javascript
'use strict';

var productHunt = require('product-hunt');

var request = productHunt
	.newest()
	.yesterday();

var getProductsPromise = request.exec();

getProductsPromise
	.then(function productsFetcher(products) {
		console.log('products: ', products);
	})
	.catch(function errorHandler(err) {
		console.log('err: ', err.message);
	});
```

## Example 2
Fetch the most popular products of 3 days ago:

```javascript
'use strict';

import productHunt from 'product-hunt';

productHunt
	.popular()
	.daysAgo(3)
	.exec()
	.then(console.log.bind(console))
	.catch(console.error.bind(console))
```

## Example 3
Fetch todays most popular products by using default behavior:

```javascript
'use strict';

import productHunt from 'product-hunt';

async function todayPopularProducts() {
	try {
		const products = await productHunt.exec();

		console.log(`products: ${products}`);
	} catch (err) {
		console.error(`err: ${err}`);
	}
}

todayPopularProducts();
```

## Example 4
Using multiple methods of the same category:

```javascript
'use strict';

import productHunt from 'product-hunt';

async function todayPopularProducts() {
	try {
		const products = await productHunt
			.newest()
			.yesterday()
			.daysAgo(4)
			.today() // last used `timeframe` method
			.popular() // last used `type` method
			.exec();

		console.log(`products: ${products}`);
	} catch (err) {
		console.error(`err: ${err}`);
	}
}

todayPopularProducts();
```

When using multiple methods of the same category, the last
invoked method is used to build the request Object.

Therefore this example will result in fetching todays most
popular products.
