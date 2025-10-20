import type { Vector3, OriginPoint } from '$lib/components/primitives/Types';
import Cabinet from '$lib/components/primitives/Cabinet.svelte.ts';

/**
 * A room with configurable dimensions that contains cabinets.
 */
export default class Room {
	/** Dimensions */
	width = $state<number>(10);
	height = $state<number>(3);
	depth = $state<number>(10);
	/** Wall thickness */
	wallThickness = $state<number>(0.1);

	/** Origin point and offset */
	origin = $state<OriginPoint>('center');
	originOffset = $derived<Vector3>(
		this.origin ? { x: 0, y: this.height / 2, z: this.depth / 2 } : { x: 0, y: 0, z: 0 }
	);

	/** Array of cabinets in the room */
	cabinets = $state<Cabinet[]>([]);

	/**
	 * Creates a new Room with optional initial properties.
	 * @param init - Partial Room properties to initialize
	 */
	constructor(init?: Partial<Room>) {
		if (init) Object.assign(this, init);
		console.log('Room created', this);
		// $inspect(this.cabinets, 'Room Cabinets');
	}

	/** Add a cabinet to the room */
	addCabinet(cabinetConfig: Partial<Cabinet> = {}) {
		const cabinet = new Cabinet(cabinetConfig);
		this.cabinets.push(cabinet);
		return cabinet;
	}

	/** Remove a cabinet from the room */
	removeCabinet(cabinet: Cabinet) {
		const index = this.cabinets.indexOf(cabinet);
		if (index > -1) {
			this.cabinets.splice(index, 1);
		}
	}

	/** Clear all cabinets */
	clearCabinets() {
		this.cabinets = [];
	}
}
