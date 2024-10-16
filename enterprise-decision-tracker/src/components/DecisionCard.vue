    <template>
        <a href="#" :class="{ 'opacity-80': !props.decision.isActive }" class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <h5 :class="{ 'line-through': !props.decision.isActive }" class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{props.decision.title}}</h5>
            <p class="font-normal text-gray-700 mb-2">{{ props.decision.description }}</p>
            <div @click.stop class="flex">
                <label class="inline-flex items-center w-1/3 cursor-pointer">
                <input type="checkbox" class="sr-only peer" @change="handleToggle" :checked="props.decision.isActive">
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900">{{ currentStatus }}</span>
                </label>
                <div class="flex w-full p-5 justify-end items-center">
                    <button @click="deleteDecision(props.decision.id)"><font-awesome-icon class="text-lg p-2" :icon="['fas', 'trash']" /></button>
                </div>
            </div>
            <div class="flex mb-3" v-show="props.decision.isGoalMet===true">
            <font-awesome-icon class="text-lg text-emerald-500 m-auto" :icon="['fas', 'circle-check']" />
            <p class="w-full pl-2">The goal was met!</p>
            </div>
            <div class="flex mb-3" v-show="props.decision.isGoalMet===false">
            <font-awesome-icon class="text-lg text-red-500 m-auto" :icon="['fas', 'circle-xmark']" />
            <p class="w-full pl-2">The goal was not met!</p>
            </div>
            <p v-show="props.decision.comments" class="text-gray-500"><i>{{ props.decision.comments }}</i></p>
        </a>
    </template>
    <script setup>
    import { computed } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    const props=defineProps({
        decision:Object
    })

    const emit = defineEmits(['update:isActive','delete-decision']);

    const currentStatus = computed(() => props.decision.isActive ? 'In Progress' : 'Completed')

    // Handle the toggle event and emit the new state
    const handleToggle = (event) => {
        emit('update:isActive', event.target.checked); // Emit the new value to the parent
    };

    const deleteDecision = (id) => {
        emit('delete-decision', id)
    }
    </script>   