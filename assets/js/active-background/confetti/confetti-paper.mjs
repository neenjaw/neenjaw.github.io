import { Vector2D } from './vector.mjs'

const DEG_360_IN_RAD = 2 * Math.PI
const DEG_90_IN_RAD = Math.PI / 2
const DEG_45_IN_RAD = Math.PI / 4
const ROTATION_SPEED_VARIANCE = 600
const ROTATION_SPEED_MINIMUM = 800
const OSCILLATION_SPEED_VARIANCE = 1.5
const OSCILLATION_SPEED_MINIMUM = 0.5
const X_VELOCITY = 40
const Y_VELOCITY_VARIANCE = 60
const Y_VELOCITY_MINIMUM = 50

class ConfettiPaper {
  constructor(config) {
    this.parent = config.parent
    this.scale = config.scale
    this.fetchColors = config.fetchColors
    this.position = new Vector2D(
      Math.random() * this.parent.width,
      Math.random() * this.parent.height
    )
    this.cosRotation = 1.0
    this.angle = Math.random() * DEG_360_IN_RAD
    this.rotation = Math.random() * DEG_360_IN_RAD
    this.rotationSpeed =
      Math.random() * ROTATION_SPEED_VARIANCE + ROTATION_SPEED_MINIMUM
    this.oscillationSpeed =
      Math.random() * OSCILLATION_SPEED_VARIANCE + OSCILLATION_SPEED_MINIMUM
    this.xVelocity = X_VELOCITY
    this.yVelocity = Math.random() * Y_VELOCITY_VARIANCE + Y_VELOCITY_MINIMUM
    this.time = Math.random()
    this.corners = computeCorners(this.angle)
    const [frontColor, backColor] = this.fetchColors()
    this.frontColor = frontColor
    this.backColor = backColor
    this.size = 5.0
  }

  update(dt) {
    this.time += dt
    this.rotation += this.rotationSpeed * dt
    this.cosRotation = Math.cos((this.rotation * Math.PI) / 180)
    this.position.x +=
      Math.cos(this.time * this.oscillationSpeed) * this.xVelocity * dt
    this.position.y += this.yVelocity * dt // Reset paper to the top of the screen

    if (this.position.y > this.parent.height) {
      this.position.x = Math.random() * this.parent.width
      this.position.y = 0
    }
  }

  draw(context) {
    if (this.cosRotation > 0) {
      context.fillStyle = this.frontColor
    } else {
      context.fillStyle = this.backColor
    }

    const [firstCorner, ...remainingCorners] = this.computeCornerDrawPositions()
    context.beginPath()
    context.moveTo(firstCorner.x, firstCorner.y)
    remainingCorners.forEach(({ x, y }) => context.lineTo(x, y))
    context.closePath()
    context.fill()
  }

  computeCornerDrawPositions() {
    return this.corners.map(({ x, y }, i) => {
      x = this.position.x / this.scale + x * this.size
      y = this.position.y / this.scale + y * this.size * this.cosRotation
      return {
        x,
        y,
      }
    })
  }
}

function computeCorners(angle) {
  return [0, 1, 2, 3].map((i) => {
    const dx = Math.cos(angle + (i * DEG_90_IN_RAD + DEG_45_IN_RAD))
    const dy = Math.sin(angle + (i * DEG_90_IN_RAD + DEG_45_IN_RAD))
    return new Vector2D(dx, dy)
  })
}

export { ConfettiPaper }
