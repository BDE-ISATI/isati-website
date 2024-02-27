<script lang="ts">
    import Button from '$lib/components/individuels/Button.svelte';
    import { onMount } from 'svelte';
    import { apiUri,getIdToken } from '$lib/config';

    const url = apiUri + "/login";
    

let email: ""
let password: ""

async function send(){
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });

  let data = await response.json()

  document.cookie = `AccessToken=${data.AuthenticationResult.AccessToken};max-age=${data.AuthenticationResult.ExpiresIn}`;
  document.cookie = `RefreshToken=${data.AuthenticationResult.RefreshToken};max-age=${data.AuthenticationResult.ExpiresIn}`;
  document.cookie = `IdToken=${data.AuthenticationResult.IdToken};max-age=${data.AuthenticationResult.ExpiresIn}`;
  logged = true

}

let logged = false;

async function check() {
  if (!logged) { return false }
  try {
    let req = await fetch(apiUri+"/login/test", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getIdToken()}`
        }
    });
    return req.status == 200
  }
  catch {
    return false
  }
  
}

onMount(async () => {
  logged = await check()
})

</script>
{#if !logged}
    <input bind:value={email}>
    <input bind:value={password}>
    <button on:click={send}>send</button>
{:else}
    <Button on:click={() => {window.location.pathname="/admin/events"}}>Events</Button>
    <Button on:click={() => {window.location.pathname="/admin/users"}}>Users</Button>
    <slot></slot>

{/if}

