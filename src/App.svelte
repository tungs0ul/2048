<script lang="ts">
    import {
        initBoard,
        moveUpAndInsert,
        moveDownAndInsert,
        moveLeftAndInsert,
        moveRightAndInsert,
        isGameOver,
        type Result,
    } from '$lib/utils'
    import { onDestroy } from 'svelte'
    import { fade, scale } from 'svelte/transition'
    import ArrowUp from 'lucide-svelte/icons/arrow-up'
    import ArrowDown from 'lucide-svelte/icons/arrow-down'
    import ArrowLeft from 'lucide-svelte/icons/arrow-left'
    import ArrowRight from 'lucide-svelte/icons/arrow-right'

    let board = initBoard()

    let keyDownClicked = false
    let keyUpClicked = false
    let keyLeftClicked = false
    let keyRightClicked = false

    let bgColors: { [key: number]: string } = {
        0: 'bg-white',
        1: 'bg-red-50',
        2: 'bg-red-100',
        4: 'bg-red-200',
        8: 'bg-red-300',
        16: 'bg-red-400',
        32: 'bg-red-500',
        64: 'bg-red-600',
        128: 'bg-red-700',
        256: 'bg-red-800',
        512: 'bg-red-900',
        1024: 'bg-red-950',
        2048: 'bg-black',
    }

    let textColors: { [key: number]: string } = {
        0: 'text-white',
        1: 'text-black',
        2: 'text-black',
        4: 'text-black',
        8: 'text-black',
        32: 'text-black',
        64: 'text-black',
        16: 'text-black',
        128: 'text-white',
        256: 'text-white',
        512: 'text-white',
        1024: 'text-white',
        2048: 'text-white',
    }

    let animations: Result & { fly: string } = {
        moved: [],
        merged: [],
        newTile: undefined,
        fly: '',
    }

    let state: { state: 'playing' | 'processing' | 'gameover' } = {
        state: 'playing',
    }

    const processing = (
        key: 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown',
    ) => {
        if (state.state !== 'playing') return
        state = { state: 'processing' }
        switch (key) {
            case 'ArrowUp':
                keyUpClicked = true
                animations = {
                    ...moveUpAndInsert(board),
                    fly: '-translate-y-full',
                }
                setTimeout(() => (keyUpClicked = false), 50)
                break
            case 'ArrowDown':
                keyDownClicked = true
                animations = {
                    ...moveDownAndInsert(board),
                    fly: 'translate-y-full',
                }
                setTimeout(() => (keyDownClicked = false), 50)
                break
            case 'ArrowLeft':
                keyLeftClicked = true
                animations = {
                    ...moveLeftAndInsert(board),
                    fly: '-translate-x-full',
                }
                setTimeout(() => (keyLeftClicked = false), 50)
                break
            case 'ArrowRight':
                keyRightClicked = true
                animations = {
                    ...moveRightAndInsert(board),
                    fly: 'translate-x-full',
                }
                setTimeout(() => (keyRightClicked = false), 50)
                break
            default:
                break
        }
        setTimeout(() => {
            if (isGameOver(board)) {
                state = { state: 'gameover' }
            } else {
                state = { state: 'playing' }
            }
            board = board
            animations = {
                moved: [],
                merged: [],
                newTile: undefined,
                fly: '',
            }
        }, 200)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (
            event.key === 'ArrowUp' ||
            event.key === 'ArrowDown' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight'
        )
            processing(event.key)
    }

    document.addEventListener('keydown', handleKeyDown)
    onDestroy(() => document.removeEventListener('keydown', handleKeyDown))
</script>

<main class="flex h-[100dvh] flex-col items-center justify-center gap-8 p-2">
    <div class="relative w-full max-w-sm border-2 border-gray-400">
        {#each board as row, rowIndex}
            <div
                class="z-1 relative grid w-full max-w-sm grid-cols-4 bg-gray-400"
            >
                {#each row as col, colIndex}
                    <div
                        class={`relative grid h-20 place-items-center border-2 border-gray-400 p-4 text-2xl font-bold ${bgColors[col]} ${textColors[col]}`}
                    >
                        {col !== 0 ? col : ''}

                        <div
                            class:opacity-0={animations.moved.find(
                                ([r, c]) => r === rowIndex && c === colIndex,
                            ) === undefined}
                            class:opacity-100={animations.moved.find(
                                ([r, c]) => r === rowIndex && c === colIndex,
                            ) !== undefined}
                            class={`absolute inset-0 grid place-items-center border border-black bg-red-100 text-2xl font-bold transition-transform duration-150 ${animations.fly}`}
                        >
                            {col !== 0 ? col : ''}
                        </div>
                        {#if animations.newTile !== undefined && animations.newTile[0] === rowIndex && animations.newTile[1] === colIndex}
                            <div
                                class:opacity-0={animations.newTile ===
                                    undefined}
                                class:opacity-100={animations.newTile !==
                                    undefined &&
                                    animations.newTile[0] === rowIndex &&
                                    animations.newTile[1] === colIndex}
                                class="z-2 absolute inset-0 grid place-items-center border-2 border-green-400 text-2xl font-bold transition-opacity duration-150"
                            ></div>
                        {/if}
                        {#if animations.merged.find(([r, c]) => r === rowIndex && c === colIndex)}
                            <div
                                out:fade={{
                                    duration: 200,
                                    delay: 200,
                                }}
                                class={`z-1000 absolute inset-0 grid scale-110 place-items-center border-2 border-gray-400 transition-transform duration-150 ${bgColors[col]} text-2xl font-bold text-transparent`}
                            ></div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
    <div class="grid grid-cols-3 gap-1">
        <div></div>
        <button
            on:click={() => processing('ArrowUp')}
            class:bg-gray-400={keyUpClicked}
            class="grid place-items-center rounded-t-md border px-6 py-4"
        >
            <ArrowUp size={24} />
        </button>
        <div></div>
        <button
            on:click={() => processing('ArrowLeft')}
            class:bg-gray-400={keyLeftClicked}
            class="grid place-items-center rounded-l-md border px-6 py-4"
        >
            <ArrowLeft size={24} />
        </button>
        <button
            on:click={() => processing('ArrowDown')}
            class:bg-gray-400={keyDownClicked}
            class="grid place-items-center border px-6 py-4"
        >
            <ArrowDown size={24} />
        </button>
        <button
            on:click={() => processing('ArrowRight')}
            class:bg-gray-400={keyRightClicked}
            class="grid place-items-center rounded-r-md border px-6 py-4"
        >
            <ArrowRight size={24} />
        </button>
    </div>
</main>

{#if state.state === 'gameover'}
    <div
        transition:scale
        class="fixed inset-0 flex flex-col items-center justify-center gap-8 overflow-hidden bg-black/90"
    >
        <h1 class="text-4xl font-bold text-red-400">Game Over</h1>
        <h2 class="text-2xl text-white">
            Score: {board.reduce(
                (acc, row) => acc + row.reduce((acc, col) => acc + col, 0),
                0,
            )}
        </h2>
        <button
            on:click={() => {
                state = { state: 'playing' }
                board = initBoard()
            }}
            class="rounded-xl bg-green-400 px-6 py-4 text-2xl text-white shadow"
        >
            Play
        </button>
    </div>
{/if}
