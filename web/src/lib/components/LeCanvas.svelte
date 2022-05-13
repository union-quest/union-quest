<script lang="ts">
  import {getPosition, Player} from '$lib/player/player';

  import type {Tile} from '$lib/tile/tiles';

  import {onMount} from 'svelte';
  import TileModal from './TileModal.svelte';

  // based on https://codepen.io/chengarda/pen/wRxoyB

  export let tiles: Tile[];
  export let players: Player[];
  export let currentPlayer: Player | null;

  const MIN_ZOOM = 30;
  const MAX_ZOOM = 100;
  let currentTimestamp = Date.now();

  let canvas: HTMLCanvasElement;
  let cameraZoom = 50;
  let showModal = false;
  let x = 0;
  let y = 0;
  let highX = 0;
  let highY = 0;

  const draw = () => {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#eab308';
    ctx.fillRect(0, 0, 1000000, 1000000);
    ctx.strokeStyle = '#FFFFFF';

    ctx.font = '1px Arial';
    for (let i = -50; i < 50; i++) {
      for (let j = -50; j < 50; j++) {
        let tile = tiles.find((t) => t.x === i.toString() && t.y === j.toString());
        if (tile && tile.item && tile.item.id === '1') {
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('🌲', i, j + 1);
          ctx.strokeRect(i, j, 1, 1);
        } else if (tile && tile.item && tile.item.id === '2') {
          ctx.fillStyle = '#d1d5db';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('⛰️', i, j + 1);
          ctx.strokeRect(i, j, 1, 1);
        } else if (i === 0 && j === 0) {
          ctx.fillStyle = '#AAAAAA';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('⛺', i, j + 1);
          ctx.strokeRect(i, j, 1, 1);
        } else {
          ctx.fillStyle = '#eab308';
          ctx.fillRect(i, j, 1, 1);
          ctx.strokeRect(i, j, 1, 1);
        }
      }
    }

    ctx.lineWidth = 0.1;
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(highX, highY, 1, 1);

    if (currentPlayer) {
      ctx.strokeStyle = '#FF0000';
      ctx.strokeRect(parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y), 1, 1);

      ctx.strokeStyle = '#3b82f6';
      ctx.strokeRect(
        Math.round(getPosition(currentPlayer, currentTimestamp / 1000)[0]),
        Math.round(getPosition(currentPlayer, currentTimestamp / 1000)[1]),
        1,
        1
      );
    }

    // Replace these with blockies
    players.forEach((p) => {
      ctx.fillStyle = '#0000AA';

      const position = getPosition(p, currentTimestamp / 1000);
      ctx.fillRect(position[0] + 0.25, position[1] + 0.25, 0.5, 0.5);

      if (position[0] === parseInt(p.endTile.x) && position[1] === parseInt(p.endTile.y)) {
        if (p.endTile.item.id === '1') {
          ctx.fillText('🪓', position[0] + 0.5, position[1] + 0.5);
        } else {
          ctx.fillText('⛏️', position[0] + 0.5, position[1] + 0.5);
        }
      } else {
        ctx.fillText('👟', position[0] + 0.5, position[1] + 0.5);
      }
    });
  };

  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    showModal = true;
    x = Math.floor((event.clientX - rect.left - window.innerWidth / 2) / cameraZoom);
    y = Math.floor((event.clientY - rect.top - window.innerHeight / 2) / cameraZoom);
  }

  function getMouseMove(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    highX = Math.floor((event.clientX - rect.left - window.innerWidth / 2) / cameraZoom);
    highY = Math.floor((event.clientY - rect.top - window.innerHeight / 2) / cameraZoom);

    draw();
  }

  function zoom(evt) {
    const ctx = canvas.getContext('2d');
    // Reset current transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    cameraZoom += evt.deltaY;
    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);

    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    ctx.scale(cameraZoom, cameraZoom);

    draw();
  }

  onMount(() => {
    let frame;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
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

    const interval = setInterval(() => {
      currentTimestamp = Date.now();
    }, 100);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  });
</script>

<div>
  <TileModal {x} {y} bind:showModal players={[]} {currentPlayer} tile={null} />
  <canvas bind:this={canvas} />
</div>

<style>
  canvas {
    width: 100%;
    height: 100%;
    background-color: #666;
  }
</style>
