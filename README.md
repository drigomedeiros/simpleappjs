# Simple App JS

Welcome to Simple App JS, all and only Javascript you need in order to build a Single Page Applications with server side partial HTML rendering.

## Context

The web development landed on a standard of developing frontend applications running fully on browser, taking over not only DOM events, but also content redering. Despite all the upside on this approach and all the amazing frameworks built on top of it, the fact is that HTML redering can be perfectly and efficiently made on the server. Of course we don't need fully HTML page redenring and sometimes we need authorization to access some contents. That's when **Simple App** comes in handy. It consists on 2 script files and 2 simple HTML pages to handle server requests and insert the content in the page, in the most simple way existent - html + javascript: no bundles, no frameworks, no (except for Mustache) dependencies, only event listeners on anchors and http calls.

## How does it work

The **Simple APP** has the Single Page index.html that is in charge for loading simple.js and load the first content coming from the server into HTML body. This first content must be the body template for the whole application and must contain the **Simple Links** and a **HTML element with id "contentRoot"**, where all the subsequents contents will be loaded.

### Simple Links

**Simple Links** are where the magic lives. In order to always have the partial content rendered by the server inserted in the **contentRoot** element instead of navigating through pages, all the navigation links must have an event listener to do so. Simple App calls it Simple Links. So, every time that you need to load, in the server, a content that contains a link that has to be loaded on the contentRoot, this link must be defined as below:

    <a href="whatever" class=".simpleNavigation" simple-target="/sever/path/to/content">My link</a>

Simple App gets all the elements with class **".simpleNavigation",** intercepts the click event and make a call to the server in the address defined on **"simple-target"** attribute.

Voilá, Single Page Application is running.

### Securing the application

The majority of enterprise application needs to be secured behind some authorization mechanism. Server side HTML applications with browser navigation might do that defining cookies. Despite it is a standard approach, security recommendations always say that it's better to do so with JWT tokens on HTTP Headers. Simple App to the rescue!
Since Simple App is making calls to the server, there is no problem on handling and sending headers. To do so, it provides a login page that sends username and password provided by the user to any token issuer endpoint and store the JWT on browser session storage (only alive when window/tab is opened). After the log in, all the requests will include the server provided JWT token. 
This way of doing it prevent all browser navigation to protected contents since the browser, by default, doesn't send the JWT token.

## Using Simple App JS

That can't be simpler: copy this project content and paste on the static root of your server side HTML rendering MVC project. You can add your own script files, CSS, package.json dependencies and stuff to be referenced in server rendered pages or to give style and behavior for the index and login HTML files. Afterwards, use npm to install with `npm install` command and `npm build` to create the **simple_modules** folder for dependencies (needed to use Mustache template engine) =).

### Usage example

In this same repository you can find an usage example of Simple App JS on [branch simple_example]("https://github.com/drigomedeiros/simpleappjs/tree/simple_example"). Do the same steps to have the application builded: 1) `npm install`; 2) `npm build`. Then run the app with `npm run`. Access [http://localhost:8080](http://localhost:8080) in the browser and see it working.

If you want an example with AdminLTE style and Jakarta EE application, you can go to [Users MVC application]("https://github.com/drigomedeiros/users-mvc").  

## Documentation

Simple App is self documented and you can see it by running the tests with `npm test`

## Final words

The purpose of this tool is not to argue against JS all in browser applications/framework, but only provide a tool for those that find "too much stuff to run an APP that could be rendering in server with my favorite language/framework".

Hope you enjoy! Be happy!
