import {Aurelia} from 'aurelia-framework';
import {bootstrap as webpackbootstrap} from 'aurelia-bootstrapper-webpack';
import '../node_modules/foundation-sites/dist/foundation.css';
import'../sass/styles.scss'
import foundation from 'foundation-sites'

webpackbootstrap(function(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  // aurelia.start().then(() => aurelia.setRoot('app', document.body));
  aurelia.start().then(a => a.setRoot('app', document.body))
    .then(a => {
      // Initialize any frameworks you want to use
       $(document).foundation();
       console.log('foundation loaded')
    });
});
