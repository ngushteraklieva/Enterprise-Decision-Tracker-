<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <!-- Modal content -->
      <div class="relative w-full max-w-lg bg-white rounded-lg shadow">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-900">
          &times;
        </button>
        <div class="p-6">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
    showModal:{
        type: Boolean,
        default:false
    }
})
const emit = defineEmits(['close-modal']);
 
// Close the modal when clicked outside
const closeModal = () => {
   emit('close-modal');
};
</script>
  