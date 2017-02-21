export default {
  interval: 150,
  canvasWidth: 800,
  canvasHeight: 600,
  cellSize: 10,

  get cols() {
    return this.canvasWidth / this.cellSize;
  },

  get rows() {
    return this.canvasHeight / this.cellSize;
  }
};
