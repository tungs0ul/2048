import { describe, expect, test } from 'vitest'
import { type Game, rotateClockwise, rotateCounterClockwise, moveDown, moveUp, moveLeft, moveRight } from './utils'

describe('rotateClockwise', () => {
    test('should rotate a 4x4 board clockwise', () => {
        const game: Game = {
            board: [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ],
            tiles: [
                { id: 1, x: 0, y: 0, value: 1 },
                { id: 2, x: 1, y: 0, value: 2 },
                { id: 3, x: 2, y: 0, value: 3 },
                { id: 4, x: 3, y: 0, value: 4 },
                { id: 5, x: 0, y: 1, value: 5 },
                { id: 6, x: 1, y: 1, value: 6 },
                { id: 7, x: 2, y: 1, value: 7 },
                { id: 8, x: 3, y: 1, value: 8 },
                { id: 9, x: 0, y: 2, value: 9 },
                { id: 10, x: 1, y: 2, value: 10 },
                { id: 11, x: 2, y: 2, value: 11 },
                { id: 12, x: 3, y: 2, value: 12 },
                { id: 13, x: 0, y: 3, value: 13 },
                { id: 14, x: 1, y: 3, value: 14 },
                { id: 15, x: 2, y: 3, value: 15 },
                { id: 16, x: 3, y: 3, value: 16 }
            ]
        };

        rotateClockwise(game);

        const expectedBoard = [
            [13, 9, 5, 1],
            [14, 10, 6, 2],
            [15, 11, 7, 3],
            [16, 12, 8, 4]
        ];

        const expectedTiles = [
            { id: 1, x: 3, y: 0, value: 1 },
            { id: 2, x: 3, y: 1, value: 2 },
            { id: 3, x: 3, y: 2, value: 3 },
            { id: 4, x: 3, y: 3, value: 4 },
            { id: 5, x: 2, y: 0, value: 5 },
            { id: 6, x: 2, y: 1, value: 6 },
            { id: 7, x: 2, y: 2, value: 7 },
            { id: 8, x: 2, y: 3, value: 8 },
            { id: 9, x: 1, y: 0, value: 9 },
            { id: 10, x: 1, y: 1, value: 10 },
            { id: 11, x: 1, y: 2, value: 11 },
            { id: 12, x: 1, y: 3, value: 12 },
            { id: 13, x: 0, y: 0, value: 13 },
            { id: 14, x: 0, y: 1, value: 14 },
            { id: 15, x: 0, y: 2, value: 15 },
            { id: 16, x: 0, y: 3, value: 16 }
        ];

        expect(game.board).toEqual(expectedBoard);
        expect(game.tiles).toEqual(expectedTiles);
    });
});

describe('rotateCounterClockwise', () => {
    test('should rotate all tiles counterclockwise by 90 degrees', () => {
        const game: Game = {
            board: [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ],
            tiles: [
                { id: 1, x: 0, y: 0, value: 1 },
                { id: 2, x: 1, y: 0, value: 2 },
                { id: 3, x: 2, y: 0, value: 3 },
                { id: 4, x: 3, y: 0, value: 4 },
                { id: 5, x: 0, y: 1, value: 5 },
                { id: 6, x: 1, y: 1, value: 6 },
                { id: 7, x: 2, y: 1, value: 7 },
                { id: 8, x: 3, y: 1, value: 8 },
                { id: 9, x: 0, y: 2, value: 9 },
                { id: 10, x: 1, y: 2, value: 10 },
                { id: 11, x: 2, y: 2, value: 11 },
                { id: 12, x: 3, y: 2, value: 12 },
                { id: 13, x: 0, y: 3, value: 13 },
                { id: 14, x: 1, y: 3, value: 14 },
                { id: 15, x: 2, y: 3, value: 15 },
                { id: 16, x: 3, y: 3, value: 16 }
            ]
        };

        rotateCounterClockwise(game);

        expect(game.tiles).toEqual([
            { id: 1, x: 0, y: 3, value: 1 },
            { id: 2, x: 0, y: 2, value: 2 },
            { id: 3, x: 0, y: 1, value: 3 },
            { id: 4, x: 0, y: 0, value: 4 },
            { id: 5, x: 1, y: 3, value: 5 },
            { id: 6, x: 1, y: 2, value: 6 },
            { id: 7, x: 1, y: 1, value: 7 },
            { id: 8, x: 1, y: 0, value: 8 },
            { id: 9, x: 2, y: 3, value: 9 },
            { id: 10, x: 2, y: 2, value: 10 },
            { id: 11, x: 2, y: 1, value: 11 },
            { id: 12, x: 2, y: 0, value: 12 },
            { id: 13, x: 3, y: 3, value: 13 },
            { id: 14, x: 3, y: 2, value: 14 },
            { id: 15, x: 3, y: 1, value: 15 },
            { id: 16, x: 3, y: 0, value: 16 }
        ]);
        expect(game.board).toEqual([
            [4, 8, 12, 16],
            [3, 7, 11, 15],
            [2, 6, 10, 14],
            [1, 5, 9, 13]
        ]);
    });
});


