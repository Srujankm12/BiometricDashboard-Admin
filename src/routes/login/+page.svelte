<script>
    import { goto } from "$app/navigation";
    let click = () => {
        goto("/collegelist");
    };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-xl h-[36rem] w-full bg-white rounded-3xl p-8 shadow-2xl">
        <h1
            class="text-center text-3xl bg-white rounded-full py-4 mb-8 font-bold"
        >
            LOGIN
        </h1>
        <!-- <form> -->
        <div class="mb-6">
            <label
                class="block text-black text-2xl font-semibold mb-2 p-3"
                for="userid"
            >
                User ID
            </label>
            <input
                name="userid"
                type="text"
                placeholder="USER ID"
                class="shadow appearance-auto border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="mb-6">
            <label
                class="block text-black text-2xl font-semibold mb-2 p-3"
                for="password"
            >
                Password
            </label>
            <input
                name="password"
                type="password"
                placeholder="PASSWORD"
                class="shadow appearance-auto border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="flex items-center justify-center">
            <button
                class="bg-black text-white font-bold py-4 px-4 text-2xl rounded-lg w-full pl-3 pr-3 mt-10"
                on:click={click}
            >
                Login
            </button>
        </div>
        <!-- </form> -->
    </div>
</div>
