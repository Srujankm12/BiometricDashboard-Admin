<script>
  let tableData = [
    { id: 1, collegeId: 'oihioioxiohd', status: 'Active' },
    { id: 2, collegeId: 'djoihwqdoiooix', status: 'Active' },
    { id: 3, collegeId: 'flknnhofi', status: 'InActive' },
  ];

  let showModal1 = false;
  let showModal2 = false;

  function toggleModal(modalNumber) {
    if (modalNumber === 1) {
      showModal1 = !showModal1;
    } else if (modalNumber === 2) {
      showModal2 = !showModal2;
    }
  }

  function deletePage() {
    // Add your delete logic here
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
            <td class="py-3 px-4">{row.id}</td>
            <td class="py-3 px-4">{row.collegeId}</td>
            <td class="py-3 px-4">
              <span class={`py-1 px-3 rounded-full text-xs font-semibold ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {row.status}
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
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      on:click={() => toggleModal(1)}
    >
      <div
        class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative"
        on:click|stopPropagation
      >
        <h1 class="text-center text-2xl font-bold mb-8">Are you sure?</h1>
        <div class="mb-6">
          <label class="block text-black text-xl font-semibold mb-2" for="unitId">Delete</label>
          <input
            name="unitId"
            type="text"
            placeholder="Unit ID"
            class="shadow appearance-auto border rounded-lg w-full text-sm py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-black text-white font-bold py-4 px-4 text-xl rounded-lg w-full mt-10"
            on:click={deletePage}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showModal2}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      on:click={() => toggleModal(2)}
    >
      <div
        class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-3xl relative"
        on:click|stopPropagation
      >
        <h1 class="text-center text-2xl font-bold mb-8">Create a new Unit ID</h1>
        <div class="mb-6">
          <label class="block text-black text-xl font-semibold mb-2" for="unitId">Unit ID</label>
          <input
            name="unitId"
            type="text"
            placeholder="Unit ID"
            class="shadow appearance-auto border rounded-lg w-full text-sm py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-black text-white font-bold py-4 px-4 text-xl rounded-lg w-full mt-10"
          >
            Create
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
