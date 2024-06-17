<script lang="ts">
    import Button from '$lib/components/individuels/Button.svelte';
    import { onMount } from 'svelte';
    import { apiUri,getIdToken } from '$lib/config';

    import Input from '$lib/components/individuels/Input.svelte';

    import { logged } from '$lib/store';

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
  $logged = true

}

async function check() {
  if (!getIdToken()) { return false }
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
  if (!$logged){
    $logged = await check()
  }
})

</script>
<div class="flex flex-col gap-4">
  {#if !$logged}
    
      <h1>Panel Admin</h1>
      <Input placeholder="Login" bind:value={email}/>
      <Input placeholder="Password" type="password" bind:value={password}/>
      
      <Button on:click={send}>Connexion</Button>
    
  {:else}
    <div class="flex gap-4">
      <Button href={"/admin/events"}>Events</Button>
      <Button href={"/admin/users"}>Users</Button>
      <Button href={"/admin/salles"}>Salles</Button>
      <Button href={"/admin/articles"}>Articles</Button>
    </div>
    <slot></slot>
  {/if}
</div>