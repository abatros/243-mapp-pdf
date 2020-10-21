import './preview-panel.html'


const TP = Template.preview_panel;
/***************************************************************************

  (1) waiting for query
  (2) searching
  (3) displaying results

****************************************************************************/


TP.onCreated(function() {
  const tp = this;
  console.log('preview-panel.onCreated')
})

TP.onRendered(function() {
  console.log('preview-panel.onRendered')
})

TP.helpers({
  href: ()=>{
    const href = Session.get('pdf-url')
    console.log(`@25 helper href:`,{href})
    if (!href.indexOf(/v2/))  {
      return href + '&view=FitH,top&embedded=true';
    }
    console.log(`@26 helper href:`,{href})
    return href;
  }
})


TP.events({
  'click .js-search-list': (e,tp)=>{
    e.preventDefault()
    console.log('click')
    Session.set('panel','search-panel')
  }
})
