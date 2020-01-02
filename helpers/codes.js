module.exports = {
  generateCode: function() {
    const fourdigitsrandom = Math.floor(1000 + Math.random() * 9000);
    return fourdigitsrandom;
  }
};
