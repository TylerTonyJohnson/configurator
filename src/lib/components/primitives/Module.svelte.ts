import type { Vector3 } from './Types';

export type ModuleType = 'door' | 'drawer' | 'open';
export type ModuleAccess = 'front' | 'left' | 'right';
export type PanelLocation = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
export type PlaningType = 'siding' | 'spanning' | 'facing';
export type Planing = [PlaningType, PlaningType, PlaningType];

// Do I even need anchors?
export type Anchor = {
	position: Vector3;
	rotation: Vector3;
};
export type Panel = {
	position: Vector3;
	rotation: Vector3;
	width: number;
	height: number;
	depth?: number;
};

const panelThickness = 0.02;

// An anchor is a location and a normal vector, so two vectors.

export default class Module {
	type: ModuleType = 'open';
	access: ModuleAccess = 'front';
	#width = $state<number>(0.6);
	#height = $state<number>(0.8);
	#depth = $state<number>(0.3);

	// Location of panels, can change per module
	composition: PanelLocation[] = ['back', 'left', 'right', 'top', 'bottom'];
	// planing: Planing = ['facing', 'siding', 'spanning'];

	anchors = $derived<Anchor[]>(this.getAnchors());
	panels = $derived<Panel[]>(this.getPanels());

	/* 
        ----- CONSTRUCTOR -----
    */

	constructor(init?: Partial<Module>) {
		if (init) Object.assign(this, init);

		console.log(this);
	}

	/* 
        ----- METHODS -----
    */

	get width(): number {
		return this.#width;
	}

	set width(value: number) {
		this.#width = Math.max(value, 0.1);
	}

	get height(): number {
		return this.#height;
	}

	set height(value: number) {
		this.#height = Math.max(value, 0.1);
	}

	get depth(): number {
		return this.#depth;
	}

	set depth(value: number) {
		this.#depth = Math.max(value, 0.1);
	}

	private getAnchors(): Anchor[] {
		const anchors: Anchor[] = [];

		this.composition.forEach((location) => {
			switch (location) {
				case 'front':
					anchors.push({
						position: { x: 0, y: this.height / 2, z: this.depth },
						rotation: { x: Math.PI / 2, y: 0, z: 0 } // 90° around X-axis
					});
					break;
				case 'back':
					anchors.push({
						position: { x: 0, y: this.height / 2, z: 0 },
						rotation: { x: -Math.PI / 2, y: 0, z: 0 } // -90° around X-axis
					});
					break;
				case 'left':
					anchors.push({
						position: { x: -this.width / 2, y: this.height / 2, z: this.depth / 2 },
						rotation: { x: Math.PI / 2, y: 0, z: Math.PI / 2 } // 90° around Z-axis
					});
					break;
				case 'right':
					anchors.push({
						position: { x: this.width / 2, y: this.height / 2, z: this.depth / 2 },
						rotation: { x: Math.PI / 2, y: 0, z: -Math.PI / 2 } // -90° around Z-axis
					});
					break;
				case 'top':
					anchors.push({
						position: { x: 0, y: this.height, z: this.depth / 2 },
						rotation: { x: 0, y: 0, z: 0 } // No rotation (facing up)
					});
					break;
				case 'bottom':
					anchors.push({
						position: { x: 0, y: 0, z: this.depth / 2 },
						rotation: { x: Math.PI, y: 0, z: 0 } // 180° around X-axis
					});
					break;
			}
		});

		return anchors;
	}

	private getPanels(): Panel[] {
		const panels: Panel[] = [];

		this.composition.forEach((location) => {
			switch (location) {
				case 'front':
					panels.push({
						width: this.width,
						height: this.height,
						depth: panelThickness,
						position: { x: 0, y: this.height / 2, z: this.depth - panelThickness / 2 },
						rotation: { x: Math.PI / 2, y: 0, z: 0 } // 90° around X-axis
					});
					break;
				case 'back':
					panels.push({
						width: this.width,
						height: this.height,
						depth: panelThickness,
						position: { x: 0, y: this.height / 2, z: panelThickness / 2 },
						rotation: { x: -Math.PI / 2, y: 0, z: 0 } // -90° around X-axis
					});
					break;
				case 'left':
					panels.push({
						width: this.depth - panelThickness * 2,
						height: this.height,
						depth: panelThickness,
						position: {
							x: -(this.width / 2 - panelThickness / 2),
							y: this.height / 2,
							z: this.depth / 2
						},
						rotation: { x: Math.PI / 2, y: 0, z: Math.PI / 2 } // 90° around Z-axis
					});
					break;
				case 'right':
					panels.push({
						width: this.depth - panelThickness * 2,
						height: this.height,
						depth: panelThickness,
						position: {
							x: this.width / 2 - panelThickness / 2,
							y: this.height / 2,
							z: this.depth / 2
						},
						rotation: { x: Math.PI / 2, y: 0, z: -Math.PI / 2 } // -90° around Z-axis
					});
					break;
				case 'top':
					panels.push({
						width: this.width - panelThickness * 2,
						height: this.depth - panelThickness * 2,
						depth: panelThickness,
						position: { x: 0, y: this.height - panelThickness / 2, z: this.depth / 2 },
						rotation: { x: 0, y: 0, z: 0 } // No rotation (facing up)
					});
					break;
				case 'bottom':
					panels.push({
						width: this.width - panelThickness * 2,
						height: this.depth - panelThickness * 2,
						depth: panelThickness,
						position: { x: 0, y: panelThickness / 2, z: this.depth / 2 },
						rotation: { x: Math.PI, y: 0, z: 0 } // 180° around X-axis
					});
					break;
			}
		});

		return panels;
	}
}
