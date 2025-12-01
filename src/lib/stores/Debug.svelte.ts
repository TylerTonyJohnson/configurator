interface DebugState {
	enabled: boolean;
	showHelpers: boolean;
	showGrid: boolean;
}

const defaultDebug = {
	enabled: false,
	showHelpers: true,
	showGrid: true
};

/* 
	METHODS
*/

function loadDebugState(): DebugState {
	const stored = localStorage.getItem('debugState');
	if (stored) {
		return JSON.parse(stored);
	}
	return defaultDebug;
}

function saveDebugState(state: DebugState) {
	localStorage.setItem('debugState', JSON.stringify(state));
}

/* 
	EXPORT
*/
export const debug: DebugState = $state(loadDebugState());

// Save automatically when changed
$effect.root(() => {
	$effect(() => {
		saveDebugState(debug);
	});
});
