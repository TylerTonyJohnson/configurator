<script>
	const orthoGhost = {
		label: 'Ortho',
		children: [
			{
				label: 'Mobility',
				action: 'Choose 1',
				children: [
					{ label: 'Free-Standing', action: 'Choice' },
					{ label: 'Mobile', action: 'Choice' }
				]
			},
			{
				label: 'Size',
				action: 'Choose 1',
				children: [
					{ label: 'Standard', action: 'Choice' },
					{ label: 'Narrow', action: 'Choice' }
				]
			},
			{
				label: 'Handedness',
				action: 'Choose 1',
				children: [
					{ label: 'Left Handed', action: 'Choice' },
					{ label: 'Right Handed', action: 'Choice' }
				]
			}
		]
	};

	let currentConfiguration = {};

	let currentMobility = $state('None Selected');

	const handleMobility = (choice) => {
		currentMobility = choice;
	};
</script>

<div class="frame">
	<h1>Ortho Configuration</h1>
	<div class="pane-container">
		<div class="pane">
			<!-- <div class="button-column">
				<div class="button-row">
					{#each orthoGhost.design.mobility as choice, i}
						<button
							class="button-30"
							class:chosen={currentMobility === choice}
							onclick={() => handleMobility(choice)}>{choice}</button
						>
					{/each}
				</div>
				<div class="button-row">
					{#each orthoGhost.design.size as choice, i}
						<button
							class="button-30"
							class:chosen={currentMobility === choice}
							onclick={() => handleMobility(choice)}>{choice}</button
						>
					{/each}
				</div>
			</div> -->
		</div>
		<div class="pane">{@render renderNode(orthoGhost)}</div>
	</div>
</div>

{#snippet renderNode(node, depth = 0)}
	<div class="line">{'\t'.repeat(depth)}{node.label}</div>
	{#if node.children && node.children.length}
		<div class="tree">
			{#each node.children as child}
				{@render renderNode(child, depth + 1)}
			{/each}
		</div>
	{/if}
{/snippet}

<style>
	.frame {
		height: 50%;
		width: 100%;

		display: flex;
		flex-direction: column;
	}

	h1 {
		text-align: center;
		padding: 1rem;
	}

	.pane-container {
		height: 100%;

		display: flex;
		flex-direction: row;
	}

	.pane {
		flex: 1;
		height: 100%;
		border: solid pink 1px;
		padding: 1rem;
		list-style: none;
	}

	.line {
		white-space: pre;
		font-family: monospace;
	}

	.button-column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.button-row {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	/* CSS */
	.button-30 {
		align-items: center;
		appearance: none;
		background-color: #fcfcfd;
		border-radius: 4px;
		border-width: 0;
		box-shadow:
			rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		box-sizing: border-box;
		color: #36395a;
		cursor: pointer;
		display: inline-flex;
		font-family: 'JetBrains Mono', monospace;
		height: 48px;
		justify-content: center;
		line-height: 1;
		list-style: none;
		overflow: hidden;
		padding-left: 16px;
		padding-right: 16px;
		position: relative;
		text-align: left;
		text-decoration: none;
		transition:
			box-shadow 0.15s,
			transform 0.15s;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		white-space: nowrap;
		will-change: box-shadow, transform;
		font-size: 18px;
	}

	/* Last clicked? */
	.button-30:focus {
		box-shadow:
			#d6d6e7 0 0 0 1.5px inset,
			rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
	}

	/* Hovering */
	.button-30:hover {
		box-shadow:
			rgba(45, 35, 66, 0.4) 0 4px 8px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		transform: translateY(-2px);
	}

	/* Pressing down */
	.button-30:active {
		box-shadow: #d6d6e7 0 3px 7px inset;
		transform: translateY(2px);
	}

	.button-30.chosen {
		outline: solid blue 3px;
	}
</style>
