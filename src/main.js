import {Aurelia} from 'aurelia-framework';

import {bootstrap as webpackbootstrap} from 'aurelia-bootstrapper-webpack';
import $ from 'jquery'
import bootstrap from 'bootstrap'

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
//import '../styles/styles.css';
import'../sass/styles.scss'

import "../node_modules/foundation-sites/dist/foundation.css";
import "../styles/foundation.css"
//import foundation from 'foundation-sites'

webpackbootstrap(function(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  // aurelia.start().then(() => aurelia.setRoot('app', document.body));
  aurelia.start().then(a => a.setRoot('app', document.body))
    .then(a => {
      // Initialize any frameworks you want to use
      // var name = 'dan';
      //$(document.body).html(name);
       // $(document).foundation();
      
      console.log('foundation lloaded')
    });
});
