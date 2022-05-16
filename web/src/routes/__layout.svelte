<script lang="ts">
  import '../service-worker-handler';
  import '../global.css';
  import Notifications from '$lib/components/styled/notification/Notifications.svelte';
  import NoInstallPrompt from '$lib/components/generic/NoInstallPrompt.svelte';
  import NewVersionNotification from '$lib/components/styled/NewVersionNotification.svelte';
  import DarkSwitch from '$lib/components/styled/DarkSwitch.svelte';
  import Blockie from '$lib/components/generic/CanvasBlockie.svelte';

  import {appDescription, url as appUrl} from '../application.json';
  import {wallet} from '$lib/blockchain/wallet';
  import NavButton from '$lib/components/styled/navigation/NavButton.svelte';
  import {url} from '$lib/utils/url';

  const title = 'Union Quest, Template for Decentralised Applications.';
  const description = appDescription;
  const host = appUrl.endsWith('/') ? appUrl : appUrl + '/';
  const previewImage = host + 'preview.png';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={host} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={previewImage} />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={host} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={previewImage} />
</svelte:head>

<NoInstallPrompt />
<NewVersionNotification />

<slot />
<Notifications />
