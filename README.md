# Sistema de Análisis de Red Social (Modelo A - Programación IV)

Resolución completa del 1er Parcial de Programación IV consumiendo la API pública de JSONPlaceholder.

## Entidades Analizadas

- **Usuarios** (`/users`)
- **Comentarios** (`/comments`)
- **Álbumes** (`/albums`)

## Tecnologías y Conceptos Aplicados

- **Arquitectura Modular CommonJS:** `require` y `module.exports`.
- **POO con Constructores y Prototipos:** `function Entity()` y `Entity.prototype.metodo`.
- **Asincronía Moderna:** `fetch` nativo de Node v24, `async / await`, validación estricta con `response.ok` y bloque `try / catch`.
- **Timers y Event Loop:** Delays basados en Promesas y `setTimeout`.
- **Closures:** Fábrica de funciones filtradoras y encapsulamiento de estado privado (contador auditado).
- **Métodos Avanzados de Arrays y Estructuras:** `reduce`, `filter`, `map`, `sort`, `slice`, `some`, `find` y `Set`.

## Ejecución

```bash
node index.js
```
