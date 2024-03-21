import { describe, expect, test } from 'vitest'
import * as Utils from './utils'

describe('test', () => {
    test('initBoard', () => {
        for (let i = 0; i < 1000; ++i) {
            let board = Utils.initBoard()
            for (let i = 0; i < 4; ++i) {
                for (let j = 0; j < 4; ++j) {
                    let number = board[i][j]
                    expect(number).toBeGreaterThanOrEqual(0)
                    expect(number).toBeLessThanOrEqual(2)
                }
            }
        }
    })

    test('isGameOver', () => {
        let finishedBoard: Utils.Board = [
            [2, 1, 2, 1],
            [1, 2, 1, 2],
            [2, 1, 2, 1],
            [1, 2, 1, 2],
        ]
        expect(Utils.isGameOver(finishedBoard)).toBeTruthy()
        let unfinishedBoard: Utils.Board = [
            [0, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ]
        expect(Utils.isGameOver(unfinishedBoard)).toBeFalsy()
    })

    test('moveDown', () => {
        let board: Utils.Board = [
            [1, 0, 0, 0],
            [4, 1, 1, 1],
            [1, 2, 1, 0],
            [2, 2, 1, 0],
        ]
        let result = Utils.moveDown(board)
        let expectedResult = {
            moved: [
                [2, 1],
                [2, 2],
                [1, 1],
                [1, 2],
                [1, 3],
            ],
            merged: [
                [3, 1],
                [3, 2],
            ],
        }
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult))
        let expected: Utils.Board = [
            [1, 0, 0, 0],
            [4, 0, 0, 0],
            [1, 1, 1, 1],
            [2, 4, 2, 0],
        ]
        expect(JSON.stringify(board)).toEqual(JSON.stringify(expected))
    })

    test('rotateClockwise', () => {
        let board: Utils.Board = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [1, 2, 3, 4],
            [5, 6, 7, 8],
        ]
        Utils.rotateClockwise(board)
        let expected = [
            [5, 1, 4, 0],
            [6, 2, 5, 1],
            [7, 3, 6, 2],
            [8, 4, 7, 3],
        ]
        expect(JSON.stringify(board)).toEqual(JSON.stringify(expected))
    })

    test('rotateCounterClockwise', () => {
        let board: Utils.Board = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [1, 2, 3, 4],
            [5, 6, 7, 8],
        ]
        Utils.rotateCounterClockwise(board)
        let expected = [
            [3, 7, 4, 8],
            [2, 6, 3, 7],
            [1, 5, 2, 6],
            [0, 4, 1, 5],
        ]
        expect(JSON.stringify(board)).toEqual(JSON.stringify(expected))
    })

    test('moveLeft', () => {
        let board: Utils.Board = [
            [1, 0, 0, 0],
            [4, 1, 1, 1],
            [1, 2, 1, 0],
            [2, 2, 1, 0],
        ]
        let result = Utils.moveLeft(board)
        let expectedResult = {
            moved: [
                [1, 2],
                [1, 3],
                [3, 1],
                [3, 2],
            ],
            merged: [
                [1, 1],
                [3, 0],
            ],
        }
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult))
        let expected: Utils.Board = [
            [1, 0, 0, 0],
            [4, 2, 1, 0],
            [1, 2, 1, 0],
            [4, 1, 0, 0],
        ]
        expect(JSON.stringify(board)).toEqual(JSON.stringify(expected))
    })

    test('moveUp', () => {
        let board: Utils.Board = [
            [1, 0, 0, 0],
            [4, 1, 1, 1],
            [1, 2, 1, 0],
            [2, 2, 1, 0],
        ]
        let result = Utils.moveUp(board)
        let expectedResult = {
            moved: [
                [1, 1],
                [1, 2],
                [1, 3],
                [2, 1],
                [2, 2],
                [3, 1],
                [3, 2],
            ],
            merged: [],
        }
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult))
        let expected: Utils.Board = [
            [1, 1, 1, 1],
            [4, 2, 1, 0],
            [1, 2, 1, 0],
            [2, 0, 0, 0],
        ]
        expect(JSON.stringify(board)).toEqual(JSON.stringify(expected))
    })

    test('moveRight', () => {
        let board: Utils.Board = [
            [1, 0, 0, 0],
            [4, 1, 1, 1],
            [1, 2, 1, 0],
            [2, 2, 1, 0],
        ]
        let result = Utils.moveRight(board)
        let expectedResult = {
            moved: [
                [0, 0],
                [1, 2],
                [1, 1],
                [1, 0],
                [2, 2],
                [2, 1],
                [2, 0],
                [3, 2],
                [3, 1],
                [3, 0],
            ],
            merged: [[1, 3]],
        }
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult))
        let expected: Utils.Board = [
            [0, 1, 0, 0],
            [0, 4, 1, 2],
            [0, 1, 2, 1],
            [0, 2, 2, 1],
        ]
        expect(JSON.stringify(board)).toEqual(JSON.stringify(expected))
    })
})
