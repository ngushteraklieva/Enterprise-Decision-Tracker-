<template>
    <div class="flex w-full p-5 justify-end items-center">
        <button @click="handleButtonAction"><font-awesome-icon class="text-lg p-2" :icon="['fas', icon]" /></button>
    </div>
</template>
<script setup>
const props = defineProps({
    icon: String
})

const emit = defineEmits(['button-action'])

const handleButtonAction = () => {
    emit('button-action')
}
</script>