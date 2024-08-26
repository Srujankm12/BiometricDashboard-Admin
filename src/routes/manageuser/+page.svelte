<script>
    import { onMount } from "svelte";

    let email = '';
    let password ='';
    let selectedCollege = '';
    let jsonResponse;
    let colleges = [
       
        ];
   let users=[
     
   ];
    const mounts= async () => {
        try {
            let response = await fetch("https://go-fingerprint.onrender.com/admin/getusers", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                   
                }),
            });

            if (response.ok) {
                jsonResponse = await response.json();
                
                users = jsonResponse['data']
                console.log(users)
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
    
    const Request = async () => {
        try {
            let response = await fetch("https://go-fingerprint.onrender.com/admin/giveaccess", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                   "email":email,
                   "username": selectedCollege,
                   "password": password,
                }),
            });

            if (response.ok) {
                jsonResponse = await response.json();
                users = jsonResponse['data']
                console.log(users)
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
    onMount(() => {
        mounts();
    });
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-lg h-auto bg-white rounded-3xl p-6 shadow-2xl">
        <h1 class="text-center text-2xl font-bold mb-8">Give Access to User</h1>
        
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
            <label class="block text-black text-xl font-medium mb-2" for="email">Password</label>
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
                on:click={Request}
                class="w-full bg-black text-white font-semibold rounded-lg py-3 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600">
                Access
            </button>
        </div>
    </div>
</div>
