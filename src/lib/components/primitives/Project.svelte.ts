/* 
    PROJECT: A class that represents the full structure of a cabinet system.
    This can contain any number of elements, whether cabinets, modules, panels, or other components.
*/

import Module from '$lib/components/primitives/Module.svelte.ts';

type Component = Module;

export default class Project {
	components: Component[] = $state([]); // Array to hold various components of the project

	constructor() {
		// Initialize project properties here
		console.log(this);

		this.components.push(new Module({ type: 'open', height: 0.3 }));

	}

	/* 
        ----- METHODS -----
    */

	add(component: any) {
		this.components.push(component);
	}

	remove(component: any) {
		const index = this.components.indexOf(component);
		if (index > -1) {
			this.components.splice(index, 1);
		}
	}
}
