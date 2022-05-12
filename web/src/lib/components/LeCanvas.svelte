<script lang="ts">
  import type {Tile} from '$lib/tile/tiles';

  import {onMount} from 'svelte';
  import TileModal from './TileModal.svelte';

  export let tiles: Tile[];

  let canvas: HTMLCanvasElement;
  let scale = 1;
  let showModal = false;
  let x = 0;
  let y = 0;
  let highX = 0;
  let highY = 0;

  const draw = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 10000, 100000);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let tile = tiles.find((t) => t.x === i.toString() && t.y === j.toString());
        if (i === highX && j === highY) {
          ctx.fillStyle = '#000099';
        } else if (tile && tile.item && tile.item.id === '1') {
          ctx.fillStyle = '#00cc77';
        } else if (tile && tile.item && tile.item.id === '2') {
          ctx.fillStyle = '#770000';
        } else {
          ctx.fillStyle = '#FFFFFF';
        }

        ctx.fillRect(i, j, 1, 1);

        ctx.fillStyle = '#0000ff';
        ctx.lineWidth = 0.1;
        ctx.beginPath();
        ctx.rect(i, j, 1, 1);
        ctx.stroke();
      }
    }
  };

  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    showModal = true;
    x = Math.floor((event.clientX - rect.left) / scale);
    y = Math.floor((event.clientY - rect.top) / scale);
  }

  function getMouseMove(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    highX = Math.floor((event.clientX - rect.left) / scale);
    highY = Math.floor((event.clientY - rect.top) / scale);

    draw();
  }

  onMount(() => {
    let frame;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener(
      'click',
      function (evt) {
        getMousePosition(canvas, evt);
      },
      false
    );
    canvas.addEventListener(
      'mousemove',
      function (evt) {
        getMouseMove(canvas, evt);
      },
      false
    );
    canvas.addEventListener(
      'wheel',
      function (evt) {
        const ctx = canvas.getContext('2d');
        if (evt.deltaY > 0) {
          scale *= 2;
          ctx.scale(2, 2);
        } else {
          scale /= 2;
          ctx.scale(0.5, 0.5);
        }
        draw();
      },
      false
    );

    draw();
    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<div>
  <TileModal {x} {y} {showModal} players={[]} />
  <div class="absolute bg-gray-500 w-64">
    <button
      on:click={() => {
        const ctx = canvas.getContext('2d');
        scale *= 2;
        ctx.scale(2, 2);
        draw();
      }}
    >
      Zoom in
    </button>
    <button
      class="absolute"
      on:click={() => {
        const ctx = canvas.getContext('2d');
        scale /= 2;
        ctx.scale(0.5, 0.5);
        draw();
      }}
    >
      Zoom out
    </button>
  </div>
  <canvas bind:this={canvas} />
</div>

<style>
  canvas {
    width: 100%;
    height: 100%;
    background-color: #666;
  }
</style>
