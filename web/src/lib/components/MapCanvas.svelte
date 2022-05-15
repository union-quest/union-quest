<script lang="ts">
  import {getPosition, Player} from '$lib/player/player';
  import type {Tile} from '$lib/tile/tiles';
  import {onMount} from 'svelte';
  import TileModal from './TileModal.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';

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
  let focusX = 0;
  let focusY = 0;

  const draw = () => {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#eab308';
    ctx.fillRect(0, 0, 1000000, 1000000);
    ctx.strokeStyle = '#FFFFFF';

    ctx.font = '1px Arial';
    for (let i = -50; i < 50; i++) {
      for (let j = -50; j < 50; j++) {
        let tile = tiles.find((t) => t.x === i.toString() && t.y === j.toString());
        if (i === 0 && j === 0) {
          ctx.fillStyle = '#09B051';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('⛺', i, j + 1);
          ctx.strokeRect(i, j, 1, 1);
        } else if (tile && tile.item && tile.item.id === '1') {
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('🌲', i, j + 1);
          ctx.strokeRect(i, j, 1, 1);
        } else if (tile && tile.item && tile.item.id === '2') {
          ctx.fillStyle = '#cd9575';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('🪨', i, j + 1);
          ctx.strokeRect(i, j, 1, 1);
        } else if (i > 10 || i < -10 || j > 10 || j < -10) {
          ctx.fillStyle = '#AAAAAA';
          ctx.fillRect(i, j, 1, 1);
          ctx.fillText('⛰️', i, j + 1);
          ctx.strokeRect(i, j, 1, 1);
        } else {
          ctx.fillStyle = '#59A608';
          ctx.fillRect(i, j, 1, 1);
          ctx.strokeRect(i, j, 1, 1);
        }
      }
    }

    ctx.lineWidth = 0.05;
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(focusX, focusY, 1, 1);

    if (currentPlayer) {
      ctx.strokeStyle = '#FF0000';
      ctx.strokeRect(parseInt(currentPlayer.endTile.x), parseInt(currentPlayer.endTile.y), 1, 1);
    }

    players.forEach((p) => {
      const position = getPosition(p, currentTimestamp / 1000);
      let img = document.getElementById(p.id);
      ctx.drawImage(img, position[0] + 0.25, position[1] + 0.25, 0.5, 0.5);

      ctx.strokeStyle = '#222222';
      ctx.strokeRect(position[0] + 0.25, position[1] + 0.25, 0.5, 0.5);

      if (position[0] === parseInt(p.endTile.x) && position[1] === parseInt(p.endTile.y)) {
        if (p.endTile.item) {
          if (p.endTile.item.id === '1') {
            ctx.fillText('🪓', position[0] + 0.5, position[1] + 0.5);
          } else {
            ctx.fillText('⛏️', position[0] + 0.5, position[1] + 0.5);
          }
        }
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

    focusX = Math.floor((event.clientX - rect.left - window.innerWidth / 2) / cameraZoom + 0.5);
    focusY = Math.floor((event.clientY - rect.top - window.innerHeight / 2) / cameraZoom);
  }

  function zoom(evt) {
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    cameraZoom += evt.deltaY;
    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);

    ctx.translate(window.innerWidth / 2 - cameraZoom * 0.5, window.innerHeight / 2);
    ctx.scale(cameraZoom, cameraZoom);
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
      },
      false
    );

    const interval = setInterval(() => {
      currentTimestamp = Date.now();
      draw();
    }, 10);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  });
</script>

<div>
  <TileModal
    {x}
    {y}
    bind:showModal
    {currentPlayer}
    tile={tiles.find((t) => t.x === x.toString() && t.y === y.toString())}
  />
  <canvas bind:this={canvas} />
  {#each players as p}
    <Blockie class="hidden" address={p.id} />
  {/each}
</div>

<style>
  canvas {
    width: 100%;
    height: 100%;
    background-color: #666;
  }
</style>
