import React, { Component } from 'react'
import { XTerm, Terminal } from 'react-xterm'

class XtermTerminal extends Component {
  componentDidMount() {
    runFakeTerminal(this.refs.xterm)

    // this.sendToTerminal('')
  }

  sendToTerminal(text) {
    this.refs.xterm && this.refs.xterm.writeln(text)
  }

  fitTerminal() {
    this.refs.xterm && this.refs.xterm.fit()
  }

  throttleConsoleResize(size) {
    this.fitTerminal()
    console.log('resizing');
  }

  render() {
    return (
      <XTerm ref='xterm' style={{
        addons: ['fit', 'fullscreen', 'search'],
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      }} />
    )
  }
}

export default XtermTerminal

function runFakeTerminal(xterm: XTerm) {
  const term: Terminal = xterm.getTerminal()
  var shellprompt = '$ '

  function prompt () {
    xterm.write('\r\n' + shellprompt)
  }
  xterm.writeln('Welcome to xterm.js')
  xterm.writeln('This is a local terminal emulation, without a real terminal in the back-end.')
  xterm.writeln('Type some keys and commands to play around.')
  xterm.writeln('')
  prompt()

  term.on('key', function (key, ev) {
    var printable = (
      !ev.altKey && !ev.ctrlKey && !ev.metaKey
    )

    if (ev.keyCode === 13) {
      prompt()
      console.log('sending cmd to somewhere');

      setTimeout(() => {
        console.log('Recieved by server');
        xterm.writeln(`cmd failed :: no cmd's work!`)
        prompt()
      }, 200)
    // } else if (ev.keyCode == 8) {
    //   // Do not delete the prompt
    //   if (term['x'] > 2) {
    //     xterm.write('\b \b')
    //   }
    } else if (printable) {
      xterm.write(key)
    }
  })

  term.on('paste', (data, ev) => {
    xterm.write(data)
  })
}
