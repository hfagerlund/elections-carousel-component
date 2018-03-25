# elections-carousel-component

[![Build Status](https://travis-ci.org/hfagerlund/elections-carousel-component.svg?branch=master)](https://travis-ci.org/hfagerlund/elections-carousel-component) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0c79a9df9e7c4847b1de77099bae58d4)](https://www.codacy.com/app/hfagerlund/elections-carousel-component?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hfagerlund/elections-carousel-component&amp;utm_campaign=Badge_Grade) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Carousel presentation of data from a JSON feed of election results.

Enables scrolling through the election results for all ridings using the Next and Back controls (via mouse or keyboard), displaying the number of votes and automatically calculating the percentage of the vote won by each candidate in each riding.

<img style="max-width:100%;" alt="Screenshot of elections-carousel-component on a page" src="/screenshots/screenshot_elections-html.png" align="center" /><br />
*Figure 1: screenshot of elections.html page*

- - -

## Demo

Available at: https://hfagerlund.github.io/elections-carousel-component/

- - -

## Quick start

```
# clone the repo
$ git clone https://github.com/hfagerlund/elections-carousel-component.git

# install dependencies
$ yarn

# launch local server (for data feed)
$ http-server

## browse to http://127.0.0.1:8080/elections.html

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
