<script>
    let colleges = [
        { name: "Alvas - Naturopathy" },
        { name: "Expert" },
        { name: "Yenepoya" },
        { name: "Expert" },
        { name: "Yenepoya" },
        
    ];

    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }

    function navigateTonew() {
      console.log("gowtham is kakra")
      
      
    }
  
        import { goto } from "$app/navigation";
        let nextpage = () => {
            goto("/new");
           
        };
        let installpage =() =>{
          goto("/Installedunit")
        }
        
   
</script>

<div class="p-4 min-h-full h-screen">
    <h2 class="text-3xl font-semibold mb-4 text-black">College List</h2>
    <div class="h-screen overflow-auto">
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
            class="w-20 h-20 bg-white absolute bottom-0 right-0 text-black text-center text-4xl font-medium rounded-full hover:text-white hover:bg-black duration-700 border border-inherit shadow-xl "
            on:click={toggleModal}
        >
            +
        </button>
    </div>

    {#if showModal}
        <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
            on:click={toggleModal}
        >
            <div
                class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative "
                on:click|stopPropagation
            >
                <h1
                    class="text-center text-2xl bg-whiterounded-full py-4 mb-8 font-bold"
                >
                    ADD NEW COLLEGE
                </h1>
                <div class="mb-6">
                    <label
                        class="block text-black text-1xl font-semibold mb-2 p-2"
                        for="username"
                    >
                       USERNAME
                    </label>
                    <input
                        name="username"
                        type="text"
                        placeholder="USERNAME"
                        class="shadow appearance-auto border rounded-lg w-full py-3 px-4 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="mb-6">
                    <label
                        class="block text-black text-1xl font-semibold mb-2 p-3"
                        for="password"
                    >
                        PASSWORD
                    </label>
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


