<script>
    let colleges = [
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

    function navigateTonew() {
        console.log("gowtham is kakra");
    }

    import { goto } from "$app/navigation";
    let nextpage = () => {
        goto("/new");
    };
    let installpage = () => {
        goto("/Installedunit");
    };
</script>

<div class="p-4 min-h-full h-screen">
    <button class="p-1 text-xl bg-black text-white rounded-full" on:click={toggleDrawer}>
        ☰
    </button>

   
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 " class:hidden={!drawerOpen} on:click={toggleDrawer}></div>
    <div class="fixed inset-y-0 left-0 rounded-2xl bg-white w-64 shadow-xl z-50 transform" class:translate-x-[-100%]={!drawerOpen} transition-transform duration-300 ease-in-out >
        <div class="p-4">
            <h2 class="text-3xl font-semibold mb-4 text-left">Menu</h2>
            <ul>
                <li class="mb-4">
                    <a href="/Homepage" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold w-full">Home</a>
                </li>
                <li class="mb-4">
                    <a href="/manageuser" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold w-full">Manage User</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold w-full">Settings</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="block text-lg text-black text-center rounded-lg hover:text-white hover:bg-black duration-500 py-2 px-4 font-semibold w-full">Logout</a>
                </li>
            </ul>
        </div>
    </div>
 

    <h2 class="text-3xl font-semibold mb-4 text-black">College List</h2>
    <div class="h-screen overflow-auto">
        <div class="flex flex-wrap -mx-2 h-max">
            {#each colleges as college}
                <div class="w-1/4 p-4">
                    <div class="border rounded-2xl p-8 h-72 bg-white shadow-xl flex flex-col">
                        <span class="text-start mt-2 text-2xl font-semibold">{college.name}</span>
                        <div class="flex-grow"></div>
                        <button
                            class="text-xl p-3 rounded-lg bg-black text-white self-end font-medium"
                            on:click={installpage}
                        >
                            Manage
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="mt-auto text-center rounded-lg float-right p-8">
        <button
            class="w-20 h-20 bg-white absolute bottom-0 right-0 text-black text-center text-4xl font-medium rounded-full hover:text-white hover:bg-black duration-700 border border-inherit shadow-xl"
            on:click={toggleModal}
        >
            +
        </button>
    </div>

    {#if showModal}
        <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            on:click={toggleModal}
        >
            <div
                class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative"
                on:click|stopPropagation
            >
                <h1 class="text-center text-2xl bg-whiterounded-full py-4 mb-8 font-bold">ADD NEW COLLEGE</h1>
                <div class="mb-6">
                    <label class="block text-black text-1xl font-semibold mb-2 p-2" for="username">USERNAME</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="USERNAME"
                        class="shadow appearance-auto border rounded-lg w-full py-3 px-4 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-black text-1xl font-semibold mb-2 p-3" for="password">PASSWORD</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="PASSWORD"
                        class="shadow appearance-auto border rounded-lg w-full text-sm py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="flex items-center justify-center">
                    <button
                        class="bg-black text-white font-bold py-4 px-4 text-1xl rounded-lg w-full pl-3 pr-3 mt-10"
                        on:click={nextpage}
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
