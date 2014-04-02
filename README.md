# Sofa Component Seed [![Build Status](https://travis-ci.org/sofa/sofa-component-seed.png?branch=master)](https://travis-ci.org/sofa/sofa-component-seed)

> Sofa Web SDK Component Seed

Use this component seed as kickstarter for new sofa components. Make sure to
go through the following steps to get started.

## Installation

Clone the repository via git:

```sh
$ git clone https://github.com/sofa/sofa-component-seed.git sofa-component-name
```

Where `sofa-component-name` should be the actual name of your component. Here are
some examples:

- sofa-wishlist-service
- sofa-image-zoom-service

Next, navigate to your project and install all dependencies:

```sh
$ cd sofa-component-name
$ npm install
```

Once this is done you have to update a few files according to your  component name.

## Preparation

### Gruntfile.js

Open the `Gruntfile.js` file and change the line 22 accordingly:

```js
component_name: 'sofa.componentName'
```

Make sure to use camel case syntax and always prefix your component names with `sofa.`

### bower.json

Please change the following properties in the `bower.json` file accordingly:

- name - The component name
- main - The generated distribution file

### package.json

Please change the following properties in the `package.json` file accordingly:

- name - The component name
- description - Component description
- main - The distribution file
- repository.url - URL to the repository on GitHub
- bugs.url - URL to the issues list on GitHub

### README

Last but not least, don't forget to update the README.

## Developing

This component seed comes with a few grunt task to make your life easier when
developing your component.

- `grunt watch` - Tests your code, builds a production ready version, keeps watching
- `grunt build` - Builds a production ready version of your component
- `grunt test` - Only runs unit tests

Have fun!
