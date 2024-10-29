const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`\'arr\' parameter must be an instance of the Array!`);
  }

  const result = [];
  let skipNext = false;
  let wasLastElementDiscarded = false;

  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];

    switch (currentItem) {
      case "--double-next":
        if (i + 1 < arr.length) {
          result.push(arr[i + 1], arr[i + 1]);
          i++;
        }
        wasLastElementDiscarded = false;
        break;

      case "--double-prev":
        if (result.length > 0 && !skipNext && !wasLastElementDiscarded) {
          const prevElement = result[result.length - 1];
          result.push(prevElement);
        }
        wasLastElementDiscarded = false;
        skipNext = false;
        break;

      case "--discard-prev":
        if (result.length > 0 && !wasLastElementDiscarded) {
          result.pop();
        }
        wasLastElementDiscarded = false;
        skipNext = false;
        break;

      case "--discard-next":
        skipNext = true;
        wasLastElementDiscarded = true;
        i++;
        break;

      default:
        if (!skipNext) {
          result.push(currentItem);
          wasLastElementDiscarded = false;
        }
        skipNext = false;
    }
  }

  return result;
}

module.exports = {
  transform,
};
