export type ModuleType = 'door' | 'drawer' | 'open';
export type ModuleAccess = 'front' | 'left' | 'right';
export type PanelLocation = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
export type PlaningType = 'siding' | 'spanning' | 'facing';
export type Planing = [PlaningType, PlaningType, PlaningType];

export default class Module {
	type: ModuleType = 'open';
	access: ModuleAccess = 'front';
	width = $state<number>(0.6);
	height = $state<number>(0.8);
	depth = $state<number>(0.3);

	composition: Array<PanelLocation> = ['back', 'left', 'right', 'top', 'bottom'];
	planing: Planing = ['facing', 'siding', 'spanning'];

	anchors = $derived<number[][]>(this.getAnchors());
	panels = $derived(this.getPanels());

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

	private getAnchors(): number[][] {
		const anchors: number[][] = [];

		this.composition.forEach((location) => {
			switch (location) {
				case 'front':
					anchors.push([0, this.height / 2, this.depth]);
					break;
				case 'back':
					anchors.push([0, this.height / 2, 0]);
					break;
				case 'left':
					anchors.push([-this.width / 2, this.height / 2, this.depth / 2]);
					break;
				case 'right':
					anchors.push([this.width / 2, this.height / 2, this.depth / 2]);
					break;
				case 'top':
					anchors.push([0, this.height, this.depth / 2]);
					break;
				case 'bottom':
					anchors.push([0, 0, this.depth / 2]);
					break;
			}
		});

		return anchors;
	}
}
