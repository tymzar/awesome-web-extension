<img src="src/assets/img/128x128.png" width="64"/>

# Boilerplate for Manifest v3 Chrome extensions

## Tech stack

- React **18**,
- Google Chrome Extension Manifest **v3**,
- Esbuild,
- TypeScript,

## Pre-requisites and running

### Pre-requisites

1. Use Node >= **18**.
2. Clone/Download this repository.
3. Replace package's `name`, `description` and `repository` fields in `package.json`.
4. Replace the name of extension in `src/manifest.json`.

**_Note:_** If you encounter problems with `yarn start` then install `nodemon` globally with `yarn global add nodemon` and run `yarn start` again.

### Running:

1. Run `yarn install` to install dependencies.
2. Run `yarn start` to start the development server.
3. Go to `chrome://extensions/` and enable `Developer mode`.
4. Click on `Load unpacked` and select the `build` folder.

## Building

We are using esbuild, which allows for lightning fast builds. As well as hot reloading in development.

```
yarn build      # production build
yarn start      # development live reload server
```

**_Note:_** At the moment webpack is an experimental feature and is not recommended for development. You will encounter problems with hot reloading causing the extension to infinitely reload. Building with webpack has no issues.

## Project structure

Code of all the pages, popups and options are inside `src/pages` folder. Each page has its own folder with the following structure:

```
src
└── components
    └── Used for shared components between pages
└── pages
    └── background
        └── Used got background scripts https://developer.chrome.com/extensions/background_pages
    └── content
        └── Used for content scripts https://developer.chrome.com/extensions/content_scripts
    └── options
        └── Used for options page https://developer.chrome.com/extensions/options
    └── popup
        └── Used for popup page https://developer.chrome.com/extensions/user_interface#popup
    └── panel
        └── Used for devtools panel https://developer.chrome.com/extensions/devtools_panels
    └── devtools
        └── Used for attaching to devtools https://developer.chrome.com/extensions/devtools
    └── newtab
        └── Used for overriding new tab page https://developer.chrome.com/extensions/override
    └── manifest.json
        └── Defines the extension manifest https://developer.chrome.com/extensions/manifest
```

## Environment variables

Template file is located in `.env.template`.

To run the development server with environment variables, create a `.env.local` file in the root of the project and add the variables you want to use. For example:

```
NODE_ENV="development"
PORT=3000
```

Accordingly for `.env.production` file. Feel free to add any other variables you want to use.

## Links

- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)
- [Webpack documentation](https://webpack.js.org/concepts/)
