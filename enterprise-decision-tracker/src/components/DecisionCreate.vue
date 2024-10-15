<template>
    <div class="flex w-full h-screen justify-center items-center bg-zinc-100">
  <form class="w-4/12" @submit.prevent="addDecision">
    <div class="mb-5">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title:</label>
        <input 
         type="text" id="title" placeholder="Enter decision title" required
         class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div class="mb-5">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 ">Description:</label>
    <textarea 
    id="description" rows="4" 
    placeholder="Enter decision description..." required
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
  </div>
    <div class="mb-5">
        <label for="goal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Measurable Goal:</label>
        <input type="number" id="goal" placeholder="Increase revenue by 10%" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div><button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add Decision</button>
    </div>
  </form>
  </div>
  </template>
  <script setup></script>