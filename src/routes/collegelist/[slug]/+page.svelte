<script>
  import { onMount } from "svelte";

  let unitId = ''; // Variable for user input in delete modal
  let createUnitId = ''; // Variable for creating a new unit ID
  let tableData = [];
  let isLoading = true;
  let showDeleteModal = false;
  let showCreateModal = false;
  let responseMessage = '';
  let isCreating = false; // Track loading state for the "Add Unit" button
  let unitIdToDelete = ''; // Track unit ID for deletion
  let deleteErrorMessage = ''; // Error message for invalid delete input

  export let data;

  const fetchTableData = async () => {
    try {
      const response = await fetch("https://go-fingerprint.onrender.com/admin/getmachines", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ "user_id": data.slug }),
      });
      const result = await response.json();
      if (response.ok && Array.isArray(result.data)) {
        tableData = result.data;
      } else {
        responseMessage = result.message || 'Unexpected error';
      }
    } catch (error) {
      responseMessage = 'Fetch error: ' + error.message;
    } finally {
      isLoading = false; // Hide loading indicator
    }
  };

  const addMachine = async () => {
    isCreating = true; // Show loading spinner on "Add Unit" button

    try {
      const response = await fetch("https://go-fingerprint.onrender.com/admin/addmachine", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ "unit_id": createUnitId, "user_id": data.slug }),
      });
      const result = await response.json();
      if (response.ok) {
        showCreateModal = false;
        createUnitId = ''; // Clear input after creation
        await fetchTableData();
      } else {
        responseMessage = result.message || 'Unexpected error';
      }
    } catch (error) {
      responseMessage = 'Fetch error: ' + error.message;
    } finally {
      isCreating = false; // Hide loading spinner on "Add Unit" button
    }
  };

  const deleteMachine = async () => {
    if (unitId !== unitIdToDelete) {
      deleteErrorMessage = 'Unit ID does not match. Please enter the correct ID.';
      return; // Do not proceed with deletion
    }

    isLoading = true; // Show loading spinner during deletion

    try {
      const response = await fetch("https://go-fingerprint.onrender.com/admin/deletemachine", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ "unit_id": unitIdToDelete, "online": false }),
      });
      const result = await response.json();
      if (response.ok) {
        showDeleteModal = false;
        unitIdToDelete = ''; // Clear unit ID after deletion
        unitId = ''; // Clear input field
        deleteErrorMessage = ''; // Clear error message
        await fetchTableData();
      } else {
        responseMessage = result.message || 'Unexpected error';
      }
    } catch (error) {
      responseMessage = 'Fetch error: ' + error.message;
    } finally {
      isLoading = false; // Hide loading spinner after deletion
    }
  };

  onMount(() => {
    fetchTableData();
  });

  const toggleModal = (modalType) => {
    if (modalType === 'delete') {
      showDeleteModal = !showDeleteModal;
    } else if (modalType === 'create') {
      showCreateModal = !showCreateModal;
    }
  };

  const confirmDeletion = (unitId) => {
    unitIdToDelete = unitId; // Set the unit ID for deletion
    toggleModal('delete');
  };
</script>

<div class="overflow-x-auto p-4">
  <div class="max-h-screen overflow-y-auto">
    {#if isLoading}
      <div class="flex items-center justify-center py-8">
        <div class="spinner"></div>
      </div>
    {:else}
      <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-black text-white sticky top-0">
          <tr>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Unit ID</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          {#each tableData as row}
            <tr class="border-b border-gray-200">
              <td class="py-3 px-4 text-center border-r">{row.unit_id}</td>
              <td class="py-3 px-4 text-center border-r">{data.slug}</td>
              <td class="py-3 px-4 text-center border-r">
                <span class={`py-1 px-3 rounded-full text-xs font-semibold ${row.online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {#if row.online} online {:else} offline {/if}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <button on:click={() => confirmDeletion(row.unit_id)} class="text-red-500 hover:text-red-700">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>

  <button
    class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 fixed bottom-4 right-4 text-white text-center text-3xl font-medium rounded-full hover:opacity-80 duration-300 border shadow-xl"
    on:click={() => toggleModal('create')}
  >
    <i class="fas fa-plus"></i>
  </button>

  {#if showDeleteModal}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-6">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-xl font-bold mb-4">Confirm Deletion</h1>
        <p class="text-gray-700 mb-4">Are you sure you want to delete unit ID: <strong>{unitIdToDelete}</strong>?</p>
        <p class="text-gray-600 mb-4">Type the unit ID below to confirm:</p>
        <input
          bind:value={unitId} 
          name="unitIdInput"
          type="text"
          placeholder="Enter Unit ID"
          class="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4"
        />
        {#if deleteErrorMessage}
          <p class="text-red-500 mb-4">{deleteErrorMessage}</p>
        {/if}
        <div class="flex justify-between">
          <button
            class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"
            on:click={deleteMachine}
            disabled={isLoading}
          >
            {#if isLoading}
              <div class="spinner inline-block mr-2"></div>
              Deleting...
            {:else}
              <i class="fas fa-trash-alt mr-2"></i> Delete
            {/if}
          </button>
          <button
            class="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
            on:click={() => showDeleteModal = false}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showCreateModal}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-6">
      <div class="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg space-y-6">
        <h1 class="text-2xl font-bold text-center text-gray-800">Create a New Unit ID</h1>
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="unitId">Unit ID</label>
          <input
            bind:value={createUnitId} 
            name="unitId"
            type="text"
            placeholder="Enter Unit ID"
            class="w-full p-4 border border-gray-300 rounded-lg text-lg"
          />
        </div>
        <div class="flex justify-between">
          <button
            on:click={addMachine}
            class="relative w-full bg-black text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
            disabled={isCreating}
          >
            {#if isCreating}
              <div class="spinner absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            {:else}
              <i class="fas fa-plus mr-2"></i> Add Unit
            {/if}
          </button>
        </div>
        <button
          class="w-full bg-gwhite text-black shadow-lg font-bold py-3 px-6 rounded-lg mt-4"
          on:click={() => showCreateModal = false}
        >
          Cancel
        </button>
      </div>
    </div>
  {/if}

  {#if responseMessage}
    <div class="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-md z-50">
      {responseMessage}
    </div>
  {/if}
</div>

<style>
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid white;
    width: 24px;
    height: 24px;
    -webkit-animation: spin 0.8s linear infinite;
    animation: spin 0.8s linear infinite;
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
