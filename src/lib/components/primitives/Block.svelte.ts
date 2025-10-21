import type { Vector3, OriginPoint } from './Types';

export type Textures = {
	map: string | null;
	normal?: string | null;
	arm?: string | null;
};

export type Material = 'laminate' | 'plywood' | 'slab' | 'concrete' | 'gold' | 'tile';

const materialRoot = '/images/textures/';

function getOriginOffset(
	origin: OriginPoint,
	width: number,
	height: number,
	depth: number
): Vector3 {
	const offset = { x: 0, y: 0, z: 0 };
	offset.x = ((origin.includes('left') ? 0.5 : 0) + (origin.includes('right') ? -0.5 : 0)) * width;
	offset.y = ((origin.includes('bottom') ? 0.5 : 0) + (origin.includes('top') ? -0.5 : 0)) * height;
	offset.z = ((origin.includes('back') ? 0.5 : 0) + (origin.includes('front') ? -0.5 : 0)) * depth;
	return offset;
}

/**
 * A simple 3D block primitive with width, height, and depth dimensions.
 */
export default class Block {
	/** Dimensions */
	width = $state<number>(1);
	height = $state<number>(1);
	depth = $state<number>(1);

	/** Origin point and offset */
	origin = $state<OriginPoint>('center');
	originOffset = $derived<Vector3>(
		getOriginOffset(this.origin, this.width, this.height, this.depth)
	);

	/** Transform */
	position = $state<Vector3>({ x: 0, y: 0, z: 0 });
	rotation = $state<Vector3>({ x: 0, y: 0, z: 0 });

	/** Material type */
	material = $state<Material>('slab');

	/** Material textures */
	textures = $derived<Textures>({
		map: `${materialRoot}${this.material}/diffuse.jpg`,
		normal: `${materialRoot}${this.material}/normal.jpg`,
		arm: `${materialRoot}${this.material}/arm.jpg`
	});
	textureScale = $state<number>(1);

	/** Whether any textures are defined */
	isTextures = $derived<boolean>(
		!!this.textures.map || !!this.textures.normal || !!this.textures.arm
	);

	/**
	 * Creates a new Block with optional initial properties.
	 * @param init - Partial Block properties to initialize
	 */
	constructor(init?: Partial<Block>) {
		// console.log('Block created', this);
		Object.assign(this, init);
	}
}
