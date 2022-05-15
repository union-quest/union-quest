<script lang="ts">
  import {getItem, getPosition, Player} from '$lib/player/player';
  import {onMount} from 'svelte';
  import TileModal from './TileModal.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';

  // based on https://codepen.io/chengarda/pen/wRxoyB

  export let players: Player[];
  export let currentPlayer: Player | null;

  const MIN_ZOOM = 25;
  const MAX_ZOOM = 100;
  let currentTimestamp = Date.now();

  let canvas: HTMLCanvasElement;
  let cameraZoom = 50;
  let cameraOffset = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  let isDragging = false;
  let dragStart = {x: 0, y: 0};

  let showModal = false;
  let tiles = {};

  const draw = () => {
    let ctx = canvas.getContext('2d');

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.translate(-window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = '#BBBBBB';

    ctx.lineWidth = 0.01;
    ctx.font = '1px Arial';
    for (let i = -50; i < 50; i++) {
      for (let j = -50; j < 50; j++) {
        if (!tiles[i]) {
          tiles[i] = {};
        }
        if (!tiles[i][j]) {
          tiles[i][j] = getItem(i, j);
        }
        if (i === 0 && j === 0) {
          ctx.fillStyle = '#9400D3';
          ctx.fillRect(i - 0.5, j - 0.5, 1, 1);
          ctx.fillText('🚪', i - 0.5, j + 0.5);
        } else if (tiles[i][j] === 1) {
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(i - 0.5, j - 0.5, 1, 1);
          ctx.fillText('🌲', i - 0.5, j + 0.5);
        } else if (tiles[i][j] === 2) {
          ctx.fillStyle = '#cd9575';
          ctx.fillRect(i - 0.5, j - 0.5, 1, 1);
          ctx.fillText('🪨', i - 0.5, j + 0.5);
        } else {
          ctx.fillStyle = '#59A608';
          ctx.fillRect(i - 0.5, j - 0.5, 1, 1);
        }
        ctx.strokeRect(i - 0.5, j - 0.5, 1, 1);
      }
    }

    if (currentPlayer) {
      ctx.strokeStyle = '#FF0000';
      ctx.strokeRect(parseInt(currentPlayer.endTile.x) - 0.5, parseInt(currentPlayer.endTile.y) - 0.5, 1, 1);
    }

    ctx.lineWidth = 0.04;

    players.forEach((p) => {
      const position = getPosition(p, currentTimestamp / 1000);
      let img = document.getElementById(p.id);
      ctx.drawImage(img, position[0] - 0.25, position[1] - 0.25, 0.5, 0.5);

      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(position[0] - 0.25, position[1] - 0.25, 0.5, 0.5);

      if (position[0] === parseInt(p.endTile.x) && position[1] === parseInt(p.endTile.y)) {
        if (getItem(p.endTile.x, p.endTile.y)) {
          if (getItem(p.endTile.x, p.endTile.y) === 1) {
            ctx.fillText('🪓', position[0], position[1]);
          } else {
            ctx.fillText('⛏️', position[0], position[1]);
          }
        }
      }
    });

    ctx.strokeStyle = '#0000FF';
    ctx.strokeRect(
      Math.floor(window.innerWidth / 2 - cameraOffset.x) - 0.5,
      Math.floor(window.innerHeight / 2 - cameraOffset.y) - 0.5,
      1,
      1
    );
  };

  // Gets the relevant location from a mouse or single touch event
  function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
      return {x: e.touches[0].clientX, y: e.touches[0].clientY};
    } else if (e.clientX && e.clientY) {
      return {x: e.clientX, y: e.clientY};
    }
  }

  function onClick(e) {
    showModal = true;
  }

  function onPointerDown(e) {
    isDragging = true;
    dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
  }

  function onPointerUp(e) {
    isDragging = false;
  }

  function onPointerMove(e) {
    if (isDragging) {
      cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x;
      cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y;
    }
  }

  function adjustZoom(evt) {
    cameraZoom -= evt.deltaY;
    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
  }

  onMount(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener(
      'click',
      function (evt) {
        onClick(evt);
      },
      false
    );
    canvas.addEventListener(
      'wheel',
      function (evt) {
        adjustZoom(evt);
      },
      false
    );
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mouseup', onPointerUp);

    const interval = setInterval(() => {
      currentTimestamp = Date.now();
      draw();
    }, 10);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  <TileModal
    x={Math.floor(window.innerWidth / 2 - cameraOffset.x)}
    y={Math.floor(window.innerHeight / 2 - cameraOffset.y)}
    bind:showModal
    {currentPlayer}
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
  }
</style>
