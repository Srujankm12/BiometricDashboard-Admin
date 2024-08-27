<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let colleges = [];
    let username = '';
    let password = '';
    let responseMessage;
    let isModalVisible = false;
    let successMessage = '';
    let loading = false;

    const fetchColleges = async () => {
        loading = true;
        try {
            const response = await fetch("https://go-fingerprint.onrender.com/admin/getusers", {
                method: "POST",
               credentials:"include",
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const data = await response.json();
                colleges = data['data'];
                isModalVisible = false;
            } else {
                const errorData = await response.json();
                responseMessage = errorData['message'];
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            loading = false;
        }
    };

    const createUser = async (event) => {
        event.preventDefault();
        loading = true;
        try {
            const response = await fetch("https://go-fingerprint.onrender.com/users/register", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                await response.json();
                username = '';
                password = '';
                isModalVisible = false;
                successMessage = 'User created successfully!';
                setTimeout(() => successMessage = '', 2000);
                await fetchColleges();
            } else {
                const errorData = await response.json();
                responseMessage = errorData["message"];
            }
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        fetchColleges();
    });

    const toggleModal = () => {
        isModalVisible = !isModalVisible;
    };

    const goToCreateCollege = () => goto("/new");
</script>

<h2 class="text-3xl font-semibold mb-4 text-black px-8 pt-8">College List</h2>

<div class="overflow-auto px-8">
    {#if loading}
        <div class="fixed inset-0 flex items-center justify-center">
            <div class="spinner"></div>
        </div>
    {:else}
        <div class="flex flex-wrap -mx-2">
            {#each colleges as college}
                <div class="w-full sm:w-1/2 lg:w-1/4 p-4">
                    <div class="border rounded-2xl p-8 bg-white shadow-xl flex flex-col h-72">
                        <span class="text-start mt-2 text-2xl font-semibold">{college.username}</span>
                        <div class="flex-grow"></div>
                        <button
                            class="text-xl p-3 rounded-lg bg-black text-white font-medium self-end"
                            on:click={() => goto("/collegelist/"+college.user_id)}
                        >
                            Manage
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<!-- Fixed Add Button -->
<button
    class="w-16 h-16 bg-white fixed bottom-8 right-8 text-black text-4xl font-medium rounded-full hover:text-white hover:bg-black duration-700 border shadow-xl"
    on:click={toggleModal}
>
    +
</button>

<!-- Modal -->
{#if isModalVisible}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-lg relative">
            <h1 class="text-center text-2xl py-4 mb-8 font-bold">ADD NEW COLLEGE</h1>

            <form on:submit={createUser}>
                <div class="mb-6">
                    <label class="block text-black text-xl font-semibold mb-2 text-left px-2" for="username">USERNAME</label>
                    <input
                        bind:value={username}
                        id="username"
                        type="text"
                        placeholder="USERNAME"
                        class="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-black text-xl font-semibold mb-2 text-left px-2" for="password">PASSWORD</label>
                    <input 
                        bind:value={password}
                        id="password"
                        type="password"
                        placeholder="PASSWORD"
                        class="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="flex items-center justify-center">
                    <button
                        type="submit"
                        class="bg-black text-white font-bold py-4 px-4 text-xl rounded-lg w-full"
                    >
                        CREATE
                    </button>
                </div>
            </form>
            <button
                class="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-black"
                on:click={toggleModal}
            >
                &times;
            </button>
        </div>
    </div>
{/if}

<!-- Success Message -->
{#if successMessage}
    <div class="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
        {successMessage}
    </div>
{/if}

<style>
    label {
        @apply border-none outline-none;
    }

    /* Spinner styles */
    .spinner {
        border: 8px solid rgba(0, 0, 0, 0.1); /* Light grey background */
        border-top: 8px solid black; /* Black color for the spinner */
        border-radius: 50%;
        width: 64px;
        height: 64px;
        animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
