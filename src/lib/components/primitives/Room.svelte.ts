export type RoomType = 'void' | 'operatory';

export default class Room {
	type: RoomType = $state('void');

	constructor(type: RoomType) {
		this.type = type;
	}
}
