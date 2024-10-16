<template>
<AlertModal :show-modal="showModal" @close-modal="closeModal">
    <form @submit.prevent="handleEvaluation">
        <div class="mb-5">
            <label for="checkbox" class="block mb-2 text-sm font-medium text-gray-900">Was the goal met?</label>
            <div class="flex mb-5">
                <label class="inline-flex items-center w-1/3 cursor-pointer">
                <input type="checkbox" class="sr-only peer" @change="handleToggle" :checked="!props.decision.isActive">
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900">{{ currentStatus }}</span>
                </label>
            </div>
            <div class="mb-5">
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
import AlertModal from './AlertModal.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  decision: Object,
});

const emit = defineEmits(['close-modal', 'save-form', 'update:isGoalMet']);

const comments = ref('');
const isGoalMet = ref(true);

// Close the modal when clicked outside
const closeModal = () => {
  emit('close-modal');
};

// Handle the toggle event and update isGoalMet
const handleToggle = (event) => {
  isGoalMet.value = event.target.checked;
  emit('update:isGoalMet', isGoalMet.value); // Emit the new value
};

// Save form data and emit to parent
const saveForm = () => {
  const evaluatedDecision = { ...props.decision }; // Create a copy of the decision
  evaluatedDecision.isGoalMet = isGoalMet.value;
  evaluatedDecision.comments = comments.value;
  console.log(evaluatedDecision);
  emit('save-form', evaluatedDecision); // Emit the entire updated decision
};

// Determine the current status for checkbox label
const currentStatus = computed(() => (!props.decision.isActive ? 'Yes' : 'No'));

</script>
