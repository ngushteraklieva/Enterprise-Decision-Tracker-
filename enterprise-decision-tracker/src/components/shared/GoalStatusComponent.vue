<template>
    <div v-if="isMet !== null" class="flex mb-3">
        <font-awesome-icon :class="statusClass" class="text-lg m-auto" :icon="statusIcon" />
        <p class="w-full pl-2">{{ statusMessage }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    isMet: {
        type: Boolean,
        required: true
    },
    measurableGoal: Number
});

const statusClass = computed(() => (props.isMet === true ? 'text-emerald-500' : 'text-red-500'));
const statusIcon = computed(() => (props.isMet === true ? ['fas', 'circle-check'] : ['fas', 'circle-xmark']));
const statusMessage = computed(() => (props.isMet === true ? `The goal was met! The revenue was increased by ${props.measurableGoal}%.` : `The goal of increasing the revenue by ${props.measurableGoal}% was not met.`));
</script>
