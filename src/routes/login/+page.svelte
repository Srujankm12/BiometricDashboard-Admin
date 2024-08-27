<script>
    import { goto } from "$app/navigation";
    
    let username = '';
    let password = '';
    let responseMessage = '';
    let isErrorVisible = false;
    let isLoading = false;

    const handleLogin = async () => {
        isLoading = true;
        isErrorVisible = false;
        responseMessage = '';

        try {
            const response = await fetch("https://go-fingerprint.onrender.com/admin/login", {
                method: "POST",
                credentials:"include",
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                // Navigate to the next page
                goto("/collegelist");
            } else {
                // Handle error response
                const jsonResponse = await response.json();
                responseMessage = jsonResponse.message || 'An unexpected error occurred.';
                isErrorVisible = true;
            }
        } catch (error) {
            responseMessage = 'Failed to communicate with the server. Please try again later.';
            console.log(error);
            isErrorVisible = true;
        } finally {
            isLoading = false;
        }
    };
</script>

<style>
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid #ffffff;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 h-[450px] flex flex-col justify-between relative">
        <h1 class="text-center text-2xl font-bold mb-6">Login</h1>
        <div>
            <div class="mb-6">
                <label class="block text-lg font-semibold mb-2" for="username">
                    User ID
                </label>
                <input
                    id="username"
                    autocomplete="username"
                    bind:value={username}
                    type="text"
                    placeholder="USER ID"
                    class="w-full p-3 border border-gray-300 rounded-lg text-lg"
                />
            </div>
            <div class="mb-6">
                <label class="block text-lg font-semibold mb-2" for="password">
                    Password
                </label>
                <input
                    id="password"
                    autocomplete="current-password"
                    bind:value={password}
                    type="password"
                    placeholder="PASSWORD"
                    class="w-full p-3 border border-gray-300 rounded-lg text-lg"
                />
            </div>
        </div>
        <div class="flex items-center justify-center">
            <button
                class="w-full bg-black text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg relative"
                on:click={handleLogin}
                disabled={isLoading}
            >
                {#if isLoading}
                    <div class="spinner"></div>
                {:else}
                    Login
                {/if}
            </button>
        </div>
    </div>
</div>

{#if isErrorVisible}
    <div class="fixed bottom-4 right-4 bg-red-500 text-white font-bold p-4 rounded-md shadow-lg">
        {responseMessage}
    </div>
{/if}
