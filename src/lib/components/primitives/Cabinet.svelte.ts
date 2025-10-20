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
		console.log('Cabinet created', this);
		if (init) Object.assign(this, init);
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
}
