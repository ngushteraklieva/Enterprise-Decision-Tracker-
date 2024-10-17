    <template>
        <a href="#" :class="linkClass">
            <h5 :class="titleClass">{{ props.decision.title }}</h5>
            <p class="font-normal text-gray-700 mb-2">{{ props.decision.description }}</p>
            <toggle-button :checked="isActive" :currentStatus="currentStatus" @update:status="handleToggle">
                <button-component icon="trash" @button-action="deleteDecision(props.decision.id)" />
            </toggle-button>
            <GoalStatus v-show="props.isEvaluationCompleted" :isMet="props.decision.isGoalMet" :measurableGoal="props.measurableGoal"/>
            <p v-if="props.decision.comments" class="text-gray-500"><i>{{ props.decision.comments }}</i></p>
        </a>
    </template>

    <script setup>
    import { computed } from 'vue';
    import ToggleButton from './shared/ToggleButton.vue';
    import ButtonComponent from './shared/ButtonComponent.vue';
    import GoalStatus from './shared/GoalStatusComponent.vue';
    
    const props = defineProps({
        decision: Object,
        isEvaluationCompleted:{
            type: Boolean,
            default: false
        },
        measurableGoal: Number
    });
    
    const emit = defineEmits(['update:isActive', 'delete-decision']);
    
    const isActive = computed(() => props.decision.isActive);
    const currentStatus = computed(() => (isActive.value ? 'In Progress' : 'Completed'));
    
    const linkClass = computed(() => ({
        'opacity-80': !isActive.value,
        'block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100': true,
    }));
    
    const titleClass = computed(() => ({
        'line-through': !isActive.value,
        'mb-2 text-2xl font-bold tracking-tight text-gray-900': true,
    }));
    
    // Handle the toggle event and emit the new state
    const handleToggle = (status) => {
        emit('update:isActive', status);
    };
    
    const deleteDecision = (id) => {
        emit('delete-decision', id);
    };
    </script>
    