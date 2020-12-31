class Vector2D {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  /**
   * Static methods
   */

  static distance(v0, v1) {
    return Math.sqrt(Vector2D.squareDistance(v0, v1))
  }

  static squareDistance(v0, v1) {
    const x = v0.x - v1.x
    const y = v0.y - v1.y
    return x * x + y * y
  }

  static sub(v0, v1) {
    return new Vector2D(v0.x - v1.x, v0.y - v1.y)
  }
  /**
   * Instance methods
   */

  clone() {
    return new Vector2D(this.x, this.y)
  }

  get length() {
    return Math.sqrt(this.squareLength)
  }

  get squareLength() {
    return this.x * this.x + this.y * this.y
  }

  add(vector) {
    const clone = this.clone()
    clone.x += vector.x
    clone.y += vector.y
    return clone
  }

  subtract(vector) {
    const clone = this.clone()
    clone.x -= vector.x
    clone.y -= vector.y
    return clone
  }

  multiply(factor) {
    const clone = this.clone()
    clone.x *= factor
    clone.y *= factor
    return clone
  }

  divide(factor) {
    const clone = this.clone()
    clone.x /= factor
    clone.y /= factor
    return clone
  }

  normalize() {
    const clone = this.clone()
    const squareLength = clone.squareLength

    if (squareLength === 0) {
      return clone
    }

    const factor = 1.0 / Math.sqrt(squareLength)
    return clone.multiply(factor)
  }
}

export { Vector2D }
