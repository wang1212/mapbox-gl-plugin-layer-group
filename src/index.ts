/**
 * Mapbox-GL plugin - layer group
 *
 * Reference from https://github.com/mapbox/mapbox-gl-layer-groups
 */
import mapboxGL, { CustomLayerInterface } from 'mapbox-gl'

/**
 * see doc: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
 *
 * @author wang1212
 * @interface LayerDefinition
 */
interface LayerDefinition {
	[p: string]: unknown
}

export interface Map extends mapboxGL.Map {
	addLayerGroup(): typeof addLayerGroup
	removeLayerGroup(): typeof removeLayerGroup
	getLayerGroupFirstLayerId(i: string): typeof getLayerGroupFirstLayerId
	getLayerGroupLastLayerId(): typeof getLayerGroupLastLayerId
	addLayerToGroup(): typeof addLayerToGroup
	getLayerGroupLayersId(): typeof getLayerGroupLayersId
	moveLayerGroup(): typeof moveLayerGroup
}

function getLayerGroupPlaceholderLayerId(groupId: string): string {
	return `${groupId}^placeholder`
}

function isLayer(map: Map, id: string): boolean {
	return !!map.getLayer(id)
}

function getLayerGroupId(map: Map, layerId: string): string | undefined {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
	return map.getLayer(layerId)?.metadata?.group
}

function getLayerIdFromIndex(map: Map, index: number): string | undefined {
	if (index === -1) return undefined

	const layers = map.getStyle().layers || []
	return layers && layers[index] && layers[index].id
}

function normalizeBeforeId(map: Map, beforeId: string | undefined): string | undefined {
	// group
	if (beforeId && !isLayer(map, beforeId)) {
		return map.getLayerGroupFirstLayerId(beforeId)
		// layer in group
	} else if (beforeId && getLayerGroupId(map, beforeId)) {
		return map.getLayerGroupFirstLayerId(getLayerGroupId(map, beforeId) as string)
	} else {
		return beforeId
	}
}

function getLayerGroupFirstLayerIndex(map: Map, groupId: string): number {
	const layers = map.getStyle().layers || []

	for (let i = 0; i < layers.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (layers[i].metadata?.group === groupId) {
			return i
		}
	}
	return -1
}

function getLayerGroupLastLayerIndex(map: Map, groupId: string): number {
	const layers = map.getStyle().layers || []
	let i = getLayerGroupFirstLayerIndex(map, groupId)

	if (i === -1) return -1

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	while (i < layers.length && layers[i].metadata?.group === groupId) i++

	return i - 1
}

// * extends prototype

/**
 *
 *
 * @author wang1212
 * @param {string} groupId
 * @param {{ beforeId: string }} { beforeId }
 */
function addLayerGroup(groupId: string, { beforeId }: { beforeId: string } = {}): void {
	const map = this as Map

	if (isLayer(map, getLayerGroupPlaceholderLayerId(groupId))) {
		throw new Error('"groupId" already exists!')
	}

	const beforeLayerId = normalizeBeforeId(map, beforeId)

	if (beforeId && !beforeLayerId) {
		throw new Error('"beforeId" is not a layer id nor a layer group id!')
	}

	// * Add a layer group placeholder layer, the purpose is to remove all layers in the layer group,
	// * if you add a new layer again, you can locate the correct layer group position and add successfully.
	const groupPlaceholderLayer = {
		id: getLayerGroupPlaceholderLayerId(groupId),
		type: 'background',
		layout: {
			visibility: 'none',
		},
		metadata: {
			group: groupId,
		},
	}

	map.addLayer(groupPlaceholderLayer, beforeLayerId)
}

mapboxGL.Map.prototype.addLayerGroup = addLayerGroup

/**
 * Remove a layer group and all of its layers from the map.
 *
 * @author wang1212
 * @param {string} groupId
 */
function removeLayerGroup(groupId: string): void {
	const map = this as Map

	if (!isLayer(map, getLayerGroupPlaceholderLayerId(groupId))) {
		throw new Error('"groupId" does not exists!')
	}

	const layers = map.getStyle().layers || []

	for (let i = 0; i < layers.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (layers[i].metadata?.group === id) {
			map.removeLayer(layers[i].id)
		}
	}
}

mapboxGL.Map.prototype.removeLayerGroup = removeLayerGroup

/**
 * Get the id of the first layer in a group.
 *
 * @author wang1212
 * @param {string} groupId
 * @returns {(string | undefined)}
 */
function getLayerGroupFirstLayerId(groupId: string): string | undefined {
	const map = this as Map
	return getLayerIdFromIndex(map, getLayerGroupFirstLayerIndex(map, groupId))
}

mapboxGL.Map.prototype.getLayerGroupFirstLayerId = getLayerGroupFirstLayerId

/**
 * Get the id of the last layer in a group.
 *
 * @author wang1212
 * @param {string} groupId
 * @returns {(string | undefined)}
 */
function getLayerGroupLastLayerId(groupId: string): string | undefined {
	const map = this as Map
	return getLayerIdFromIndex(map, getLayerGroupLastLayerIndex(map, groupId))
}

mapboxGL.Map.prototype.getLayerGroupLastLayerId = getLayerGroupLastLayerId

/**
 * Add a single layer to an existing layer group.
 *
 * @author wang1212
 * @param {string} groupId
 * @param {(LayerDefinition | CustomLayerInterface)} layer
 * @param {string} [beforeId]
 */
function addLayerToGroup(groupId: string, layer: LayerDefinition | CustomLayerInterface, beforeId?: string): void {
	const map = this as Map

	if (beforeId && (!isLayer(map, beforeId) || getLayerGroupId(map, beforeId) !== groupId)) {
		throw new Error('"beforeId" must be the id of a layer within the same group')
	} else if (!beforeId) {
		const lastLayerIndex = getLayerGroupLastLayerIndex(map, groupId)

		if (lastLayerIndex === -1) {
			throw new Error(`the "${groupId}" layer group does not exist!`)
		}

		beforeId = getLayerIdFromIndex(map, lastLayerIndex + 1)
	}

	map.addLayer(
		{
			...layer,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			metadata: {
				...(layer.metadata || {}),
				group: groupId,
			},
		},
		beforeId
	)
}

mapboxGL.Map.prototype.addLayerToGroup = addLayerToGroup

/**
 * Get the ids of the all layers in a group.
 *
 * @author wang1212
 * @param {string} groupId
 * @returns {string[]}
 */
function getLayerGroupLayersId(groupId: string): string[] {
	const map = this as Map
	const ids = [] as string[]
	const layers = map.getStyle().layers || []

	layers.forEach((layer) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		layer.metadata?.group === groupId && ids.push(layer.id)
	})

	return ids
}

mapboxGL.Map.prototype.getLayerGroupLayersId = getLayerGroupLayersId

/**
 * Move the layer group before the specified layer (group).
 *
 * @author wang1212
 * @param {string} groupId
 * @param {string} [beforeId]
 */
function moveLayerGroup(groupId: string, beforeId?: string): void {
	const map = this as Map
	const beforeLayerId = normalizeBeforeId(map, beforeId)

	const layers = map.getStyle().layers || []

	for (let i = 0; i < layers.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (layers[i].metadata?.group === groupId) {
			map.moveLayer(layers[i].id, beforeLayerId)
		}
	}
}

mapboxGL.Map.prototype.moveLayerGroup = moveLayerGroup
