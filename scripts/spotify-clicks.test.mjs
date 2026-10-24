import test from 'node:test';
import assert from 'node:assert/strict';
import { spotifyClick, allowedEndpoint, installSpotifyClicks } from '../src/spotify-clicks.js';
const id = '4vdSzh5YOkN4yeyUDxePIO';
test('events exclude query, fragments and arbitrary source paths', () => {
  const data = spotifyClick(`https://open.spotify.com/intl-it/artist/${id}?email=private#secret`, '/private@example.com');
  assert.deepEqual(data, {path:`spotify:sito:artist:${id}`, title:'Spotify artist', event:true, no_session:true, referrer:''});
});
test('only actual supported Spotify destinations and hosted endpoint pass', () => {
  for (const href of [`https://open.spotify.com.evil.test/artist/${id}`, `http://open.spotify.com/artist/${id}`, `https://open.spotify.com/embed/artist/${id}`, 'javascript:alert(1)']) assert.equal(spotifyClick(href, '/'), null);
  assert.equal(allowedEndpoint('https://example.goatcounter.com/count'), true);
  for (const endpoint of ['', 'https://goatcounter.com/count', 'https://example.goatcounter.com/count?secret=x']) assert.equal(allowedEndpoint(endpoint), false);
});
test('unconfigured, QA and privacy optouts make no requests or listeners', () => {
  const doc = {createElement(){throw Error('Unexpected request');}};
  const win = {location:{hostname:'dario-germana.vercel.app',search:'?analytics=off'},navigator:{}};
  assert.equal(installSpotifyClicks('',win,doc), false);
  assert.equal(installSpotifyClicks('https://example.goatcounter.com/count',win,doc),false);
  win.location.search = ''; win.navigator.globalPrivacyControl = true;
  assert.equal(installSpotifyClicks('https://example.goatcounter.com/count',win,doc),false);
});
test('left and middle clicks count once; navigation continues during failures', () => {
  const handlers = {}, sent = [];
  const doc = {createElement:()=>({}),head:{appendChild(){}},addEventListener:(type, fn)=>handlers[type]=fn};
  const win = {location:{hostname:'dario-germana.vercel.app',search:'',pathname:'/'},navigator:{}};
  installSpotifyClicks('https://example.goatcounter.com/count',win,doc);
  win.goatcounter.count = data => sent.push(data);
  const event = {isTrusted:true,defaultPrevented:false,button:0,type:'click',target:{closest:()=>({href:`https://open.spotify.com/artist/${id}`})}};
  handlers.click(event); handlers.auxclick({...event,type:'auxclick'});
  assert.equal(sent.length,1);
  handlers.auxclick({...event,type:'auxclick',button:1});
  assert.equal(sent.length,2);
  handlers.click({...event,isTrusted:false}); assert.equal(sent.length,2);
  win.goatcounter.count = ()=>{throw Error('Blocked');};
  assert.doesNotThrow(()=>handlers.click(event));
});
