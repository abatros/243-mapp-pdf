
FlowRouter.route('/', { name: 'edit-article',
  triggerEnter: [
    function(context, redirect) {
    }
  ],
  action: function(params, queryParams){
    const verbose =1;
    console.log('Router::action for: ', FlowRouter.getRouteName());
    document.title = "mapp-client";
    console.log(`@595 leaving router (edit-article) :`,queryParams)
    Session.set('panel','search-panel')
//    BlazeLayout.render('search-panel');
  }
});


FlowRouter.route('/preview', { name: 'preview-article',
  triggerEnter: [
    function(context, redirect) {
    }
  ],
  action: function(params, queryParams){
    const verbose =1;
    console.log('Router::action for: ', FlowRouter.getRouteName());
    document.title = "mapp-client";
    console.log(`@595 leaving router (preview-article) :`,queryParams)
    Session.set('panel','preview-panel')
    Session.set('pdf-url','https://ultimheat.com/s3-museum/2004%20Fonderies%20de%20fer%20et%20poeleries.pdf#page=96')
//    BlazeLayout.render('search-panel');
  }
});


FlowRouter.route('/page/:fn', { name: 'preview-page',
  triggerEnter: [
    function(context, redirect) {
    }
  ],
  action: function(params, queryParams){
    const verbose =1;
    console.log('Router::action for: ', FlowRouter.getRouteName());
    document.title = "mapp-client";
    console.log(`@595 leaving router (preview-article) :`,queryParams)
    Session.set('panel','preview-panel')

    /*
    //    Session.set('pdf-url',`https://ultimheat.com/s3-museum/${params.fn}`)
    console.log({params})
    console.log('window.location.hash',window.location.hash)
    console.log(`params.fn:`,params.fn)
//    params.fn = '1933%20Lentz%20(Section%202)%2020150629.pdf'
    */

    Session.set('pdf-url',`https://ultimheat.com/s3-museum/${params.fn}${window.location.hash}`);
  }
});
