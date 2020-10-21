import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './search-panel.js';
import './preview-panel.js';
import './router.js';

import i18n from 'meteor/universe:i18n';
console.log({i18n})
import {i18n_setup} from './i18n-dkz.js';
i18n_setup();

//import '../i18n/en.i18n.yml';
//import '../i18n/fr.i18n.yml';


i18n.onChangeLocale (function(newLocale){
    console.log(`new-locale:`,newLocale);
    return;
    i18n.loadLocale(newLocale)
    .then(x=>{
      console.log(`then x:`,x)
    })
})

i18n.setOptions({
  defaultLocale:'fr',
  purify: (s)=>s
})


BlazeLayout.setRoot('body');

// ---------------------------------------------------------------------------

Template.body.onCreated(function() {
  console.log('body.onCreated')
})

Template.body.onRendered(function() {
  const tp = this;
  console.log('body.onRendered')

  tp.autorun(() =>{
    let panel = Session.get('panel');
    if (!panel) {
      return;
    }

    console.log(`autorun [${module.id}]`,{panel})

    const panels = document.querySelectorAll('vbox.a-panel')
    console.log({panels})
    panels.forEach(p =>{
      console.log(`autorun panel <${p.id}>`)
      if (p.id == panel) {
        p.classList.remove('hidden')
      } else {
        p.classList.add('hidden')
      }
    })


//    Tracker.afterFlush(()=>{
//      console.log('afterflush')
//    })


    panels.forEach(p =>{
//      console.log(`panel <${p.id}>`)
      if (p.id == panel) {
//        p.classList.remove('hidden')
      } else {
  //      p.classList.add('hidden')
      }
    })


  }) // autorun

})


// ---------------------------------------------------------------------------


Template.registerHelper('isPanel', function(x) {
  const panel = Session.get('panel');
  console.log({panel})
  return (panel == x);
});

Template.registerHelper('session', function(x) {
  return Session.get(x)
});
