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
        { name: "Alvas - Naturopathy" },
        { name: "Expert" },
        { name: "Yenepoya" },
        { name: "Expert" },
        { name: "Yenepoya" },
    ];
</script>

<div class="p-4 min-h-full h-screen">
    <h2 class="text-xl font-semibold mb-4 text-white">Installed Colleges</h2>
    <div class=" h-screen overflow-auto">
        <div class="flex flex-wrap -mx-2 h-max">
            {#each colleges as college}
                <div class="w-1/4 p-4">
                    <div
                        class="border rounded-2xl p-8 h-72 bg-white shadow-xl flex flex-col"
                    >
                        <span class="text-start mt-2 text-2xl font-semibold"
                            >{college.name}</span
                        >
                        <div class="flex-grow"></div>

                        <button
                            class="text-xl p-3 rounded-lg bg-black text-white self-end font-medium"
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
        >
            +
        </button>
    </div>
</div>
