<template>
<AlertModal :show-modal="showModal" @close-modal="closeModal">
    <form @submit.prevent="handleEvaluation">
        <div class="mb-5">
            <label for="checkbox" class="block mb-2 text-sm font-medium text-gray-900">Was the goal met?</label>
            <toggle-button :checked="isGoalMet" :currentStatus="currentStatus" @update:status="handleToggle"/>
            <div class="my-5">
              <label for="comments" class="block mb-2 text-sm font-medium text-gray-900">Comments:</label>
              <textarea 
                v-model="comments"
                id="comments"
                rows="4"
                placeholder="Write a comment here..."
                required
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div class="flex w-full justify-end">
              <button 
                @click="saveForm(props.decision)"
                type="submit" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Save
              </button>
            </div>
        </div>
    </form>
</AlertModal>
</template>

<script setup>
import AlertModal from './shared/AlertModal.vue';
import { computed, ref } from 'vue';
import ToggleButton from './shared/ToggleButton.vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  decision: Object,
});

const emit = defineEmits(['close-modal', 'save-form']);

// Make isGoalMet and isActive reactive
const isGoalMet = ref(props.decision.isGoalMet);
const comments = ref(props.decision.comments);


// Determine the current status for checkbox label
const currentStatus = computed(() => (isGoalMet.value ? 'Yes' : 'No'));


// Close the modal when clicked outside
const closeModal = () => {
  emit('close-modal');
};

// Handle the toggle event and update isGoalMet
const handleToggle = (status) => {
  isGoalMet.value = status;
};

// Save form data and emit to parent
const saveForm = () => {
  const evaluatedDecision = { ...props.decision }; // Create a copy of the decision
  evaluatedDecision.isGoalMet = isGoalMet.value;
  evaluatedDecision.comments = comments.value;
  emit('save-form', evaluatedDecision); // Emit the entire updated decision
};
</script>
