<script>
  import {onMount} from 'svelte';

  let canvas;
  let scale = 1;

  const draw = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 10000, 100000);

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        ctx.fillStyle = '#00cc77';
        ctx.fillRect(i, j, 1, 1);

        ctx.fillStyle = '#0000ff';
        ctx.lineWidth = '0.1';
        ctx.beginPath();
        ctx.rect(i, j, 1, 1);
        ctx.stroke();
      }
    }
  };

  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log('Coordinate x: ' + Math.floor(x / scale), 'Coordinate y: ' + Math.floor(y / scale));
  }

  onMount(() => {
    let frame;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Binding the click event on the canvas
    canvas.addEventListener(
      'click',
      function (evt) {
        getMousePosition(canvas, event);
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
