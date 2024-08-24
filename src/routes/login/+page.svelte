<script>
    import { goto } from "$app/navigation";
    let username;
    let password;
    let jsonResponse;
    let isVisible = false;
    let message;
    const Request = async () => {
      let response = await fetch("https://go-fingerprint.onrender.com/admin/login", 
                { 
                    method: "POST",
                    credentials:"include",
                    body: JSON.stringify({
                      "username": username,
                      "password": password
                    }),
                }
            );
      if (response.status === 200) {
          jsonResponse = await response.json();
          goto("/collegelist")
      } 
      else{
          jsonResponse = await response.json();
          message = jsonResponse["message"]
          isVisible = true;
      };
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-xl h-[36rem] w-full bg-white rounded-3xl p-8 shadow-2xl">
        <form method="post"></form>
        <h1
            class="text-center text-3xl bg-white rounded-full py-4 mb-8 font-bold"
        >
            LOGIN
        </h1>
        <div class="mb-6">
            <label
                class="block text-black text-2xl font-semibold mb-2 p-3"
                for="usernames"
            >
                User ID
            </label>
            <input
                autocomplete="username"
                bind:value={username}
                type="text"
                name="username"
                placeholder="USER ID"
                class="shadow appearance-auto border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="mb-6">
            <label
                class="block text-black text-2xl font-semibold mb-2 p-3"
                for="passwords"
            >
                Password
            </label>
            <input
                autocomplete="current-password"
                bind:value={password}
                type="password"
                name="password"
                placeholder="PASSWORD"
                class="shadow appearance-auto border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="flex items-center justify-center">
            <button
                class="bg-black text-white font-bold py-4 px-4 text-2xl rounded-lg w-full pl-3 pr-3 mt-10"
                 on:click={Request}
            >
                Login
            </button>
        </div>
    </div>
</div>

{#if isVisible}
    <div
      class="fixed bottom-4 right-4 bg-red-400 text-white font-bold shadow-lg  p-4 rounded-md"
    >
      {#if message}
        {message}
      {/if}
    </div>
{/if}
