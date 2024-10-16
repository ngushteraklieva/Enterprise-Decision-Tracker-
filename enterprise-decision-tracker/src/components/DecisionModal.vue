<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <!-- Modal content -->
      <div class="relative w-full max-w-lg bg-white rounded-lg shadow">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-900">
          &times;
        </button>
        <div class="p-6">
          <form @submit.prevent="handleDecision">
            <div class="mb-5">
              <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title:</label>
              <input 
                v-model="title"
                type="text"
                id="title"
                placeholder="Enter decision title"
                required
                class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-5">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description:</label>
              <textarea 
                v-model="description"
                id="description"
                rows="4"
                placeholder="Enter decision description..."
                required
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div class="mb-5">
              <label for="goal" class="block mb-2 text-sm font-medium text-gray-900">Measurable Goal:</label>
              <input 
                v-model.number="measurableGoal"
                type="number"
                id="goal"
                placeholder="Increase revenue by a given percentage"
                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                @input="validateGoal"
              />
            </div>
            <div class="flex w-full justify-end">
              <button 
                type="submit" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                {{ buttonText }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps, watch } from 'vue';
  
  // Props to control visibility of the modal
  const props = defineProps({
    showModal: {
      type: Boolean,
      default: false,
    },
    selectedDecision: Object
  });
  
  const emit = defineEmits(['handle-decision', 'close-modal']);
  
  const title = ref('');
  const description = ref('');
  const measurableGoal = ref(0); // Start with a default non-negative value
  const buttonText = ref('Add Decision')
  
  // Close the modal when clicked outside
  const closeModal = () => {
    emit('close-modal');
  };
  
  // Ensure the measurable goal is non-negative
  const validateGoal = () => {
    if (measurableGoal.value < 0) {
      measurableGoal.value = 0;
    }
  };
  
  const handleDecision = () => {
  // Check if this is an edit (if an ID exists) or a new decision (no ID)
  const id = props.selectedDecision?.id || ''; // If it's an edit, keep the ID; otherwise, leave it empty for new decision
  
  // Emit the decision data with the correct ID
  emit('handle-decision', {
    id, // Either existing ID for edit or empty for a new one
    title: title.value,
    description: description.value,
    measurableGoal: measurableGoal.value,
    isActive: true,
  });

  // Reset the fields after handling the decision
  title.value = '';
  description.value = '';
  measurableGoal.value = 0;

  // Close the modal after submission
  closeModal();
};


  // Watch the selectedDecision prop and pre-fill the fields if it's passed
    watch(() => props.selectedDecision, (newVal) => {
        console.log(newVal)
    if (newVal && Object.keys(newVal).length > 0) {
        title.value = newVal.title || '';
        description.value = newVal.description || '';
        measurableGoal.value = newVal.measurableGoal || 0;
        buttonText.value = 'Edit Decision'
    } else {
        // Reset form if no selected decision (new decision mode)
        title.value = '';
        description.value = '';
        measurableGoal.value = 0;
        buttonText.value = 'Add Decision'
    }
    }, { immediate: true });
  </script>
  
  