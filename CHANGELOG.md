# Changelog:

- - -
## Unreleased
*(last updated: 2018-04-20)*

- - -
## Releases

## 0.3.2 - 2018-04-20

### New features:
* Issue [#12](https://github.com/hfagerlund/elections-carousel-component/issues/12): Spinner
 * Adds accessible, cross-browser indeterminate progressbar and disables/re-enables carousel controls dependending on state of data loading/updates

### Changed:
* Updates [demo page](https://hfagerlund.github.io/elections-carousel-component/) to [v0.3.2](https://github.com/hfagerlund/elections-carousel-component/releases/tag/v0.3.2)
* Issue [#5 - Tests: Improve coverage](https://github.com/hfagerlund/elections-carousel-component/issues/5) - *work in progress*
 * Excluded unnecessary files from test coverage reports
 * Improved code style
 * Improved validation of properties
 * Removed duplication of mock data (variables) in tests
 * Refactored source code for testability
* *Setting/configuration change only:* Disabled automatic data updates on [demo page](https://hfagerlund.github.io/elections-carousel-component/)

### Fixed:
* [Accessibility fixes/improvements](https://github.com/hfagerlund/elections-carousel-component/issues/12) to Ridings wrapper and controls
* Documentation improvements: [README](https://github.com/hfagerlund/elections-carousel-component/blob/master/README.md) updates

- - -
## 0.2.0 - 2018-04-02

### New features:
* Issue [#3](https://github.com/hfagerlund/elections-carousel-component/issues/3): Automatic data updates
* List of new [customizable options](https://github.com/hfagerlund/elections-carousel-component#customizable-options)

### Changed:
* Vertical spacing of `<h1>` and Ridings component (to accomodate new display for data update status)
* Test improvements (includes better coverage)

### Fixed:
* [Code cleanup, refactoring](https://github.com/hfagerlund/elections-carousel-component/blob/master/src/js/elections/components/App.jsx)

- - -
## 0.1.1 - 2018-03-29

### New features:
* Adds [demo page](https://hfagerlund.github.io/elections-carousel-component/)
* Riding/slide number display - (example: 8 of 10)

### Changed:
* Renames `test` directory to `__tests__` (as per [Jest](https://github.com/facebook/jest) naming conventions)
* Fixes ESLint configuration (sets to [Jest](https://github.com/facebook/jest) environment)

### Fixed:
* Issue [#1](https://github.com/hfagerlund/elections-carousel-component/issues/1): Long riding names overlapped by 'Next' button
* Test improvements: 
 * automates code formatting of tests
 * removes/updates obsolete Jest snapshots
 * correction to mock results (make props available to tests)

- - -
## 0.1.0 - 2018-03-21 
* Initial version, built using pure [React (v16.2.0)](https://github.com/facebook/react).

- - -
#### *Notes*: 
* All dates shown in YYYY-MM-DD format
* Using [SemVer](http://semver.org/)

