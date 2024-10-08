<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { collegelist, giveaccess } from "../../lib/urls";

    // Component state
    let email = '';
    let password = '';
    let selectedCollege = '';
    let users = [];
    let isLoading = true;
    let isSubmitting = false;
    let message = '';
    let notification = '';
    let isNotificationVisible = false;

    // Fetch users from the server
    const fetchUsers = async () => {
        isLoading = true;
        try {
            const response = await fetch(collegelist, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const data = await response.json();
                users = data.data;
                message = '';
            } else {
                const errorData = await response.json();
                message = errorData.message;
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            message = "An error occurred. Please try again.";
        } finally {
            isLoading = false;
            if(users === null){
                isLoading = true;
            }
        }
    };

    // Request access to a user
    const requestAccess = async () => {
        isSubmitting = true;
        try {
            const response = await fetch(giveaccess, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ email, user_name: selectedCollege, password }),
            });

            if (response.ok) {
                const data = await response.json();
                users = data.data;
                notification = 'Email has been sent!';
                isNotificationVisible = true;
                resetForm();
                await fetchUsers();
                setTimeout(() => isNotificationVisible = false, 2000);
            } else {
                const errorData = await response.json();
                message = errorData.message;
            }
        } catch (error) {
            console.error("Error granting access:", error);
            message = "An error occurred. Please try again.";
        } finally {
            isSubmitting = false;
        }
    };

    // Reset form fields
    const resetForm = () => {
        email = '';
        password = '';
        selectedCollege = '';
    };

    // Fetch users when component mounts
    onMount(() => {
        fetchUsers();
    });
</script>

<style>
    /* Spinner styles */
    .spinner, .button-spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
    }
    .spinner {
        border-left-color: black;
    }
    .button-spinner {
        border-left-color: white;
    }

    /* Spin animation */
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl ">
        <h1 class="text-center text-2xl font-bold mb-8">Give Access to User</h1>

        <!-- Loading Spinner -->
        {#if isLoading}
            <div class="flex items-center justify-center">
                <div class="spinner"></div>
            </div>
        {:else}
            <!-- Form Section -->
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
                    {#each users as { user_name }}
                        <option value={user_name}>{user_name}</option>
                    {/each}
                </select>
            </div>

            <!-- Submit Button -->
            <div>
                <button 
                    on:click={requestAccess}
                    class="w-full bg-black text-white font-semibold rounded-lg py-3 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                    <div class="flex justify-center items-center">
                        {#if isSubmitting}
                            <div class="button-spinner"></div>
                        {:else}
                            Access
                        {/if}
                    </div>
                </button>
            </div>
        {/if}

        <!-- Error Message -->
        {#if message}
            <div class="mt-4 text-center text-red-600">{message}</div>
        {/if}
    </div>
</div>

<!-- Notification Message -->
{#if isNotificationVisible}
    <div class="fixed bottom-5 right-5 bg-black text-white py-2 px-4 rounded-lg shadow-lg z-50 transition-opacity duration-500" transition:fade>
        {notification}
    </div>
{/if}
