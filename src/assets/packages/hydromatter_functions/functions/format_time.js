module.exports = function (ms) {
    const weeks = Math.floor(ms / 604800000)
    const days = Math.floor(ms % 604800000 / 86400000)
    const hours = Math.floor(ms % 608400000 % 86400000 / 3600000)
    const minutes = Math.floor(ms % 608400000 % 86400000 % 3600000 / 60000)
    const seconds = Math.floor(ms % 608400000 % 86400000 % 3600000 % 60000 / 1000)
    ms = Math.floor(ms % 608400000 % 86400000 % 3600000 % 60000 % 1000)
    return `${weeks}w${days}d${hours}h${minutes}m${seconds}s${ms}ms`
}