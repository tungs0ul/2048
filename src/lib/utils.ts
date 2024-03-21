export const randomFromArray = (array: number[]): number => {
    let idx = Math.floor(Math.random() * array.length)
    return array[idx]
}

export type Row = [number, number, number, number]
export type Board = [Row, Row, Row, Row]

export const initBoard = (): Board => {
    let result: Board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            result[i][j] = randomFromArray([0, 1, 2])
        }
    }
    return result
}

export const rotateClockwise = (board: Board) => {
    for (let i = 0; i < board.length; ++i) {
        for (let j = i + 1; j < board[0].length; ++j) {
            let tmp = board[i][j]
            board[i][j] = board[j][i]
            board[j][i] = tmp
        }
    }
    board.forEach((row) => {
        row.reverse()
    })
}

export const rotateCounterClockwise = (board: Board) => {
    board.forEach((row) => {
        row.reverse()
    })
    for (let i = 0; i < board.length; ++i) {
        for (let j = i + 1; j < board[0].length; ++j) {
            let tmp = board[i][j]
            board[i][j] = board[j][i]
            board[j][i] = tmp
        }
    }
}

export type MoveResult = {
    moved: [number, number][]
    merged: [number, number][]
}

export type Result = {
    newTile: [number, number] | undefined
} & MoveResult

export const moveDown = (board: Board): MoveResult => {
    let moved: [number, number][] = []
    let merged: [number, number][] = []
    for (let y = 3; y > 0; --y) {
        for (let x = 0; x < 4; ++x) {
            if (board[y][x] === 0) {
                board[y][x] = board[y - 1][x]
                if (board[y - 1][x] !== 0) {
                    moved.push([y - 1, x])
                }
                board[y - 1][x] = 0
            } else if (board[y][x] === board[y - 1][x]) {
                board[y][x] *= 2
                if (board[y - 1][x] !== 0) {
                    merged.push([y, x])
                    moved.push([y - 1, x])
                }
                board[y - 1][x] = 0
            }
        }
    }
    return { moved, merged }
}

const getRandomEmptySlot = (array: number[]): number | undefined => {
    let emptySlots = array
        .map((num, idx) => {
            if (num === 0) {
                return idx
            }
            return undefined
        })
        .filter((num) => num !== undefined) as number[]
    if (emptySlots.length === 0) {
        return undefined
    }
    return randomFromArray(emptySlots)
}

export const moveDownAndInsert = (board: Board): Result => {
    let result = moveDown(board)
    let idx = getRandomEmptySlot(board[0])
    if (idx !== undefined) {
        board[0][idx] = randomFromArray([1, 2])
    }
    return { newTile: idx !== undefined ? [0, idx] : undefined, ...result }
}

// export const moveLeft = (board: Board) => {
//     rotateCounterClockwise(board)
//     moveDown(board)
//     rotateClockwise(board)
// }

export const moveLeft = (board: Board): MoveResult => {
    let moved: [number, number][] = []
    let merged: [number, number][] = []

    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 3; ++x) {
            if (board[y][x] === 0) {
                board[y][x] = board[y][x + 1]
                if (board[y][x + 1] !== 0) {
                    moved.push([y, x + 1])
                }
                board[y][x + 1] = 0
            } else if (board[y][x] === board[y][x + 1]) {
                board[y][x] *= 2
                if (board[y][x + 1] !== 0) {
                    moved.push([y, x + 1])
                    merged.push([y, x])
                }
                board[y][x + 1] = 0
            }
        }
    }
    return { moved, merged }
}

export const getBoardCol = (board: Board, col: number): number[] => {
    let result: number[] = []
    for (let i = 0; i < 4; ++i) {
        result.push(board[i][col])
    }
    return result
}

export const moveLeftAndInsert = (board: Board): Result => {
    let result = moveLeft(board)
    let idx = getRandomEmptySlot(getBoardCol(board, 3))
    if (idx !== undefined) {
        board[idx][3] = randomFromArray([1, 2])
    }
    return { newTile: idx !== undefined ? [idx, 3] : undefined, ...result }
}

export const moveRight = (board: Board): MoveResult => {
    let moved: [number, number][] = []
    let merged: [number, number][] = []
    for (let y = 0; y < 4; ++y) {
        for (let x = 3; x > 0; --x) {
            if (board[y][x] === 0) {
                board[y][x] = board[y][x - 1]
                if (board[y][x - 1] !== 0) {
                    moved.push([y, x - 1])
                }
                board[y][x - 1] = 0
            } else if (board[y][x] === board[y][x - 1]) {
                board[y][x] *= 2
                if (board[y][x - 1] !== 0) {
                    moved.push([y, x - 1])
                    merged.push([y, x])
                }
                board[y][x - 1] = 0
            }
        }
    }
    return { moved, merged }
}

export const moveRightAndInsert = (board: Board): Result => {
    let result = moveRight(board)
    let idx = getRandomEmptySlot(getBoardCol(board, 0))
    if (idx !== undefined) {
        board[idx][0] = randomFromArray([1, 2])
    }
    return { newTile: idx !== undefined ? [idx, 0] : undefined, ...result }
}

export const moveUp = (board: Board): MoveResult => {
    let moved: [number, number][] = []
    let merged: [number, number][] = []
    for (let y = 0; y < 3; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (board[y][x] === 0) {
                board[y][x] = board[y + 1][x]
                if (board[y + 1][x] !== 0) {
                    moved.push([y + 1, x])
                }
                board[y + 1][x] = 0
            } else if (board[y][x] === board[y + 1][x]) {
                board[y][x] *= 2
                if (board[y + 1][x] !== 0) {
                    moved.push([y + 1, x])
                    merged.push([y, x])
                }
                board[y + 1][x] = 0
            }
        }
    }
    return { moved, merged }
}

export const moveUpAndInsert = (board: Board): Result => {
    let result = moveUp(board)
    let idx = getRandomEmptySlot(board[3])
    if (idx !== undefined) {
        board[3][idx] = randomFromArray([1, 2])
    }
    return { newTile: idx !== undefined ? [3, idx] : undefined, ...result }
}

export const isGameOver = (board: Board) => {
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (board[y][x] === 0) {
                return false
            }
            if (y + 1 < 4) {
                if (board[y][x] === board[y + 1][x]) {
                    return false
                }
            }
            if (x + 1 < 4) {
                if (board[y][x] === board[y][x + 1]) {
                    return false
                }
            }
        }
    }
    return true
}
