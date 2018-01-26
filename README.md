
## Filmvisarna

### How to use gulpfile.js

Open up terminal or commandprompt(cmd), then change your directory to the project you are working on. In this case Filmvisarna.
Do another npm install to get all the dependencies you will need. After that you can just type 

```bash
npm run watch 
```

and it will watch for changes in your folders js and scss, automatically compile and then reload the browser.

To write scss -  
Go to www/src/scss -
here you can create folders as you use to and files with scss extention. Then you have to import them in style.scss to get it to work.

To write js:  
Go to www/src/js - here you can create folders as you use to. I already put up a test class so you can see how to use it. You have to export classes then import it where you want to use it.

If it is not classes i.e just js-files then it seems like it is working just typing - 'import' then then src inside quotes.

/Rickard  

For template usage see JSDoc documentation in [renderer-base](https://github.com/Dacrol/Filmvisarna/blob/develop/www/src/js/classes/renderer-base.class.js). The basic usage is to simply bind a view template to a selector as follows: 

```javascript
Renderer.bindView('nav#some-id', 'some-view.html')
```
