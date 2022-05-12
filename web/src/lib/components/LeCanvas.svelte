<script lang="ts">
  import type {Tile} from '$lib/tile/tiles';

  import {onMount} from 'svelte';
  import TileModal from './TileModal.svelte';

  // based on https://codepen.io/chengarda/pen/wRxoyB

  export let tiles: Tile[];

  const MIN_ZOOM = 20;
  const MAX_ZOOM = 50;

  let canvas: HTMLCanvasElement;
  let cameraZoom = 25;
  let showModal = false;
  let x = 0;
  let y = 0;
  let highX = 0;
  let highY = 0;

  const draw = () => {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1000000, 1000000);

    ctx.font = '1px Arial';
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        let tile = tiles.find((t) => t.x === i.toString() && t.y === j.toString());
        if (tile && tile.item && tile.item.id === '1') {
          ctx.fillStyle = '#00aa77';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('🌲', i, j + 1);
        } else if (tile && tile.item && tile.item.id === '2') {
          ctx.fillStyle = '#770000';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('⛰️', i, j + 1);
        } else {
          ctx.fillStyle = '#00FF77';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('🏜️', i, j + 1);
        }
      }
    }
    ctx.lineWidth = 0.1;
    ctx.beginPath();
    ctx.rect(highX, highY, 1, 1);
    ctx.stroke();
  };

  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    showModal = true;
    x = Math.floor((event.clientX - rect.left) / cameraZoom);
    y = Math.floor((event.clientY - rect.top) / cameraZoom);
  }

  function getMouseMove(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    highX = Math.floor((event.clientX - rect.left) / cameraZoom);
    highY = Math.floor((event.clientY - rect.top) / cameraZoom);

    draw();
  }

  function zoom(evt) {
    const ctx = canvas.getContext('2d');
    // Reset current transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    cameraZoom += evt.deltaY;
    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
    ctx.scale(cameraZoom, cameraZoom);

    draw();
  }

  onMount(() => {
    let frame;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.scale(cameraZoom, cameraZoom);

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
        zoom(evt);
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
  <TileModal {x} {y} bind:showModal players={[]} tile={null} currentPlayer={null} />
  <canvas bind:this={canvas} />
</div>

<style>
  canvas {
    width: 100%;
    height: 100%;
    background-color: #666;
  }
</style>
