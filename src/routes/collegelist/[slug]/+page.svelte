<script>
  import { onMount } from "svelte";

  let tableData = [];
  export let data;

  let units;
  let showModal1 = false;
  let showModal2 = false;
  let jsonResponse;
  let message;

  function toggleModal(modalNumber) {
    if (modalNumber === 1) {
      showModal1 = !showModal1;
    } else if (modalNumber === 2) {
      showModal2 = !showModal2;
    }
  }

  let mounts = async () => {
    try {
      let response = await fetch("https://go-fingerprint.onrender.com/admin/getmachines", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          "user_id": data.slug,
        }),
      });

      jsonResponse = await response.json();

      if (response.status === 200 && Array.isArray(jsonResponse['data'])) {
        tableData = jsonResponse['data'];
        console.log(tableData);
      } else {
        message = jsonResponse['message'] || 'Unexpected error';
        console.error('Error:', message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  let Request = async () => {
    try {
      let response = await fetch("https://go-fingerprint.onrender.com/admin/addmachine", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          "unit_id": units,
          "user_id": data.slug,
        }),
      });

      jsonResponse = await response.json();

      if (response.status === 200) {
        showModal2 = false;
        await mounts();  // Refresh the table data after adding a new unit
      } else {
        message = jsonResponse['message'] || 'Unexpected error';
        console.error('Error:', message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  
  let DeleteMachine = async () => {
    try {
      let response = await fetch("https://go-fingerprint.onrender.com/admin/deletemachine", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          "unit_id": units,
          "online": false,
        }),
      });

      jsonResponse = await response.json();

      if (response.status === 200) {
        showModal1 = false;
      
        await mounts();  // Refresh the table data after adding a new unit
      } else {
        message = jsonResponse['message'] || 'Unexpected error';
        console.error('Error:', message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  onMount(() => {
    mounts();
  });

let del = () => {
  console.log(units)
  console.log(false)
}
</script>

<div class="overflow-x-auto p-4">
  <div class="max-h-screen overflow-y-auto">
    <table class="min-w-full bg-white shadow-md rounded-lg">
      <thead class="bg-black text-white sticky top-0">
        <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Unit ID</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Delete</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        {#each tableData as row}
          <tr class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-4">{row.unit_id}</td>
            <td class="py-3 px-4">{data.slug}</td>
            <td class="py-3 px-4">
              <span class={`py-1 px-3 rounded-full text-xs font-semibold ${row.online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {#if row.online}
                  online
                {:else}
                  offline
                {/if}
              </span>
            </td>
            <td class="py-3 px-4">
              <button on:click={() => toggleModal(1)} class="text-red-500 hover:text-red-700">
                Delete
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <button
    class="w-16 h-16 bg-white fixed bottom-4 right-4 text-black text-center text-3xl font-medium rounded-full hover:text-white hover:bg-black duration-700 border shadow-xl"
    on:click={() => toggleModal(2)}
  >
    +
  </button>

  {#if showModal1}
    <button
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      on:click={() => toggleModal(1)}
    >
      <button
        class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative"
        on:click|stopPropagation
      >
        <h1 class="text-center text-2xl font-bold mb-8">Are you sure?</h1>
          <div class="mb-6">
            <label class="block text-black text-xl font-semibold mb-2" for="unitId">Delete</label>
            <input
                bind:value={units}
              name="unitId"
              type="text"
              placeholder="Unit ID"
              class="shadow appearance-auto border rounded-lg w-full text-sm py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-black text-white font-bold py-4 px-4 text-xl rounded-lg w-full mt-10"
              on:click={DeleteMachine}
            >
              Delete
            </button>
          </div>
      </button>
    </button>
  {/if}

  {#if showModal2}
    <button
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      on:click={() => toggleModal(2)}
    >
      <button
        class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative"
        on:click|stopPropagation
      >
        <h1 class="text-center text-2xl font-bold mb-8">Create a new Unit ID</h1>
        <div class="mb-6">
          <label class="block text-black text-xl font-semibold mb-2" for="unitId">Unit ID</label>
          <input
            bind:value={units}
            name="unitId"
            type="text"
            placeholder="Unit ID"
            class="shadow appearance-auto border rounded-lg w-full text-sm py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-center">
          <button on:click={Request}
            type="submit"
            class="bg-black text-white font-bold py-4 px-4 text-xl rounded-lg w-full mt-10"
          >
            Create
          </button>
        </div>
      </button>
    </button>
  {/if}
</div>

<style>
  .hidden {
    display: none;
  }
</style>
