export const randomFromArray = (array: number[]): number => {
    let idx = Math.floor(Math.random() * array.length)
    return array[idx]
}

export type Row = [number, number, number, number]
export type Board = [Row, Row, Row, Row]
export type Game = {
    board: Board
    tiles: { id: number, x: number, y: number, value: number }[]
}

let id = 1;

export const initBoard = (): Game => {
    let game: Game = {
        board: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        tiles: [],
    }
    let i = 0
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            let value = randomFromArray([0, 1, 2])
            game.board[y][x] = value
            if (value) {
                game.tiles.push({
                    id: ++id,
                    x,
                    y,
                    value
                })
                i += 1
            }
            if (i == 2) {
                return game
            }
        }
    }
    return game
}

export const rotateClockwise = (game: Game) => {
    game.tiles.forEach(tile => {
        let tmp = tile.x;
        tile.x = 3 - tile.y;
        tile.y = tmp;
    });
    for (let i = 0; i < 4; ++i) {
        for (let j = i + 1; j < 4; ++j) {
            let tmp = game.board[i][j]
            game.board[i][j] = game.board[j][i]
            game.board[j][i] = tmp
        }
    }
    game.board.forEach((row) => {
        row.reverse()
    })
}

export const rotateCounterClockwise = (game: Game) => {
    game.tiles.forEach(tile => {
        let tmp = tile.y;
        tile.y = 3 - tile.x;
        tile.x = tmp;
    });
    game.board.forEach((row) => {
        row.reverse()
    })
    for (let i = 0; i < 4; ++i) {
        for (let j = i + 1; j < 4; ++j) {
            let tmp = game.board[i][j]
            game.board[i][j] = game.board[j][i]
            game.board[j][i] = tmp
        }
    }
}

export const moveDown = (game: Game) => {
    for (let y = 3; y > 0; --y) {
        for (let x = 0; x < 4; ++x) {
            if (game.board[y][x] === 0) {
                game.board[y][x] = game.board[y - 1][x]
                if (game.board[y - 1][x] !== 0) {
                    let tile = game.tiles.find((tile) => tile.x === x && tile.y === y - 1)
                    if (tile !== undefined) {
                        tile.y = y
                    }
                }
                game.board[y - 1][x] = 0
            } else if (game.board[y][x] === game.board[y - 1][x]) {
                game.board[y][x] *= 2
                if (game.board[y - 1][x] !== 0) {
                    game.tiles = game.tiles.filter(tile => !(tile.x === x && tile.y === y))
                    let tile = game.tiles.find((tile) => tile.x === x && tile.y === y - 1)
                    if (tile !== undefined) {
                        tile.y = y
                        tile.value *= 2
                    }
                }
                game.board[y - 1][x] = 0
                game.tiles = game.tiles.filter(tile => !(tile.x === x && tile.y === y - 1))
            }
        }
    }
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

export const moveDownAndInsert = (game: Game) => {
    moveDown(game)
    let idx = getRandomEmptySlot(game.board[0])
    if (idx !== undefined) {
        let value = randomFromArray([1, 2])
        game.board[0][idx] = value
        game.tiles.push({
            id: ++id,
            x: idx,
            y: 0,
            value
        })
    }
}

export const getBoardCol = (board: Board, col: number): number[] => {
    let result: number[] = []
    for (let i = 0; i < 4; ++i) {
        result.push(board[i][col])
    }
    return result
}

export const moveLeft = (game: Game) => {
    rotateCounterClockwise(game)
    moveDown(game)
    rotateClockwise(game)
}

export const moveLeftAndInsert = (game: Game) => {
    let result = moveLeft(game)
    let idx = getRandomEmptySlot(getBoardCol(game.board, 3))
    if (idx !== undefined) {
        game.board[idx][3] = randomFromArray([1, 2])
        game.tiles.push({
            id: ++id,
            x: 3,
            y: idx,
            value: game.board[idx][3]
        })
    }
    return result
}

export const moveRight = (game: Game) => {
    rotateClockwise(game)
    moveDown(game)
    rotateCounterClockwise(game)
}

export const moveRightAndInsert = (game: Game) => {
    moveRight(game)
    let idx = getRandomEmptySlot(getBoardCol(game.board, 0))
    if (idx !== undefined) {
        let value = randomFromArray([1, 2])
        game.board[idx][0] = value
        game.tiles.push({
            id: ++id,
            x: 0,
            y: idx,
            value
        })
    }
}

export const moveUp = (game: Game) => {
    rotateCounterClockwise(game)
    rotateCounterClockwise(game)
    moveDown(game)
    rotateCounterClockwise(game)
    rotateCounterClockwise(game)
}

export const moveUpAndInsert = (game: Game) => {
    moveUp(game)
    let idx = getRandomEmptySlot(game.board[3])
    if (idx !== undefined) {
        let value = randomFromArray([1, 2])
        game.board[3][idx] = value
        game.tiles.push({
            id: ++id,
            x: idx,
            y: 3,
            value
        })
    }
}

export const isGameOver = (game: Game) => {
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (game.board[y][x] === 0) {
                return false
            }
            if (y + 1 < 4) {
                if (game.board[y][x] === game.board[y + 1][x]) {
                    return false
                }
            }
            if (x + 1 < 4) {
                if (game.board[y][x] === game.board[y][x + 1]) {
                    return false
                }
            }
        }
    }
    return true
}
