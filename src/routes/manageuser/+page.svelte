<script>
    let email = '';
    let selectedCollege = '';

    const colleges = [
        'College A',
        'College B',
        'College C',
        'College D'
    ];
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
            <label class="block text-black text-xl font-medium mb-2" for="college">Select College</label>
            <select 
                bind:value={selectedCollege}
                name="college"
                id="college"
                class="w-full border rounded-lg py-3 px-4 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
                <option value="" disabled>Select a college</option>
                {#each colleges as college}
                    <option value={college}>{college}</option>
                {/each}
            </select>
        </div>
        
        <div>
            <button class="w-full bg-black text-white font-semibold rounded-lg py-3 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600">
                Access
            </button>
        </div>
    </div>
</div>
