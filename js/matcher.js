class Matcher {
  constructor(board) {
    this.board = board
  }

  findMatches() {
    return this.mergeOverlaps(this.board.findRawMatches())
  }

  mergeOverlaps(matches) {
    const seen = new Set()
    return matches.map((match) => {
      return match.filter((piece) => {
        const key = `${piece.row}:${piece.col}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }).filter((match) => match.length >= 3)
  }
}

module.exports = Matcher
