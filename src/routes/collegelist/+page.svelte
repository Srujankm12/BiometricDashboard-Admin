<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let colleges = [];
    let username = '';
    let password = '';
    let jsonResponse;
    let message;
    let showModal = false;
    let drawerOpen = false;

    // Function to fetch users and populate the colleges list
    let mounts = async () => {
        try {
            let response = await fetch("https://go-fingerprint.onrender.com/admin/getusers", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({}),
            });

            if (response.ok) {
                jsonResponse = await response.json();
                colleges = jsonResponse['data'];
                showModal = false;
            } else {
                jsonResponse = await response.json();
                message = jsonResponse['message'];
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Function to handle the creation of a new user
    const Request = async () => {
        try {
            let response = await fetch("https://go-fingerprint.onrender.com/users/register", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
            });

            if (response.ok) {
                jsonResponse = await response.json();
                showModal = false;
                await mounts();
            } else {
                jsonResponse = await response.json();
                message = jsonResponse["message"];
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // Call the mounts function when the component is mounted
    onMount(() => {
        mounts();
    });

    // Toggle the modal visibility
    function toggleModal() {
        showModal = !showModal;
    }

    // Toggle the drawer visibility
    function toggleDrawer() {
        drawerOpen = !drawerOpen;
    }

    // Navigate to the create college page
    const createCollege = () => goto("/new");
</script>

<div class="p-4 min-h-screen h-full">
    <button class="p-1 text-xl bg-black text-white rounded-full" on:click={toggleDrawer}>
        ☰
    </button>

    <!-- Drawer -->
    {#if drawerOpen}
        <button class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={toggleDrawer}></button>
        <div class="fixed inset-y-0 left-0 bg-white w-64 shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            <div class="p-4">
                <h2 class="text-3xl font-semibold mb-4 text-left">Menu</h2>
                <ul>
                    <li class="mb-4">
                        <button class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold " on:click={()=>{
                          goto('/collegelist')
                        }}>
                            Home </button>
                    </li>
                    <li class="mb-4">
                      <button class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold" on:click={()=>{
                        goto('/manageuser')
                      }}> Manage User</button>
                    </li>
                    <li class="mb-4">
                        <button class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold " on:click={()=>{
                          goto('/new')
                        }}>Settings</button>
                    </li>
                    <li class="mb-4">
                      <button class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold" on:click={()=>{
                        goto('/logout')
                      }}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    {/if}

    <h2 class="text-3xl font-semibold mb-4 text-black">College List</h2>
    <div class="overflow-auto">
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
    </div>

    <!-- Fixed Add Button -->
    <button
        class="w-20 h-20 bg-white fixed bottom-8 right-8 text-black text-4xl font-medium rounded-full hover:text-white hover:bg-black duration-700 border shadow-xl"
        on:click={toggleModal}
    >
        +
    </button>

    <!-- Modal -->
    {#if showModal}
        <button class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" on:click={toggleModal}>
            <button class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative" on:click|stopPropagation>
                <h1 class="text-center text-2xl py-4 mb-8 font-bold">ADD NEW COLLEGE</h1>

                <form>
                    <div class="mb-6">
                        <label class="block text-black text-xl font-semibold mb-2 text-left px-2" for="username">USERNAME</label>
                        <input
                            bind:value={username}
                            name="username"
                            type="text"
                            placeholder="USERNAME"
                            class="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div class="mb-6">
                        <label class="block text-black text-xl font-semibold mb-2 text-left px-2" for="password">PASSWORD</label>
                        <input 
                            bind:value={password}
                            name="password"
                            type="password"
                            placeholder="PASSWORD"
                            class="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>

                <div class="flex items-center justify-center">
                    <button
                        type="submit"
                        class="bg-black text-white font-bold py-4 px-4 text-xl rounded-lg w-full"
                        on:click={Request}
                    >
                        CREATE
                    </button>
                </div>
        </button>
        </button>
    {/if}
</div>

<style>
    /* Apply Tailwind's reset classes to the label to avoid any unwanted styles */
    label {
        @apply border-none outline-none;
    }
</style>
