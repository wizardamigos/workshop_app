var csjs = require('csjs-inject')
var bel = require('bel')
var datauri = require('datauri')

window.addEventListener('keyup', function (event) {
  var left = 37
  var right = 39
  if (event.which === left) {
    previous()
  } else if (event.which === right){
    next()
  }
})

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
    height: 5vh;
  }
  button {
    cursor: pointer;
    width: 100px;
    height: 100%;
    font-size: 30px;
    font-weight: 900;
    font-family: arial;
    border: none;
    background-color: #D6DBE1;
    color: #43409a;
  }
  button:hover {
    color: white;
    background-color: #43409a;
  }
  .header {
    background-color: red;
    width: 230px;
  }
  .logo {
    margin-left: 20px;
    width: 35px;
    height: 35px;
  }
  .logo:hover {
    opacity: 0.9;
    cursor: pointer;
  }
  .banner {
    display: flex;
    align-items: center;
    align-self: center;
    width: 400px;
    color: #43409a;
    font-size: 20px;
    font-family: arial;
    font-weight: 900;
  }
  .container {
    display: flex;
    background-color: #43409a;
  }
  .wide {
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 90vh;
  }
  .narrow {
    padding: 10px;
    width: 30%;
    height: 90vh;
  }
  .video {
    padding: 10px 0 0 10px;
    width: 50%;
    align-self: center;
    height: 40vh;
    background-color: #43409a;
  }
  .editor {
    padding: 10px 0 10px 10px;
    width: 100%;
    height: 55vh;
    background-color: #43409a;
  }
  .chat {
    width: 100%;
    height: 100%;
    transform: scale(0.8)
  }
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

var logo_url = datauri(__dirname + '/assets/wizard.png')
var logo = bel`
  <img class="${css.logo}" onclick=${home} title = "made with love by WIzard Amigos" src="${logo_url}">
`

var lesson = 0
var series = 'JS workshop:'
var video = iframe(`https://www.youtube.com/embed/${videos[0]}`, css.video)
var editor = iframe("https://codesandbox.io/embed/748qq51066", css.editor)
var chat = iframe("https://gitter.im/wizardamigosinstitute/program/~embed", css.chat)


var stats = bel`<span>${series} Lesson ${lesson + 1}/${videos.length}</span>`

var app = bel`
  <div class="${css.content}">
    <div class=${css.menu}>
      <button onclick=${previous}> ${'<'} </button>
      <span class=${css.banner}>${stats} ${logo}</span>
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
  video = iframe(`https://www.youtube.com/embed/${videos[lesson]}`, css.video)
  old.parentElement.replaceChild(video, old)
  stats.innerText = `Lesson ${lesson + 1}/${videos.length}`
}
function next (event) {
  if (lesson >= videos.length - 1) return
  lesson++
  var old = video
  video = iframe(`https://www.youtube.com/embed/${videos[lesson]}`, css.video)
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

function home () {
  location = location
}
