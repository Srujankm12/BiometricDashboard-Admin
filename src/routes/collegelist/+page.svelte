<script>
    let colleges = [
        { name: "Alvas - Naturopathy" },
        { name: "Expert" },
        { name: "Yenepoya" },
        { name: "Expert" },
        { name: "Yenepoya" },
        { name: "Alvas - Naturopathy" },
        { name: "Expert" },
        { name: "Yenepoya" },
        { name: "Expert" },
        { name: "Yenepoya" },
        { name: "Alvas - Naturopathy" },
        { name: "Expert" },
        { name: "Yenepoya" },
        { name: "Expert" },
        { name: "Yenepoya" },
    ];

    let showModal = false;
    let drawerOpen = false;

    function toggleModal() {
        showModal = !showModal;
    }

    function toggleDrawer() {
        drawerOpen = !drawerOpen;
    }

    import { goto } from "$app/navigation";

    const navigateToInstallPage = () => goto("/Installedunit");
    const createCollege = () => goto("/new");
</script>

<div class="p-4 min-h-screen h-full">
    <button class="p-1 text-xl bg-black text-white rounded-full" on:click={toggleDrawer}>
        ☰
    </button>

    <!-- Drawer -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40" class:hidden={!drawerOpen} on:click={toggleDrawer}></div>
    <div class="fixed inset-y-0 left-0 bg-white w-64 shadow-xl z-50 transform" class:translate-x-[-100%]={!drawerOpen} transition-transform duration-300 ease-in-out>
        <div class="p-4">
            <h2 class="text-3xl font-semibold mb-4 text-left">Menu</h2>
            <ul>
                <li class="mb-4">
                    <a href="/Homepage" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold">Home</a>
                </li>
                <li class="mb-4">
                    <a href="/manageuser" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold">Manage User</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold">Settings</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold">Logout</a>
                </li>
            </ul>
        </div>
    </div>

    <h2 class="text-3xl font-semibold mb-4 text-black">College List</h2>
    <div class="overflow-auto">
        <div class="flex flex-wrap -mx-2">
            {#each colleges as college}
                <div class="w-full sm:w-1/2 lg:w-1/4 p-4">
                    <div class="border rounded-2xl p-8 bg-white shadow-xl flex flex-col h-72">
                        <span class="text-start mt-2 text-2xl font-semibold">{college.name}</span>
                        <div class="flex-grow"></div>
                        <button
                            class="text-xl p-3 rounded-lg bg-black text-white font-medium self-end"
                            on:click={navigateToInstallPage}
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
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" on:click={toggleModal}>
            <div class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative" on:click|stopPropagation>
                <h1 class="text-center text-2xl py-4 mb-8 font-bold">ADD NEW COLLEGE</h1>
                <div class="mb-6">
                    <label class="block text-black text-xl font-semibold mb-2 p-2">USERNAME</label>
                    <input
                        type="text"
                        placeholder="USERNAME"
                        class="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-black text-xl font-semibold mb-2 p-2">PASSWORD</label>
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        class="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="flex items-center justify-center">
                    <button
                        class="bg-black text-white font-bold py-4 px-4 text-xl rounded-lg w-full"
                        on:click={createCollege}
                    >
                        CREATE
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .hidden {
        display: none;
    }
</style>
