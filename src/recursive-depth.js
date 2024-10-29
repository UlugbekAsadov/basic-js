const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    let maxDepth = 1;

    for (const element of arr) {
      if (Array.isArray(element)) {
        const currentDepth = this.calculateDepth(element) + 1;
        maxDepth = Math.max(maxDepth, currentDepth);
      }
    }

    return maxDepth;
  }
}

module.exports = {
  DepthCalculator,
};