describe('moveDown', () => {

    test('should move all tiles down one row if there are empty spaces below them', () => {
        const game: Game = {
            board: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [2, 2, 2, 2],
                [0, 0, 0, 0],
            ],
            tiles: [
                { id: 1, x: 0, y: 2, value: 2 },
                { id: 2, x: 1, y: 2, value: 2 },
                { id: 3, x: 2, y: 2, value: 2 },
                { id: 4, x: 3, y: 2, value: 2 }
            ]
        };

        moveDown(game);

        expect(JSON.stringify(game.board)).toEqual(JSON.stringify([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 2, 2, 2]
        ]));
        expect(JSON.stringify(game.tiles)).toEqual(JSON.stringify([
            { id: 1, x: 0, y: 3, value: 2 },
            { id: 2, x: 1, y: 3, value: 2 },
            { id: 3, x: 2, y: 3, value: 2 },
            { id: 4, x: 3, y: 3, value: 2 }
        ]));
    });
});

describe('moveLeft', () => {

    test('should move all tiles down one col if there are empty spaces below them', () => {
        const game: Game = {
            board: [
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
            ],
            tiles: [
                { id: 1, x: 1, y: 0, value: 2 },
                { id: 2, x: 1, y: 1, value: 2 },
                { id: 3, x: 1, y: 2, value: 2 },
                { id: 4, x: 1, y: 3, value: 2 }
            ]
        };

        moveLeft(game);

        expect(JSON.stringify(game.board)).toEqual(JSON.stringify([
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0]
        ]));
        expect(JSON.stringify(game.tiles)).toEqual(JSON.stringify([
            { id: 1, x: 0, y: 0, value: 2 },
            { id: 2, x: 0, y: 1, value: 2 },
            { id: 3, x: 0, y: 2, value: 2 },
            { id: 4, x: 0, y: 3, value: 2 }
        ]));
    });
});

describe('moveRight', () => {

    test('should move all tiles down one col if there are empty spaces below them', () => {
        const game: Game = {
            board: [
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
            ],
            tiles: [
                { id: 1, x: 1, y: 0, value: 2 },
                { id: 2, x: 1, y: 1, value: 2 },
                { id: 3, x: 1, y: 2, value: 2 },
                { id: 4, x: 1, y: 3, value: 2 }
            ]
        };

        moveRight(game);

        expect(JSON.stringify(game.board)).toEqual(JSON.stringify([
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0]
        ]));
        expect(JSON.stringify(game.tiles)).toEqual(JSON.stringify([
            { id: 1, x: 2, y: 0, value: 2 },
            { id: 2, x: 2, y: 1, value: 2 },
            { id: 3, x: 2, y: 2, value: 2 },
            { id: 4, x: 2, y: 3, value: 2 }
        ]));
    });
});

describe('moveUp', () => {

    test('should move all tiles down one col if there are empty spaces below them', () => {
        const game: Game = {
            board: [
                [0, 0, 0, 0],
                [2, 2, 2, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            tiles: [
                { id: 1, x: 0, y: 1, value: 2 },
                { id: 2, x: 1, y: 1, value: 2 },
                { id: 3, x: 2, y: 1, value: 2 },
                { id: 4, x: 3, y: 1, value: 2 }
            ]
        };

        moveUp(game);

        expect(JSON.stringify(game.board)).toEqual(JSON.stringify([
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]));
        expect(JSON.stringify(game.tiles)).toEqual(JSON.stringify([
            { id: 1, x: 0, y: 0, value: 2 },
            { id: 2, x: 1, y: 0, value: 2 },
            { id: 3, x: 2, y: 0, value: 2 },
            { id: 4, x: 3, y: 0, value: 2 }
        ]));
    });
});