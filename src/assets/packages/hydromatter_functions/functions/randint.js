module.exports = function (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}