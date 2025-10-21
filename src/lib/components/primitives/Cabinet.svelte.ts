import type { Vector3, OriginPoint } from '$lib/components/primitives/Types';
import Block from '$lib/components/primitives/Block.svelte.ts';

/**
 * A cabinet primitive with configurable dimensions and modular components.
 */
export default class Cabinet {
	/** Dimensions */
	width = $state<number>(1);
	height = $state<number>(1);
	depth = $state<number>(1);

	/** Origin point and offset */
	origin = $state<OriginPoint>('center');
	originOffset = $derived<Vector3>(
		this.origin ? { x: 0, y: this.height / 2, z: this.depth / 2 } : { x: 0, y: 0, z: 0 }
	);

	/** Transform */
	position = $state<Vector3>({ x: 0, y: 0, z: 0 });
	rotation = $state<Vector3>({ x: 0, y: 0, z: 0 });

	/** Array of blocks */
	blocks = $state<Block[]>([]);

	/**
	 * Creates a new Cabinet with optional initial properties.
	 * @param init - Partial Cabinet properties to initialize
	 */
	constructor(init?: Partial<Cabinet>) {
		// console.log('Cabinet created', this);
		if (init) Object.assign(this, init);
		this.addDefaultCabinet();

		// $inspect(this.blocks, 'Cabinet Blocks');
	}

	/** Add a block to the cabinet */
	addBlock(blockConfig: Partial<Block> = {}) {
		const block = new Block(blockConfig);
		this.blocks.push(block);
		return block;
	}

	/** Remove a block from the cabinet */
	removeBlock(block: Block) {
		const index = this.blocks.indexOf(block);
		if (index > -1) {
			this.blocks.splice(index, 1);
		}
	}

	/** Clear all blocks */
	clearBlocks() {
		this.blocks = [];
	}

	addDefaultCabinet() {
		// console.log('Adding default cabinet structure');

		let overhang = 0.01;
		let panelThickness = 0.019;
		let counterThickness = 0.03;
		let drawerHeight = 0.1;
		let handleSize = 0.025;

		// console.log('Cabinet dimensions:', {
		// 	width: this.width,
		// 	height: this.height,
		// 	depth: this.depth
		// });

		// Left Panel
		this.addBlock({
			width: this.depth - overhang,
			height: this.height - counterThickness,
			depth: panelThickness,
			origin: 'right-bottom-back',
			position: { x: -(this.width / 2 - overhang), y: 0, z: 0 },
			rotation: { x: 0, y: Math.PI / 2, z: 0 },
			material: 'plywood'
		});

		// Right Panel
		this.addBlock({
			width: this.depth - overhang,
			height: this.height - counterThickness,
			depth: panelThickness,
			origin: 'left-bottom-back',
			position: { x: this.width / 2 - overhang, y: 0, z: 0 },
			rotation: { x: 0, y: -Math.PI / 2, z: 0 },
			material: 'plywood'
		});

		// Drawer
		this.addBlock({
			width: this.width - 2 * panelThickness - 2 * overhang,
			height: drawerHeight,
			depth: panelThickness,
			origin: 'top-front',
			position: { x: 0, y: this.height - counterThickness, z: this.depth - overhang },
			rotation: { x: 0, y: 0, z: 0 },
			material: 'plywood',
			textureScale: 0.5
		});
		// Handle
		this.addBlock({
			width: handleSize * 5,
			height: handleSize,
			depth: handleSize,
			origin: 'back',
			position: {
				x: 0,
				y: this.height - counterThickness - drawerHeight / 2,
				z: this.depth - overhang
			},
			rotation: { x: 0, y: 0, z: 0 },
			material: 'gold'
		});
		// Counter
		this.addBlock({
			width: this.width,
			height: this.depth,
			depth: counterThickness,
			origin: 'bottom-back',
			position: { x: 0, y: this.height, z: 0 },
			rotation: { x: Math.PI / 2, y: 0, z: 0 },
			material: 'tile',
			textureScale: 0.5
		});
	}
}
