<img src="src/assets/img/128x128.png" width="64"/>

# Boilerplate for Manifest v3 Chrome extensions

## Tech stack

- React **18**,
- Google Chrome Extension Manifest **v3**,
- Esbuild,
- TypeScript,

## Pre-requisites and running

### Pre-requisites

1. Use Node > **22.7.0**.
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

## Middleware System (useReducer)

This extension includes a sophisticated middleware system built with React's `useReducer` for managing Chrome extension communication between content scripts and React components.

### Features

- **State Management**: Centralized state management using `useReducer`
- **Type Safety**: Full TypeScript support for all actions and state
- **Error Handling**: Comprehensive error states and loading indicators
- **React Integration**: Easy integration with React components via context
- **Chrome Extension Communication**: Seamless message passing between content scripts and React components
- **Modern Architecture**: Pure `useReducer` implementation with no legacy code
- **Cross-Context Support**: Works in both extension pages (popup, options) and regular web pages

### How It Works

The middleware system automatically detects its context and behaves accordingly:

#### **Extension Pages** (Popup, Options)

- Detects `chrome-extension:` protocol
- Sends messages to active tab's content script using `chrome.tabs.sendMessage()`
- Perfect for controlling web pages from extension UI

#### **Content Scripts** (Regular Web Pages)

- Detects regular web page context
- Listens for messages using `chrome.runtime.onMessage.addListener()`
- Executes DOM manipulation and responds to extension commands

### Usage

#### 1. Wrap your app with MiddlewareProvider

```tsx
import { MiddlewareProvider } from "./content/modules/middleware";

function App() {
  return (
    <MiddlewareProvider>
      <YourComponents />
    </MiddlewareProvider>
  );
}
```

#### 2. Use the middleware in components

```tsx
import { useMiddleware } from "./content/modules/middleware";

function MyComponent() {
  const { state, actions } = useMiddleware();

  const handleSendColors = () => {
    chrome.runtime.sendMessage({
      type: "POST_COLORS",
      colors: ["#ff0000", "#00ff00", "#0000ff"],
    });
  };

  return (
    <div>
      <p>Loading: {state.isLoading ? "Yes" : "No"}</p>
      <p>Error: {state.error || "None"}</p>
      <p>Color Boxes: {state.colorBoxes.length}</p>

      <button onClick={handleSendColors}>Send Colors</button>
      <button onClick={actions.clearColorBoxes}>Clear Boxes</button>
    </div>
  );
}
```

### Available Actions

- `setLoading(isLoading: boolean)` - Set loading state
- `setError(error: string)` - Set error message
- `setSuccess(response: ContentMessageResponse)` - Set success response
- `addColorBox(id: string, color: string, element: HTMLElement)` - Add color box to state
- `removeColorBox(id: string)` - Remove color box by ID
- `clearColorBoxes()` - Clear all color boxes

### State Structure

```typescript
interface MiddlewareState {
  isLoading: boolean;
  error: string | null;
  lastResponse: ContentMessageResponse | null;
  colorBoxes: Array<{
    id: string;
    color: string;
    element: HTMLElement;
  }>;
}
```

### Message Types

- `GET_BODY` - Retrieve document title and HTML body content from the active web page
- `POST_COLORS` - Send color array to content script for rendering color boxes
- `CLEAR_BOXES` - Clear all color boxes from the page

### What Each Function Does

#### **Get Body**

- Retrieves the current web page's title and HTML content
- Useful for page analysis, content extraction, or debugging
- Shows page title and body length in the UI
- Works on any website where the content script is injected

#### **Send Colors**

- Creates colored boxes on the web page
- Each color becomes a 32x32px box positioned at the top
- Automatically clears existing boxes before adding new ones
- Great for visual testing and page manipulation

#### **Clear Boxes**

- Removes all color boxes from the web page
- Cleans up both DOM elements and React state
- Useful for resetting the page state

### Examples in the Extension

The middleware is demonstrated in:

- **Popup**: Shows middleware state and provides buttons to test functionality
- **Options**: Displays middleware state with enhanced UI and color palette sending

## DevTools Panels Setup

### Understanding the Directory Structure

- **`src/pages/devtools/`** - Creates DevTools panels for debugging

  - `index.ts` - Creates panel using `chrome.devtools.panels.create()`
  - `render.tsx` - React entry point
  - `DevTools.tsx` - Debugging interface component

- **`src/pages/panel/`** - Regular extension page (popup/options style)
  - `index.tsx` - React entry point
  - `Panel.tsx` - Functional interface component

### Quick Setup

1. **Create DevTools panel script** (`src/pages/devtools/index.ts`):

```typescript
chrome.devtools.panels.create(
  "Extension DevTools",
  "32x32.png",
  "devtools/devtools.html"
);
```

2. **Create React entry** (`src/pages/devtools/render.tsx`):

```typescript
import React from "react";
import { createRoot } from "react-dom/client";
import { PageRoot } from "../../components/PageRoot/PageRoot";
import { DevTools } from "./DevTools";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <PageRoot>
    <DevTools />
  </PageRoot>
);
```

3. **Update build config** (`scripts/esbuild.config.ts`):

```typescript
entryPoints: [
  "./src/pages/devtools/index.ts",
  "./src/pages/devtools/render.tsx",
],
```

4. **Add to manifest** (`src/manifest.json`):

```json
{ "devtools_page": "devtools/devtools.html" }
```

### Accessing Panels

- Load extension → Open Chrome DevTools (F12) → Look for extension tab

### Avoiding Build Conflicts

Use different output names if files conflict:

```typescript
entryPoints: [
  { in: "./src/pages/devtools/index.ts", out: "devtools/panel-creator" },
  "./src/pages/devtools/render.tsx",
],
```

## Links

- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)
- [Webpack documentation](https://webpack.js.org/concepts/)
- [React useReducer documentation](https://react.dev/reference/react/useReducer)
