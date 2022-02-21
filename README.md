# React-IdentiIcon

This project provides a React UI component which takes a valid `Polkadot` address and generates a svg image.

## Usage
1. Get the package  
`yarn add @osn/react-identicon`
2. Import as a ES mudule  
`import  Identicon  from "react-idenicon";`
3. Apply in a react based project
`<Identicon value={address} size={size} />`

## Develop

To stat a demo, get this project, run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To test importation or deploy to npmjs.com, run: 

### `yarn build`

Builds the component in `dist` directory, use `yarn link` under `react-idenicon` and then `yarn link react-idenicon` under the project wants to use this.
