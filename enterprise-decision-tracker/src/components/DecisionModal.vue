<template>
  <AlertModal :show-modal="showModal" @close-modal="closeModal">
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
          placeholder="Increase revenue by a given percentage..."
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
  </AlertModal>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps, watch } from 'vue';
import AlertModal from './AlertModal.vue';

// Props to control visibility of the modal and selected decision data
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  selectedDecision: Object
});

const emit = defineEmits(['handle-decision', 'close-modal']);

// Form data
const title = ref('');
const description = ref('');
const measurableGoal = ref(0);
const isActive = ref(true);
const isGoalMet = ref(false);
const comments = ref('');

// Compute button text based on whether it's a new or editing decision
const buttonText = computed(() => props.selectedDecision ? 'Edit Decision' : 'Add Decision');

// Close the modal 
const closeModal = () => {
  emit('close-modal');
};

// Ensure the measurable goal is non-negative
const validateGoal = () => {
  if (measurableGoal.value < 0) {
    measurableGoal.value = 0;
  }
};

// Reset form fields
const resetForm = () => {
  title.value = '';
  description.value = '';
  measurableGoal.value = 0;
  isActive.value = true;
  isGoalMet.value = false;
  comments.value = '';
};

// Populate form fields with the selected decision or reset for new decision
watch(() => props.selectedDecision, (newVal) => {
  if (newVal && Object.keys(newVal).length > 0) {
    title.value = newVal.title || '';
    description.value = newVal.description || '';
    measurableGoal.value = newVal.measurableGoal || 0;
    isActive.value = newVal.isActive || true;
    isGoalMet.value = newVal.isGoalMet || false;
    comments.value = newVal.comments || '';
  } else {
    resetForm();
  }
}, { immediate: true });

// Handle form submission
const handleDecision = () => {
  // Check if this is an edit (if an ID exists) or a new decision
  const id = props.selectedDecision?.id || '';

  // Emit the decision data
  emit('handle-decision', {
    id,
    title: title.value,
    description: description.value,
    measurableGoal: measurableGoal.value,
    isActive: isActive.value,
    isGoalMet: isGoalMet.value,
    comments: comments.value
  });

  // Reset the form after submission
  resetForm();

  // Close the modal
  closeModal();
};
</script>
