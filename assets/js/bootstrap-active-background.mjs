import { ActiveBackground } from './active-background/active-background.mjs'

const activeBackgroundParents = document.querySelectorAll('.ab-container')
if (activeBackgroundParents) {
  for (let activeBackgroundParent of activeBackgroundParents) {
    ReactDOM.render(
      React.createElement(ActiveBackground, {
        type: 'confetti',
        className: 'rounded',
      }),
      activeBackgroundParent
    )
  }
} else {
  console.log('No active background parents')
}
