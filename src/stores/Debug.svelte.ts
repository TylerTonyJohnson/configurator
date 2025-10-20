interface DebugState {
	enabled: boolean;
	showHelpers: boolean;
	showGrid: boolean;
}

export const debug: DebugState = $state({
	enabled: false,
	showHelpers: true,
	showGrid: true
});
