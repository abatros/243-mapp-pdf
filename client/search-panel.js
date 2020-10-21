import './search-panel.html'
import {museum_ddp} from './ddp.js' // not the package

const TP = Template.search_panel;

//const dir3list = new ReactiveArray(); // set by autorun.
const slist = new ReactiveVar();
const verbose =0;


Tracker.autorun(()=>{
  let pageIndex = Session.get('page-index');
  console.log(`AUTORUN (page-index) `,pageIndex)
  if (pageIndex == undefined) return;
  if (!slist.curValue) return;

  const slen = slist.curValue.length;

  if (pageIndex <0) pageIndex +=slen;
  else if (pageIndex >=slen) pageIndex -=slen;

  const item = slist.curValue[pageIndex]
  console.log('autorun:', {item})

})


Tracker.autorun(async ()=>{
  const query = Session.get('search-query')
  if (!query) return;


  const museum_ddp_ready = Session.get('museum-ddp-ready')
  if (!museum_ddp_ready) return;

  const ddp = Meteor.museum_ddp;
  if (!ddp) {
    console.log(`[${module.id}] autorun ddp not-ready`)
    return;
  }

  console.log(`[${module.id}] autorun ddp:${ddp.status} `,{ddp})

  if (!query) {
    return;
  }


  try {
    const data = await call('pdf-pages-count');
    console.log(`************** get_page_count =>`, data.result)
    const data2 = await call('pdf-pages-count');
    console.log(`************** get_page_count2 =>`, data2.result)
//    const data3 = await call('deep-search', [{vpath:'dkz.yellow', query:'aws'}]);
//    console.log(`************** deep-search =>`, {data3})

    const data3 = await call('deep-search', [{vpath:'museum', query:'charleroi'}]);
    console.log(`************** deep-search =>`, {data3})


    const slist = reformat(data3.result.pages);
    Session.set('slist',slist)
  }

  catch (err) {
    console.log({err})
  }

  /*
  } */


  //let {vpath, query} = cmd;

})

function reformat(pages) {
  pages = pages.map(it =>{
    const au = it.data && it.data.h1 && it.data.h1.replace(/[\s\(\)\-\.]+/g,' ')
        .trim().replace(/\s+/g,'-').toLowerCase();
    const xid_ = it.data && `${it.data.yp} - ${it.data.indexNames[0]}`

    Object.assign(it,{
      title: it.xid.replace(/[0-9]*\.pdf$/,''),
      href: it.data && `${it.xid}-${it.data.yp}-${au}`,
      xid_,
    })

    if (xid_) {
        it.xid= xid_;
        it.title = it.xid
    } else {
      // pdf-search
      it.title += ` (p.${it.pageno})::${it.path.replace('museum.','').replace('pdf.','')}`
    }

    return it;
  })

  ;(verbose>0) && console.log(`befor sort data:`,data)


  /*************************************************************

    Sort on date : xid

  **************************************************************/

  pages.sort((a,b) =>{
    const _a = a.title.toLowerCase()
    const _b = b.title.toLowerCase()
    if (_a < _b) return -1;
    if (_a > _b) return 1;
    return 0;
  })

return pages;
}


async function call(method, argv=[]) {
  return new Promise((resolve,reject) =>{
    const ddp = Meteor.museum_ddp;
    if (!ddp) {
      console.log(`[${module.id}] ddp not-ready`)
      reject('ddp-not-ready');
      return;
    }

    console.log({ddp})

    const m1 = ddp.method(method,argv);
console.log(`@48 m1:`,m1)
    ddp.on("result", message => {
      console.log(`@result: `,{message})
      if (message.id === m1) {
        if (message.error) {
          reject(message.error); return;
        }
        console.log({message})
        resolve(message)
      }

      // here : not-for-me.
    });
  })
} // call.



TP.onCreated(function() {
  console.log('search-panel.onCreated')
})


TP.onRendered(function() {
  console.log('search-panel.onRendered')
  Session.set('search-query','charleroi')
})

TP.helpers({
  slist: ()=>{
    return Session.get('slist');

//    const x = slist && slist.list(); // reactive
//    let y = x.array();
//    return y;
  },
  split_newlines: (txt)=>{
    return txt.replace(/\\n/g,'<span style="display:inline-block; height:22px;">&hellip;</span><br>&hellip; ')
  },
});


TP.events({
  'click a': (e,tp)=>{
    e.preventDefault();
    console.log({e})
    const href = e.currentTarget.href.replace(/\&view=.*$/,'');
    console.log(`click =>`,{href})

    if (href.endsWith('.html')) {
      Session.set('panel','preview-panel')
      const _href = href.replace('https://ultimheat.com/museum-s3/','').substring(0,4);
      const url = `https://museum.ultimheat.com/v2/page/${_href}`;
      console.log({url})
      Session.set('pdf-url',url)
      Session.set('panel','preview-panel')
      Session.set('page-index',3);
      console.log({Session});
      return;
    }

    console.log({Session});

    Session.set('panel','preview-panel')
    Session.set('pdf-url',href)

  }
})
