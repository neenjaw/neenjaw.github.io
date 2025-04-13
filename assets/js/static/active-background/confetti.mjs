import { ConfettiPaper } from './confetti/confetti-paper.mjs'
import { ConfettiRibbon } from './confetti/confetti-ribbon.mjs'
const SPEED = 50
const DEFAULT_CONFETTI_PAPERS = 50
const DEFAULT_CONFETTI_RIBBONS = 10
const COLORS = [
  ['#df0049', '#660671'],
  ['#00e857', '#005291'],
  ['#2bebbc', '#05798a'],
  ['#ffd200', '#b06c00'],
]

class Confetti {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.speed = options?.speed ?? SPEED
    this.duration = options?.duration ?? 1.0 / this.speed
    this.ratio = window.devicePixelRatio
    this.width = canvas.offsetWidth * this.ratio
    this.height = canvas.offsetHeight * this.ratio
    let confettiPaperCount =
      options?.confettiPaperCount ?? DEFAULT_CONFETTI_PAPERS

    if (options?.scaleConfettiCount) {
      confettiPaperCount = Math.round(confettiPaperCount / this.ratio)
    }

    this.confettiPapers = [...new Array(confettiPaperCount)].map(() => {
      return new ConfettiPaper({
        parent: this,
        fetchColors: fetchRandomColor,
      })
    })
    let confettiRibbonCount =
      options?.confettiRibbonCount ?? DEFAULT_CONFETTI_RIBBONS
    this.confettiRibbons = [...new Array(confettiRibbonCount)].map(() => {
      return new ConfettiRibbon({
        parent: this,
        fetchColors: fetchRandomColor,
      })
    })
    this.animationFrameRequestId = null
  }

  start() {
    this.animationFrameRequestId = requestAnimationFrame(this.render.bind(this))
  }

  stop() {
    if (this.animationFrameRequestId) {
      cancelAnimationFrame(this.animationFrameRequestId)
    }
  }

  render() {
    if (!this.context) {
      return
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const confettiPaper of this.confettiPapers) {
      confettiPaper.update(this.duration)
      confettiPaper.draw(this.context)
    }

    for (const confettiRibbon of this.confettiRibbons) {
      confettiRibbon.update(this.duration)
      confettiRibbon.draw(this.context)
    }

    this.animationFrameRequestId = requestAnimationFrame(this.render.bind(this))
  }
}

function getRandomColors(colors) {
  const randomIndex = Math.round(Math.random() * (colors.length - 1))
  return colors[randomIndex]
}

function fetchRandomColor() {
  return getRandomColors(COLORS)
}

export { Confetti }
