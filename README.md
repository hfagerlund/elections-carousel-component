# elections-carousel-component

[![Build Status](https://travis-ci.org/hfagerlund/elections-carousel-component.svg?branch=master)](https://travis-ci.org/hfagerlund/elections-carousel-component) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/66889e34a3ed41cea5320c0ce2f12cd9)](https://www.codacy.com/gh/hfagerlund/elections-carousel-component/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hfagerlund/elections-carousel-component&amp;utm_campaign=Badge_Grade) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A component-based carousel presentation of election results data from an external (JSON) API using pure [React](https://github.com/facebook/react).

Enables scrolling through the election results for all ridings using the Next and Back controls (via mouse or keyboard), displaying the number of votes and automatically calculating the percentage of the vote won by each candidate in each riding.

Results data is automatically checked for updates every 5 minutes (by [default](https://github.com/hfagerlund/elections-carousel-component#customizable-options)).

<img style="max-width:100%;" alt="Screenshot of elections-carousel-component on a page" src="/screenshots/screenshot_elections-html.png" align="center" /><br />
*Figure 1: screenshot of elections.html page*

- - -

## Demo

Available at: https://hfagerlund.github.io/elections-carousel-component/

- - -

## Quick start

```console
# clone the repo
$ git clone https://github.com/hfagerlund/elections-carousel-component.git

# install dependencies
$ yarn

# launch local server (for data feed)
$ http-server

## browse to http://127.0.0.1:8080/elections.html

```

- - -

## Usage
### Customizable Options
The following props can be set on the `App` component in order to customize it:

| Prop | Type<br><a id="default" name="default">(Default value) | Description |
| --- | --- | --- |
| **componentTitle** | `string`<br>*default value:* `Election Results` | Main `<h1>` heading/title text (in the `<App />` component) |
| **resultUpdatesEnabled** | `bool`<br>*default value:* `true` | Set to `true`|`false` to enable|disable automatic data updates from the (JSON) feed. |
| **updatesDisabledMessage** | `string`<br>*default value:* `Final results reported. All polls are now closed.` | Text displayed in the updates status 'bubble' (ie. directly following the `<h1>` heading) when automatic data updates from the (JSON) feed are disabled. |
| **updateIntervalInMilliseconds** | `integer`<br>*default value:* `300000` (ie. 5 mins.) | Time intervals (in msec) at which the (JSON) feed is checked for data updates |
| **url** | `string`<br>*default value:* `http://127.0.0.1:8080/src/assets/fixtures/results.js?callback=` | The URL for the (JSON) data feed |

### Examples

**Example 1** - To display a (custom) title of '2011 Election Results', with the (default) status message 'Final results reported. All polls are now closed.', modify `/src/js/elections/index.jsx` as shown below:

**index.jsx** -
```
import React from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

render(
  <App
    componentTitle="2011 Election Results"
    resultUpdatesEnabled={false}
  />,
  document.getElementById('app')
);
```

**Example 2** - Update data results at 3 minute intervals (instead of the default 5 mins.):

**index.jsx** -
```
// ...

render(<App updateIntervalInMilliseconds={180000} />, document.getElementById('app'));
```

**Example 3** - Use all default settings:

**[index.jsx](https://github.com/hfagerlund/elections-carousel-component/blob/master/src/js/elections/index.jsx)** -
```
// ...

render(<App />, document.getElementById('app'));
```
- - -

## Running the Build

For a **development** environment:

```
$ yarn run dev

```

For a **production** environment:

```
$ yarn run build:production

```

- - -
## Running the Unit Tests

Run all tests:

```
$ yarn run test

```

- - -
## License
Copyright (c) 2018 Heini Fagerlund. Licensed under the [BSD-3-Clause license](https://github.com/hfagerlund/elections-carousel-component/blob/master/LICENSE).
