<script lang="ts">
    import {
        initBoard,
        moveUpAndInsert,
        moveDownAndInsert,
        moveLeftAndInsert,
        moveRightAndInsert,
        isGameOver,
    } from '$lib/utils'
    import { onDestroy } from 'svelte'
    import { fly, scale } from 'svelte/transition'
    import ArrowUp from 'lucide-svelte/icons/arrow-up'
    import ArrowDown from 'lucide-svelte/icons/arrow-down'
    import ArrowLeft from 'lucide-svelte/icons/arrow-left'
    import ArrowRight from 'lucide-svelte/icons/arrow-right'
    import { flip } from 'svelte/animate'

    let game = initBoard()

    let keyDownClicked = false
    let keyUpClicked = false
    let keyLeftClicked = false
    let keyRightClicked = false

    const bgColors: { [key: number]: string } = {
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

    const textColors: { [key: number]: string } = {
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

    const leftPosition: { [key: number]: string } = {
        0: 'left-0',
        1: 'left-1/4',
        2: 'left-2/4',
        3: 'left-3/4',
    }

    const topPosition: { [key: number]: string } = {
        0: 'top-0',
        1: 'top-1/4',
        2: 'top-2/4',
        3: 'top-3/4',
    }

    let state: { state: 'playing' | 'processing' | 'gameover' } = {
        state: 'playing',
    }
    let animation: { x?: string; y?: string } = {}

    const processing = (
        key: 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown',
    ) => {
        if (state.state !== 'playing') return
        state = { state: 'processing' }
        switch (key) {
            case 'ArrowUp':
                keyUpClicked = true
                moveUpAndInsert(game)
                animation = { y: '100%' }
                setTimeout(() => (keyUpClicked = false), 50)
                break
            case 'ArrowDown':
                keyDownClicked = true
                moveDownAndInsert(game)
                animation = { y: '-100%' }
                setTimeout(() => (keyDownClicked = false), 50)
                break
            case 'ArrowLeft':
                keyLeftClicked = true
                animation = { x: '100%' }

                moveLeftAndInsert(game)
                setTimeout(() => (keyLeftClicked = false), 50)
                break
            case 'ArrowRight':
                keyRightClicked = true
                moveRightAndInsert(game)
                animation = { x: '-100%' }

                setTimeout(() => (keyRightClicked = false), 50)
                break
            default:
                break
        }
        setTimeout(() => {
            if (isGameOver(game)) {
                state = { state: 'gameover' }
            } else {
                state = { state: 'playing' }
            }
            game = game
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
    <div class=" relative w-80 max-w-sm border-2 border-gray-400 md:w-full">
        {#each game.board as row}
            <div class="z-1 relative grid max-w-sm grid-cols-4 bg-gray-400">
                {#each row as _}
                    <div
                        class={`relative grid h-20 w-20 place-items-center border-2  border-gray-400 bg-white p-4 text-2xl font-bold md:h-24 md:w-24`}
                    ></div>
                {/each}
            </div>
        {/each}
        {#each game.tiles as tile (tile.id)}
            <div
                in:fly={animation}
                animate:flip
                out:scale={{
                    start: 0,
                    duration: 200,
                    opacity: 100,
                }}
                class={`z-1000 absolute ${leftPosition[tile.x]} ${topPosition[tile.y]} ${bgColors[tile.value]} ${textColors[tile.value]} grid h-1/4 w-1/4 place-items-center border-2 border-gray-400 text-2xl transition-all duration-200`}
            >
                {tile.value}
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
            Score: {game.board.reduce(
                (acc, row) => acc + row.reduce((acc, col) => acc + col, 0),
                0,
            )}
        </h2>
        <button
            on:click={() => {
                state = { state: 'playing' }
                game = initBoard()
            }}
            class="rounded-xl bg-green-400 px-6 py-4 text-2xl text-white shadow"
        >
            Play
        </button>
    </div>
{/if}
