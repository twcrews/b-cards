(this["webpackJsonpb-cards"]=this["webpackJsonpb-cards"]||[]).push([[0],{109:function(e,n,t){},134:function(e,n){},156:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t.n(c),i=t(10),r=t.n(i),o=t(91),l=t(24),s=t(14),d=t(32),j=t(209),u=t(210),f=t(211),b=t(212),h=t(213),O=t(157),x=t(226),g=t(214),m=t(227),v=t(206),k=t(159),p=t(215),C=t(228),y=t(202),w=t(92),N=t(220),S=t(221),D=t(222),F=t(225),E=t(207),A=t(216),I=t(217),T=t(208),B=t(218),W=t(219),L=t(205),U=t(223),V=t(224),G=(t(109),t(193)),R=t(158),J=t(57),P=t(194),M=t(195),z=t(196),q=t(197),H=t(198),K=t(199),Z=t(187),Y=t(191),$=t(192),_=t(50),Q=t.n(_),X=t(2);function ee(e){return Object(X.jsxs)(Z.a,{elevation:3,square:!0,className:"Card",children:[Object(X.jsxs)("div",{className:"CardHeader BorderBox CenterVertical",children:[Object(X.jsx)("div",{className:"EvenFlex LeftAlign",children:Object(X.jsx)("span",{children:Object(X.jsx)(d.a,{variant:"subtitle1",className:"GrayText",children:e.flipped?"BACK":"FRONT"})})}),Object(X.jsx)("div",{className:"EvenFlex CenterAlign",children:Object(X.jsx)("span",{children:Object(X.jsx)(d.a,{variant:"h6",children:e.number+" of "+e.count})})}),Object(X.jsx)("div",{className:"EvenFlex RightAlign",children:Object(X.jsx)("span",{children:Object(X.jsx)(O.a,{className:e.flagged?"FlagButtonActive":"",variant:e.flagged?"contained":"text",startIcon:Object(X.jsx)(Y.a,{color:"inherit"}),onClick:function(){e.onFlag()},disableElevation:!0,children:e.flagged?"Flagged":"Flag"})})})]}),Object(X.jsx)("div",{className:"CardContent",children:Object(X.jsx)("div",{children:Q()(e.content)})}),Object(X.jsx)("div",{className:"CardTools",children:Object(X.jsx)(O.a,{onClick:e.onFlip,startIcon:Object(X.jsx)($.a,{}),children:"Flip"})})]})}var ne=t(88),te=t.n(ne);function ce(e){var n,t,i,r,o=Object(c.useState)(!1),l=Object(s.a)(o,2),d=l[0],j=l[1],u=Object(c.useState)(0),f=Object(s.a)(u,2),b=f[0],h=f[1],x=Object(c.useState)(!0),g=Object(s.a)(x,2),m=g[0],v=g[1],k=Object(c.useState)(null),p=Object(s.a)(k,2),C=p[0],y=p[1],w=function(){return b+1},N=function(){var n=e.deck.cards[b];return n?n.id:0},S=function(){return e.deck.cards.length-1},D=b===e.deck.cards.length-1,F=0===b,E=function(e){d?(j(!1),e()):e()},A=function(){j(!d)},I=function(n){e.onCardChange(n,N(),d)},T=function(){y("right"),v(!1),E((function(){return setTimeout((function(){y("left"),v(!0),h((function(e){return e<S()?e+1:S()}))}),230)}))},B=function(){y("left"),v(!1),E((function(){return setTimeout((function(){y("right"),v(!0),h((function(e){return e>0?e-1:0}))}),230)}))},W=function(){y("right"),v(!1),E((function(){return setTimeout((function(){y("left"),v(!0),h(e.deck.cards.length-1)}),230)}))},L=function(){y("left"),v(!1),E((function(){return setTimeout((function(){y("right"),v(!0),h(0)}),230)}))},U=function(n,t){j(!1),e.onAddCard(n,t),h(e.deck.cards.length-1)},V=function(){U(e.deck.cards[b].front,e.deck.cards[b].back)},Z=function(){e.flaggedOnly&&e.deck.cards.length-1===b&&h((function(e){return 0===e?0:e-1})),e.onFlag(N())},Y=function(n){if(e.focus)switch(n.key){case"ArrowLeft":F||B();break;case"ArrowRight":D||T();break;case"ArrowUp":F||L();break;case"ArrowDown":D||W();break;case" ":n.preventDefault(),n.stopPropagation(),A()}};Object(c.useEffect)((function(){return window.addEventListener("keydown",Y),function(){return window.removeEventListener("keydown",Y)}}));var $=Object(X.jsxs)(a.a.Fragment,{children:[Object(X.jsxs)(G.a,{children:[Object(X.jsx)(O.a,{variant:"contained",color:"primary",startIcon:Object(X.jsx)(P.a,{}),disabled:F,onClick:L,children:"First"}),Object(X.jsx)(O.a,{variant:"contained",color:"primary",startIcon:Object(X.jsx)(M.a,{}),disabled:F,onClick:B,children:"Back"})]}),Object(X.jsxs)(G.a,{children:[Object(X.jsx)(O.a,{variant:"contained",color:"primary",startIcon:e.shuffled?Object(X.jsx)(z.a,{}):Object(X.jsx)(q.a,{}),disabled:1===e.deck.cards.length,onClick:function(){E((function(){return h(0)})),e.onShuffle()},children:"Shuffle"}),Object(X.jsx)(O.a,{variant:"contained",color:"primary",startIcon:e.flaggedOnly?Object(X.jsx)(z.a,{}):Object(X.jsx)(q.a,{}),disabled:e.deck.cards.filter((function(e){return e.flagged})).length<1,onClick:function(){E((function(){return h(0)})),e.onFlaggedOnly()},children:"Flagged Only"})]}),Object(X.jsxs)(G.a,{children:[Object(X.jsx)(O.a,{variant:"contained",color:"primary",endIcon:Object(X.jsx)(H.a,{}),disabled:D,onClick:T,children:"Next"}),Object(X.jsx)(O.a,{variant:"contained",color:"primary",endIcon:Object(X.jsx)(K.a,{}),disabled:D,onClick:W,children:"Last"})]})]});return Object(c.useEffect)((function(){h(0),j(!1)}),[e.deck.id]),Object(X.jsxs)("div",{className:"DeckView",children:[Object(X.jsx)("div",{className:"CardSpace",children:Object(X.jsx)(R.a,{in:m,direction:C,children:Object(X.jsx)("div",{style:{height:"100%",width:"100%"},children:Object(X.jsxs)(te.a,{isFlipped:d,flipDirection:"vertical",flipSpeedBackToFront:.3,flipSpeedFrontToBack:.3,children:[Object(X.jsx)(ee,{id:N()+"-front",flipped:!1,onEditorChange:I,onFlip:A,onDuplicate:V,number:w(),count:e.deck.cards.length,content:null===(n=e.deck.cards[b])||void 0===n?void 0:n.front,flagged:null===(t=e.deck.cards[b])||void 0===t?void 0:t.flagged,onFlag:Z,flaggedOnly:e.flaggedOnly}),Object(X.jsx)(ee,{id:N()+"-back",flipped:!0,onEditorChange:I,onFlip:A,onAddCard:function(){U("","")},onDuplicate:V,number:w(),count:e.deck.cards.length,content:null===(i=e.deck.cards[b])||void 0===i?void 0:i.back,flagged:null===(r=e.deck.cards[b])||void 0===r?void 0:r.flagged,onFlag:Z,flaggedOnly:e.flaggedOnly})]})})})}),Object(X.jsx)(J.a,{className:"Toolbar",elevation:3,children:$})]})}var ae=t(90),ie=t(203),re=t(204);function oe(e){var n=Object(c.useState)(null),t=Object(s.a)(n,2),a=t[0],i=t[1],r=function(e){i(e)};return Object(c.useEffect)((function(){a&&document.getElementById(e.card.id+"-"+a).focus()}),[a,e.card.id]),Object(X.jsxs)("div",{className:"EditCardContainer",children:[Object(X.jsx)("div",{id:e.card.id,className:"EditCardFlex",children:["front","back"].map((function(n){return Object(X.jsxs)(Z.a,{square:!0,elevation:3,className:"EditCard",children:[Object(X.jsx)(d.a,{style:{color:"#888"},variant:"caption",children:n.toUpperCase()}),Object(X.jsxs)("div",{className:"EditCardContent",onClick:function(){return r(n)},children:[a===n||e.card[n]&&""!==e.card[n]?null:Object(X.jsx)(d.a,{variant:"h5",className:"CenterAbsolute GrayText",children:"No content"}),Object(X.jsx)(ae.a,{style:{textAlign:"center"},id:e.card.id+"-"+n,inline:!0,onEditorChange:function(t,c){return function(n,t,c){e.onChange(n,c)}(t,0,n)},onKeyDown:function(e){return e.stopPropagation()},onKeyUp:function(e){return e.preventDefault()},onFocus:function(){return r(n)},onBlur:function(){return function(e){a===e&&i(null)}(n)},value:e.card[n],init:{menubar:!1,toolbar:"undo redo | fontsizeselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",content_style:"body { font-family: Roboto; font-size: 18pt; text-align: center}"}})]})]},n)}))}),Object(X.jsxs)("div",{className:"EditControls",children:[Object(X.jsx)(C.a,{title:"Flag card",children:Object(X.jsx)(y.a,{onClick:function(){e.onFlag(e.card.id)},className:e.card.flagged?"FlagButtonActive":null,children:Object(X.jsx)(Y.a,{})})}),Object(X.jsx)(C.a,{title:"Swap content",children:Object(X.jsx)(y.a,{onClick:function(){var n=e.card.front;e.onChange(e.card.back,"front"),e.onChange(n,"back")},children:Object(X.jsx)(ie.a,{})})}),Object(X.jsx)(C.a,{title:"Clear content",children:Object(X.jsx)(y.a,{onClick:function(){e.onChange("","front"),e.onChange("","back")},children:Object(X.jsx)(re.a,{})})}),Object(X.jsx)(C.a,{title:"Delete card",children:Object(X.jsx)(y.a,{onClick:function(){e.onDelete(e.card.id)},children:Object(X.jsx)(L.a,{})})})]})]})}function le(e){var n=Object(c.useState)(!1),t=Object(s.a)(n,2),a=t[0],i=t[1],r=function(n){e.onFlag(n)};return Object(c.useEffect)((function(){window.scrollTo(0,document.body.scrollHeight)}),[e.deck.cards.length]),Object(c.useEffect)((function(){if(a){var n=e.deck.cards.length-1;i(!1),document.getElementById(e.deck.cards[n].id+"-front").focus()}}),[a,e.deck.cards]),Object(X.jsxs)("div",{style:{marginBottom:"80px"},children:[Object(X.jsx)("div",{id:"deck-name-input-container",children:Object(X.jsx)(x.a,{id:"deck-name-input",value:e.deck.name||"",onChange:function(n){e.onRenameDeck(n.target.value)},variant:"outlined",label:"Deck name",autoFocus:!e.deck.name})}),e.deck.cards.map((function(n,t){return Object(X.jsx)(oe,{card:n,onChange:function(t,c){return function(n,t,c){e.onChange(n,t,"back"===c)}(t,n.id,c)},onFlag:r,onDelete:function(){return function(n){e.onDelete(n)}(t)}},n.id)})),Object(X.jsxs)(J.a,{className:"Toolbar",elevation:3,children:[Object(X.jsxs)(G.a,{children:[Object(X.jsx)(O.a,{startIcon:Object(X.jsx)(E.a,{}),onClick:function(){e.onAddCard(),i(!0)},variant:"outlined",color:"primary",children:"Add Card"}),Object(X.jsx)(O.a,{startIcon:Object(X.jsx)(ie.a,{}),onClick:function(){e.onSwapAll()},variant:"outlined",color:"primary",children:"Swap All"})]}),Object(X.jsx)(O.a,{startIcon:Object(X.jsx)(T.a,{}),onClick:function(){e.onViewCards()},variant:"contained",color:"primary",children:"View Deck"})]})]})}function se(e){return Object(X.jsxs)("div",{className:"DashView",children:[e.decks.sort((function(e,n){return e.modified<n.modified?1:-1})).map((function(n){return Object(X.jsxs)("div",{className:"DashCardContainer",onClick:function(){return function(n){e.onSelect(n)}(n)},children:[Object(X.jsx)(J.a,{className:"DashCard",square:!0,elevation:3,children:Object(X.jsx)("div",{style:{overflow:"hidden",height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:Q()(n.cards[0].front)})}),Object(X.jsx)(d.a,{variant:"h5",children:n.name||"Untitled"}),Object(X.jsx)(d.a,{className:"GrayText",variant:"subtitle1",children:(t=n.modified,new Date(t).toLocaleString([],{month:"numeric",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}))})]});var t})),Object(X.jsx)("div",{className:"DashCardContainer",onClick:function(){e.onNewDeck()},children:Object(X.jsx)("div",{className:"DashNewCard",children:Object(X.jsxs)("span",{style:{display:"flex",alignItems:"center"},children:[Object(X.jsx)(E.a,{}),Object(X.jsx)(d.a,{variant:"h5",children:"New deck"})]})})})]})}var de=function(){var e=Object(c.useState)(null),n=Object(s.a)(e,2),t=n[0],i=n[1],r=Object(c.useState)(!1),G=Object(s.a)(r,2),R=G[0],J=G[1],P=Object(c.useState)(!1),M=Object(s.a)(P,2),z=M[0],q=M[1],H=Object(c.useState)(!1),K=Object(s.a)(H,2),Z=K[0],Y=K[1],$=Object(c.useState)(""),_=Object(s.a)($,2),Q=_[0],ee=_[1],ne=Object(c.useState)(!1),te=Object(s.a)(ne,2),ae=te[0],ie=te[1],re=Object(c.useState)(!1),oe=Object(s.a)(re,2),de=oe[0],je=oe[1],ue=Object(c.useState)(!1),fe=Object(s.a)(ue,2),be=fe[0],he=fe[1],Oe=Object(c.useState)(!1),xe=Object(s.a)(Oe,2),ge=xe[0],me=xe[1],ve=Object(c.useState)(!1),ke=Object(s.a)(ve,2),pe=ke[0],Ce=ke[1],ye=Object(c.useState)(null),we=Object(s.a)(ye,2),Ne=we[0],Se=we[1],De=t&&!R&&!z&&!Z,Fe=function(){return"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/x/g,(function(e){return(16*Math.random()|0).toString(16)}))},Ee=function(){for(var e=[],n=Object.keys(localStorage),t=n.length;t--;)"lastOpen"!==n[t]&&e.push(JSON.parse(localStorage.getItem(n[t])));return e},Ae=function(e){return new Date(e).toLocaleString([],{month:"numeric",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})},Ie=function(e){e.modified=new Date,i(e),localStorage.setItem(e.id,JSON.stringify(e))},Te=function(){var e=Fe(),n={name:e,content:{id:e,created:new Date,modified:new Date,cards:[{id:Fe(),front:"",back:"",flagged:!1}]}};localStorage.setItem(e,JSON.stringify(n.content)),Le(n.content),Ce(!1)},Be=function(){q(!0),Ce(!1)},We=function(){q(!1)},Le=function(e){me(!0),je(!1),he(!1),J(!1),i(JSON.parse(localStorage.getItem(e.id)))},Ue=function(){Y(!0),Ce(!1)},Ve=function(){Y(!1)},Ge=function(){Y(!1),localStorage.removeItem(t.id),i(null)},Re=function(e){if(1===t.cards.length)Ge();else{var n=Object(l.a)({},t);n.cards.splice(e,1),Ie(n)}},Je=function(e){de&&t.cards.filter((function(e){return e.flagged})).length<2&&Pe();var n=Object(l.a)({},t);n.cards.find((function(n){return n.id===e})).flagged=!t.cards.find((function(n){return n.id===e})).flagged,Ie(n)},Pe=function(){je((function(e){return!e}))},Me=function(){me(!ge),Ce(!1)},ze=Object(X.jsx)("div",{className:"EmptyDrawer",children:Object(X.jsx)(d.a,{variant:"h6",children:"No decks found"})}),qe=Object(X.jsxs)(j.a,{open:Z,onClose:Ve,children:[Object(X.jsxs)(u.a,{children:['Delete "',t?t.name||"Untitled":null,'"?']}),Object(X.jsx)(f.a,{children:Object(X.jsx)(b.a,{children:"This deck will be deleted forever (a really long time)."})}),Object(X.jsxs)(h.a,{children:[Object(X.jsx)(O.a,{onClick:Ve,children:"Cancel"}),Object(X.jsx)(O.a,{color:"secondary",onClick:Ge,children:"Delete"})]})]}),He=Object(X.jsx)(j.a,{open:z,onClose:We,children:Object(X.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),e.stopPropagation(),Q.trim()){q(!1);var n=Object(l.a)({},t);n.id=Fe(),n.name=Q.trim(),n.created=Ae(),localStorage.setItem(n.id,JSON.stringify(n)),ee(""),ae&&i(n)}},children:[Object(X.jsxs)(u.a,{children:['Duplicate "',t?t.name||"Untitled":null,'"']}),Object(X.jsxs)(f.a,{className:"DialogGrid",children:[Object(X.jsx)(x.a,{autoFocus:!0,label:"Deck name",value:Q,onChange:function(e){var n=e.target.value;n=n.substr(0,20),ee(n)}}),Object(X.jsx)(g.a,{control:Object(X.jsx)(m.a,{checked:ae,onChange:function(){ie(!ae)},color:"primary"}),label:"Open "+(Q||"new deck")})]}),Object(X.jsxs)(h.a,{children:[Object(X.jsx)(O.a,{onClick:We,children:"Cancel"}),Object(X.jsx)(O.a,{disabled:!Q.trim(),type:"submit",children:"Add"})]})]})}),Ke=Object(X.jsxs)("div",{className:"Drawer",children:[Object(X.jsx)("div",{className:"DeckList",children:function(){var e=Ee();return e&&e.length>0?Object(X.jsx)(v.a,{children:e.sort((function(e,n){return e.modified<n.modified?1:-1})).map((function(e){return Object(X.jsx)(k.a,{button:!0,onClick:function(){return Le(e)},selected:!!t&&t.id===e.id,children:Object(X.jsx)(p.a,{primary:e.name||"Untitled",secondary:Ae(e.modified),primaryTypographyProps:{noWrap:!0}})},e.id)}))}):ze}()}),Object(X.jsx)(O.a,{className:"DrawerButton",disableElevation:!0,startIcon:Object(X.jsx)(E.a,{}),onClick:Te,fullWidth:!0,variant:"contained",children:"New Deck"})]}),Ze=Object(X.jsxs)("div",{className:"EmptyState",children:[Object(X.jsx)(A.a,{style:{fontSize:200}}),Object(X.jsx)(d.a,{variant:"h6",children:"You don't have any decks yet."}),Object(X.jsx)(O.a,{variant:"contained",onClick:Te,color:"primary",size:"large",startIcon:Object(X.jsx)(E.a,{}),children:"New Deck"})]}),Ye=Object(X.jsx)(ce,{deck:function(){if(t){var e=Object(l.a)({},t);if(de&&(e.cards=t.cards.filter((function(e){return e.flagged}))),be){var n=Object(o.a)(e.cards);e.cards=function(e){for(var n,t,c=e.length;0!==c;)t=Math.floor(Math.random()*c),n=e[c-=1],e[c]=e[t],e[t]=n;return e}(n)}return e}return null}(),onFlag:Je,onFlaggedOnly:Pe,onShuffle:function(){he((function(e){return!e}))},flaggedOnly:de,shuffled:be,focus:De}),$e=t?ge?Object(X.jsx)(le,{deck:t,onChange:function(e,n,c){var a=Object(l.a)({},t);c?a.cards.find((function(e){return e.id===n})).back=e:a.cards.find((function(e){return e.id===n})).front=e,Ie(a)},onAddCard:function(e,n){var c=Object(l.a)({},t);c.cards.push({id:Fe(),front:e,back:n,flagged:!1}),Ie(c)},onDeleteCard:Re,onFlag:Je,onDelete:Re,onSwapAll:function(){var e=Object(l.a)({},t);e.cards.forEach((function(e){var n=e.front;e.front=e.back,e.back=n})),Ie(e)},onViewCards:Me,onRenameDeck:function(e){var n=Object(l.a)({},t);n.name=e.substr(0,20),Ie(n)}}):Ye:Ee()&&Ee().length>0?Object(X.jsx)(se,{decks:Ee(),onSelect:Le,onNewDeck:Te}):Ze,_e=Object(X.jsxs)("div",{children:[Object(X.jsx)(C.a,{title:"Add deck",children:Object(X.jsx)(y.a,{onClick:Te,children:Object(X.jsx)(I.a,{style:{color:"#fff"}})})}),Object(X.jsx)(C.a,{title:ge?"View deck":"Edit deck",children:Object(X.jsx)(y.a,{disabled:!t,onClick:Me,children:ge?Object(X.jsx)(T.a,{style:{color:"#fff",opacity:t?1:.5}}):Object(X.jsx)(B.a,{style:{color:"#fff",opacity:t?1:.5}})})}),Object(X.jsx)(C.a,{title:"Duplicate deck",children:Object(X.jsx)(y.a,{disabled:!t,onClick:Be,children:Object(X.jsx)(W.a,{style:{color:"#fff",opacity:t?1:.5}})})}),Object(X.jsx)(C.a,{title:"Delete deck",children:Object(X.jsx)(y.a,{disabled:!t,onClick:Ue,edge:"end",children:Object(X.jsx)(L.a,{style:{color:"#fff",opacity:t?1:.5}})})})]}),Qe=Object(X.jsxs)(w.a,{open:pe,onClose:function(){Ce(!1)},anchorEl:Ne,children:[Object(X.jsxs)(N.a,{onClick:Te,children:[Object(X.jsx)(E.a,{className:"GrayText"}),"Add deck"]}),Object(X.jsxs)(N.a,{disabled:!t,onClick:Me,children:[ge?Object(X.jsx)(T.a,{className:"GrayText"}):Object(X.jsx)(B.a,{className:"GrayText"}),ge?"View deck":"Edit deck"]}),Object(X.jsxs)(N.a,{disabled:!t,onClick:Be,children:[Object(X.jsx)(W.a,{className:"GrayText"}),"Duplicate deck"]}),Object(X.jsxs)(N.a,{disabled:!t,onClick:Ue,children:[Object(X.jsx)(L.a,{className:"GrayText"}),"Delete deck"]})]});return Object(X.jsxs)("div",{className:"App",children:[Object(X.jsx)(S.a,{position:"sticky",elevation:3,children:Object(X.jsx)(D.a,{children:Object(X.jsxs)("div",{style:{display:"flex",width:"100%",alignItems:"center"},children:[Object(X.jsx)("div",{className:"EvenFlex",children:Object(X.jsx)("span",{children:Object(X.jsxs)("div",{className:"LeftAlign",style:{display:"flex",alignItems:"center"},children:[Object(X.jsx)(C.a,{title:"View decks",children:Object(X.jsx)(y.a,{edge:"start",color:"inherit",onClick:function(){J(!0)},children:Object(X.jsx)(U.a,{})})}),Object(X.jsxs)("svg",{id:"header-logo","data-name":"header-logo",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 909.4 688.25",height:"40",width:"40",style:{cursor:"pointer"},onClick:function(){i(null)},children:[Object(X.jsx)("path",{style:{fill:"#fff"},d:"M44.82,165.12H154.75V396.39c12.48-8.72,53.51-56.91,\r 156.09-56.91,100.43,0,169.25,72.32,169.25,72.32l-45.38,\r 78.65S398.57,449.36,362,439.81c-61.18-16-128.14,3.52-170.91,\r 49.25-42,44.88-49.6,97.87-29.4,160.62,19.6,60.9,74.94,90,\r 140.11,93.27,68.67,3.41,153.1-53,154-163.6C457,437.72,592,\r 322.18,733.56,335.41,843.48,343,919.35,400.65,953.11,\r 493.52a25,25,0,0,1,.95,3.23c-39.13,\r 0-113.67-.29-113.67-.29s-55.6-97.92-172.26-60.59C610.06,\r 454.45,566.22,509.24,566.22,575c0,66.47-10.25,102.51-37.5,\r 149-58.11,99.15-163.57,136-244.39,128.45C150,839.79,67.9,\r 736.2,49.8,645.27c-3-15.17-5-60.47-5-74.3Z",transform:"translate(-44.82 -165.12)"}),Object(X.jsx)("path",{style:{fill:"#fff"},d:"M593.87,684.29c11,10.31,57.78,69.22,129.09,69,74.66-.2,\r 116.34-63.12,116.34-63.12s80.33-.44,114.84.14c2.31,0-50.27,\r 163-232.29,163-121.29,0-186-86.08-186-86.08S592.89,685.89,\r 593.87,684.29Z",transform:"translate(-44.82 -165.12)"})]})]})})}),Object(X.jsx)("div",{className:"EvenFlex",children:Object(X.jsx)("span",{children:Object(X.jsx)(d.a,{className:"TitleText CenteredFlex",variant:"h6",noWrap:!0,children:t?t.name||"Untitled":null})})}),Object(X.jsx)("div",{className:"EvenFlex",children:Object(X.jsxs)("span",{className:"AutoWidth RightAlign",children:[Object(X.jsx)("span",{id:"app-actions",children:_e}),Object(X.jsx)("span",{children:Object(X.jsx)(y.a,{id:"app-menu",onClick:function(e){Se(e.currentTarget),Ce(!0)},edge:"end",children:Object(X.jsx)(V.a,{style:{color:"#fff"}})})})]})})]})})}),Object(X.jsx)("div",{className:"Page",children:$e}),Object(X.jsxs)(a.a.Fragment,{children:[Object(X.jsx)(F.a,{anchor:"left",open:R,onClose:function(){J(!1)},children:Ke}),qe,He,Qe]})]})},je=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ue(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(Object(X.jsx)(a.a.StrictMode,{children:Object(X.jsx)(de,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/b-cards",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/b-cards","/service-worker.js");je?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var c=t.headers.get("content-type");404===t.status||null!=c&&-1===c.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ue(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):ue(n,e)}))}}()}},[[156,1,2]]]);
//# sourceMappingURL=main.0a31956a.chunk.js.map