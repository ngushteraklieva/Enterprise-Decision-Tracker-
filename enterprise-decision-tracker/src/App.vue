<template>
  <div class="my-10 w-3/4 mx-auto">
    <div>
      <button 
        @click="openModal"
        type="button" 
        class="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Add New Decision
      </button>
    </div>
    
    <!-- Decision Modal for adding/editing -->
    <DecisionModal
      :showModal="showModal"
      :selectedDecision="selectedDecision"
      @handle-decision="handleDecision"
      @close-modal="closeModal"
    />

    <!-- Evaluation Form for selected decision -->
    <EvaluationForm 
      :showModal="showEvaluationForm"
      :decision="selectedDecision" 
      @save-form="handleDecision"
      @close-modal="closeEvaluationForm" 
    />

    <!-- Decision Cards List -->
    <div class="flex-col" v-for="decision in decisionList" :key="decision.id">
      <ul @click="openModal(decision.id)" class="mb-5">
        <DecisionCard 
          :decision="decision"
          :isEvaluationCompleted="isEvaluationCompleted(decision.id)"
          :measurableGoal="measurableGoal" 
          @update:isActive="updateIsActive(decision, $event)" 
          @delete-decision="deleteDecision"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DecisionModal from './components/DecisionModal.vue';
import DecisionCard from './components/DecisionCard.vue';
import EvaluationForm from './components/EvaluationForm.vue';
import initialDecisionList from './data/decisions.json';

// Reactive variables
const decisionList = ref(initialDecisionList);
const showModal = ref(false);
const selectedDecision = ref({});
const showEvaluationForm = ref(false);
const evaluatedDecisionId = ref(null);
const measurableGoal = ref(0)

// Open modal for adding/editing a decision
const openModal = (id = null) => {
  showModal.value = true;
  selectedDecision.value = id ? decisionList.value.find(decision => decision.id === id) : {};
};

// Close the decision modal
const closeModal = () => {
  selectedDecision.value = {};
  showModal.value = false;
};

// Open the evaluation form for a specific decision
const openEvaluationForm = (decisionId) => {
  showEvaluationForm.value = true;
  selectedDecision.value = decisionList.value.find(d => d.id === decisionId);
  evaluatedDecisionId.value = decisionId;
};

// Close the evaluation form
const closeEvaluationForm = () => {
  selectedDecision.value = {};
  showEvaluationForm.value = false;
};

// Handle add/edit decision
const handleDecision = (updatedDecision) => {
  measurableGoal.value = updatedDecision.measurableGoal
  if (updatedDecision.id) {
    // Update existing decision
    const index = decisionList.value.findIndex((d) => d.id === updatedDecision.id);
    if (index !== -1) {
      decisionList.value[index] = updatedDecision;
    }
  } else {
    // Add a new decision
    updatedDecision.id = generateUniqueId();
    decisionList.value.push(updatedDecision);
  }
  closeModal();
  closeEvaluationForm();
};

// Generate a unique ID for new decisions
const generateUniqueId = () => {
  return decisionList.value.length > 0
    ? Math.max(...decisionList.value.map(d => d.id)) + 1
    : 1;
};

// Update isActive status and handle evaluation
const updateIsActive = (decision, isActive) => {
  decision.isActive = isActive;
  if (!isActive) return openEvaluationForm(decision.id);
};

// Check if evaluation is completed for a decision
const isEvaluationCompleted = (decisionId) => {
  return evaluatedDecisionId.value == decisionId && !showEvaluationForm.value;
};

// Delete a decision
const deleteDecision = (id) => {
  const index = decisionList.value.findIndex((d) => d.id === id);
  if (index !== -1) {
    decisionList.value.splice(index, 1);
  }
};
</script>
