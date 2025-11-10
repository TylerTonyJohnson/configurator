# Configurator App Structure

This application uses a hierarchical structure to organize components:

## Hierarchy

```
Room
 └── Cabinets
    └── Modules
```

## Components

### Room

The top-level container that represents a physical space.

### Cabinets

Individual storage units placed within the room. Each room can contain multiple cabinets.

### Modules

Individual components or compartments inside each cabinet. Each cabinet can contain multiple modules.

## Example

A typical configuration might look like:

- **Kitchen Room**
  - Cabinet 1 (Base Cabinet)
    - Module: Drawer
    - Module: Shelf
  - Cabinet 2 (Wall Cabinet)
    - Module: Shelf
    - Module: Shelf
