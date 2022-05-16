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
  let cameraOffset;
  let isDragging = false;
  let dragStart = {x: 0, y: 0};

  let x = 100000000;
  let y = 100000000;

  let showModal = false;
  let tiles = {};

  const draw = () => {
    let ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        ctx.fillStyle = '#808080';
        ctx.fillRect(i - 0.5, j - 0.5, 1, 1);
        ctx.fillText('⛰️', i - 0.5, j + 0.5);
      }
    }

    for (let i = -9; i < 11; i++) {
      for (let j = -9; j < 11; j++) {
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

    ctx.lineWidth = 0.04;

    if (currentPlayer) {
      ctx.strokeStyle = '#FF0000';
      ctx.strokeRect(parseInt(currentPlayer.endX) - 0.5, parseInt(currentPlayer.endY) - 0.5, 1, 1);
    }

    players.forEach((p) => {
      const position = getPosition(p, currentTimestamp / 1000);
      let img = document.getElementById(p.id);
      ctx.drawImage(img, position[0] - 0.25, position[1] - 0.25, 0.5, 0.5);

      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(position[0] - 0.25, position[1] - 0.25, 0.5, 0.5);

      if (position[0] === parseInt(p.endX) && position[1] === parseInt(p.endY)) {
        if (getItem(parseInt(p.endX), parseInt(p.endY))) {
          if (getItem(parseInt(p.endX), parseInt(p.endY)) === 1) {
            ctx.fillText('🪓', position[0], position[1]);
          } else {
            ctx.fillText('⛏️', position[0], position[1]);
          }
        }
      }
    });

    ctx.strokeStyle = '#0000FF';
    ctx.strokeRect(x, y, 1, 1);
  };

  // Gets the relevant location from a mouse or single touch event
  function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
      return {x: e.touches[0].clientX, y: e.touches[0].clientY};
    } else if (e.clientX && e.clientY) {
      return {x: e.clientX, y: e.clientY};
    }
  }

  function onDblClick() {
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

    let rect = canvas.getBoundingClientRect();

    x =
      Math.floor(
        (e.clientX - rect.left - window.innerWidth / 2) / cameraZoom + (window.innerWidth / 2 - cameraOffset.x) + 0.5
      ) - 0.5;
    y =
      Math.floor(
        (e.clientY - rect.left - window.innerHeight / 2) / cameraZoom + (window.innerHeight / 2 - cameraOffset.y) - 0.5
      ) + 0.5;
  }

  function handleTouch(e, singleTouchHandler) {
    if (e.touches.length == 1) {
      singleTouchHandler(e);
    } else if (e.type == 'touchmove' && e.touches.length == 2) {
      isDragging = false;
      handlePinch(e);
    }
  }

  let initialPinchDistance = null;
  let lastZoom = cameraZoom;

  function handlePinch(e) {
    e.preventDefault();

    let touch1 = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    let touch2 = {x: e.touches[1].clientX, y: e.touches[1].clientY};

    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

    if (initialPinchDistance == null) {
      initialPinchDistance = currentDistance;
    } else {
      adjustZoom(null, currentDistance / initialPinchDistance);
    }
  }

  function adjustZoom(evt) {
    cameraZoom -= evt.deltaY;
    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
  }

  onMount(() => {
    cameraOffset = {x: window.innerWidth / 2, y: window.innerHeight / 2};

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown));
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('touchend', (e) => handleTouch(e, onPointerUp));
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove));
    canvas.addEventListener('wheel', (e) => adjustZoom(e));
    canvas.addEventListener('dblclick', onDblClick);

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
  <TileModal x={x + 0.5} y={y + 0.5} bind:showModal {currentPlayer} />
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
