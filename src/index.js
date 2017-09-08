var csjs = require('csjs-inject')
var bel = require('bel')

var css = csjs`
  *, *:before, *:after { box-sizing: inherit; }
  img { box-sizing: content-box; }
  iframe { border: 0; height: 100vh; }
  html {
    box-sizing: border-box;
    display: table;
    min-width: 100%;
    margin: 0;
  }
  body {
    margin: 0;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
  }
  .content {
    position: relative;
    min-height: 100vh;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    background-color: #D6DBE1;
  }
  button {
    cursor: pointer;
    width: 100px;
    height: 100%;
    font-size: 60px;
    font-weight: 900;
    font-family: arial;
    background-color: #43409a;
    border: none;
    color: #D6DBE1;
  }
  button:hover {
    color: #43409a;
    background-color: white;
  }
  .header {
    background-color: red;
    width: 230px;
  }
  .logo {
    margin-right: 20px;
    width: 70px;
    height: 70px;
  }
  .banner {
    display: flex;
    align-items: center;
    align-self: flex-end;
    width: 300px;
    color: #43409a;
    font-size: 35px;
    font-family: arial;
    font-weight: 900;
  }
  .container {
    display: flex;
  }
  .wide {
    display: flex;
    flex-direction: column;
    width: 61.8%;
    height: 90vh;
  }
  .narrow {
    padding: 5px;
    width: 38.2%;
    height: 90vh;
    background-color: #35E38A;
  }
  .video {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    height: 45vh;
    background-color: #32A971;
  }
  .editor {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    height: 45vh;
    background-color: #D6DBE1;
  }
  .chat {
    width: 100%;
    height: 100%;
  }
`

var logo = bel`
<img class="${css.logo}" src="">
`
var videos = [
  'le-URjBhevE',
  'nBEBraDJkFg',
  'Vd_Z1bYGrCM',
  'sPmRfjJdg5Y',
  'VRz0nbax0uI',
  'R8SjM4DKK80',
  'C1PZh_ea-7I',
  '808eYu9B9Yw',
  '7WkfzokHGqo',
  'kVOmc7NK1M0',
  'VwaqJy_clnc',
  'r7v6EIiHfVA',
  's4sB1hm73tw',
  'fM5qnyasUYI',
  'QEZXbRiaY1I',
  'MeZVVxLn26E',
  'EeZBKv34mm4',
  '-xAJKmjKCUE',
  '24Wpg6njlYI',
  'a3KHBqH7njs',
  'Urwzk6ILvPQ',
  'Gp5nnerXETg',
  'r6SnMjsLrBk',
  'tHRNuBf_8xg',
  'B-k76DMOj2k',
  '1JsJx1x35c0',
  'eOI9GzMfd24',
  'OMXtJ0USM8s',
  '3cbiZV4H22c',
  'dpTFcPUe2oo',
  'kOcFZV3c75I',
  'zwBMp1U6FII',
  'KhQkErkEips',
  'ZJMO-zmErA8',
  'YmaFAKUFmp0',
  'DHRntxAVxa0',
  'c9j0avG5L4c',
  'MKJHuub6UJI',
  'VzUBHDQf5Rg',
  'jEx9V4uUcg0',
  'TpRYLEFu4Mc',
  'qMO-LTOrJaE',
  'WJWkqf_N3Sg',
  'CozSF5abcTA',
  'xHneyv38Jro',
  'GxyFlXbhdsY',
  'BMUiFMZr7vk',
  'bCqtb-Z5YGQ',
  'Wl98eZpkp-c',
  '1DMolJ2FrNY',
  'CQqwU2Ixu-U',
  'iZLP4qOwY8I',
  'k7-N8R0-KY4'
]

var lesson = 0
var video = iframe(`https://www.youtube.com/embed/${videos[0]}`, css.video)
var editor = iframe("https://embed.plnkr.co/RepIvBJaLzVsdggTQpV6?p=preview", css.editor)
var chat = iframe("https://gitter.im/wizardamigosinstitute/program/~embed", css.chat)


var stats = bel`<span>Lesson ${lesson + 1}/${videos.length}</span>`

var app = bel`
  <div class="${css.content}">
    <div class=${css.menu}>
      <button onclick=${previous}> ${'<'} </button>
      <span class=${css.banner}>${logo} ${stats}</span>
      <button onclick=${next}> ${'>'} </button>
    </div>
    <div class=${css.container}>
      <div class=${css.wide}>
        ${video}
        ${editor}
      </div>
      <div class=${css.narrow}>
        ${chat}
      </div>
    </div>
  </div>
`
document.body.appendChild(app)

function previous (event) {
  if (lesson <= 0) return
  lesson--
  var old = video
  video = iframe(`//www.youtube.com/embed/${videos[lesson]}`, css.video)
  old.parentElement.replaceChild(video, old)
  stats.innerText = `Lesson ${lesson + 1}/${videos.length}`
}
function next (event) {
  if (lesson >= videos.length - 1) return
  lesson++
  var old = video
  video = iframe(`//www.youtube.com/embed/${videos[lesson]}`, css.video)
  old.parentElement.replaceChild(video, old)
  stats.innerText = `Lesson ${lesson + 1}/${videos.length}`
}
function iframe (src, classname) {
  return bel`
    <iframe
      class=${classname}
      src="${src}"
      frameborder="0"
      allowfullscreen
    ></iframe>
  `
}
