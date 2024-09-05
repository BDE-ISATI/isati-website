<script lang="ts">
    import Button from '$lib/components/individuels/Button.svelte';
    import { onMount } from 'svelte';
    import { apiUri,getAccessToken,getIdToken } from '$lib/config';
    import { logged } from '$lib/store';    

async function check() {
  if (!getAccessToken()) { return false }
  try {
    let req = await fetch(apiUri+"/login", {
        method: "POST",
        body: JSON.stringify({
          AccessToken:getAccessToken()
        }),
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
  
  let params = new URLSearchParams(document.location.hash.slice(1));

  if (params.get("access_token")){
    document.cookie = `AccessToken=${params.get("access_token")};max-age=${params.get("expires_in")}`;
    document.location.hash = ""
  }
})

</script>
<div class="flex flex-col gap-4">
  {#if !$logged}
    
      <h1>Panel Admin</h1>
      <Button href="https://isati-website-admin.auth.eu-west-3.amazoncognito.com/oauth2/authorize?client_id=1v43031b45oid7o1053srdcnt6&response_type=token&scope=aws.cognito.signin.user.admin&redirect_uri={document.location.origin}/admin">Connexion Google</Button>
  
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