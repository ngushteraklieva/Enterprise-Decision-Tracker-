// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrash, faEdit, faCircle, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add icons to the library
library.add(faCheck, faTrash, faEdit, faCircleCheck, faCircleXmark);

export default FontAwesomeIcon;
