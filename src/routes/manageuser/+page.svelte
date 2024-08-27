<script>
    import { onMount } from "svelte";

    let email = '';
    let password = '';
    let selectedCollege = '';
    let jsonResponse;
    let users = [];
    let loading = true;
    let accessLoading = false;
    let message = '';

    const fetchUsers = async () => {
        loading = true;
        try {
            let response = await fetch("https://go-fingerprint.onrender.com/admin/getusers", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({}),
            });

            if (response.ok) {
                jsonResponse = await response.json();
                users = jsonResponse['data'];
                message = '';
            } else {
                jsonResponse = await response.json();
                message = jsonResponse["message"];
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            message = "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };

    const requestAccess = async () => {
        accessLoading = true;
        try {
            let response = await fetch("https://go-fingerprint.onrender.com/admin/giveaccess", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                   "email": email,
                   "username": selectedCollege,
                   "password": password,
                }),
            });

            if (response.ok) {
                jsonResponse = await response.json();
                users = jsonResponse['data'];
                message = 'Access granted successfully!';
                email = '';
                password = '';
                selectedCollege = '';
            } else {
                jsonResponse = await response.json();
                message = jsonResponse["message"];
            }
        } catch (error) {
            console.error("Error granting access:", error);
            message = "An error occurred. Please try again.";
        } finally {
            accessLoading = false;
        }
    };

    onMount(() => {
        fetchUsers();
    });
</script>

<style>
    .loading-spinner {
        border: 4px solid rgba(255, 255, 255, 0.3); /* Light semi-transparent border */
        border-left-color: black; /* Spinner color */
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
    }
    
    .button-spinner {
        border: 4px solid rgba(255, 255, 255, 0.3); /* Light semi-transparent border */
        border-left-color: white; /* Spinner color */
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .button-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-lg h-auto bg-white rounded-3xl p-6 shadow-2xl">
        <h1 class="text-center text-2xl font-bold mb-8">Give Access to User</h1>

        {#if loading}
            <div class="flex items-center justify-center">
                <div class="loading-spinner"></div>
            </div>
        {:else}
            <div class="mb-6">
                <label class="block text-black text-xl font-medium mb-2" for="email">Email ID</label>
                <input 
                    bind:value={email}
                    autocomplete="email"
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    class="w-full border rounded-lg py-3 px-4 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
            </div>
            <div class="mb-6">
                <label class="block text-black text-xl font-medium mb-2" for="password">Password</label>
                <input 
                    bind:value={password}
                    autocomplete="current-password"
                    type="password"
                    name="password"
                    placeholder="PASSWORD"
                    class="w-full border rounded-lg py-3 px-4 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
            </div>

            <div class="mb-6">
                <label class="block text-black text-xl font-medium mb-2" for="college">Select College</label>
                <select 
                    bind:value={selectedCollege}
                    name="college"
                    id="college"
                    class="w-full border rounded-lg py-3 px-4 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                    <option value="" disabled>Select a college</option>
                    {#each users as college}
                        <option value={college.username}>{college.username}</option>
                    {/each}
                </select>
            </div>

            <div>
                <button 
                    on:click={requestAccess}
                    class="w-full bg-black text-white font-semibold rounded-lg py-3 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    disabled={accessLoading} 
                >
                    <div class="button-content">
                        {#if accessLoading}
                            <div class="button-spinner "></div>
                        {:else}
                            Access
                        {/if}
                    </div>
                </button>
            </div>
        {/if}

        {#if message}
            <div class="mt-4 text-center text-red-600">{message}</div>
        {/if}
    </div>
</div>
