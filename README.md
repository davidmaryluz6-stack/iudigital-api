# iUDigital - API REST Monolito + Microservicio (Docker)

Este proyecto implementa una **API REST** para la gestión de:
- **Tipos de proyecto**
- **Etapas**
- **Clientes**
- **Universidades**
- **Proyectos** (módulo de mayor demanda, separado como microservicio)

La solución se despliega mediante **contenedores Docker** usando **Docker Compose**.

---

## Repositorio (GitHub)
- Repo: https://github.com/davidmaryluz6-stack/iudigital-api

---

## Imágenes en Docker Hub
Las imágenes de las dos aplicaciones fueron publicadas en Docker Hub:

- **Monolito**: `davidmaryluz6/monolito-api:1.0`
- **Microservicio Proyectos**: `davidmaryluz6/ms-proyectos:1.0`

---

## Arquitectura de la solución

### 1) Monolito (Express + MongoDB)
Contiene los módulos:
- Tipos de Proyecto
- Etapas
- Clientes
- Universidades

**Puerto:** `3000`

### 2) Microservicio Proyectos (Express + MongoDB)
Contiene el módulo:
- Proyectos (módulo de mayor demanda)

Incluye endpoint de **métricas** para justificar la mayor demanda.

**Puerto:** `3001`

### 3) Base de datos (MongoDB)
Se utiliza MongoDB como contenedor (imagen `mongo:6`).

---

## Diseño de Base de Datos (MongoDB - colecciones)

- `clientes`: { nombre, email (unique), timestamps }
- `universidades`: { nombre (unique), direccion, telefono, timestamps }
- `etapas`: { nombre (unique), timestamps }
- `tipoproyectos`: { nombre (unique), timestamps }
- `proyectos`: {
  numero (unique),
  titulo,
  fechaIniciacion,
  fechaEntrega,
  valor,
  clienteId (ref),
  tipoProyectoId (ref),
  universidadId (ref),
  etapaId (ref),
  timestamps
}

Relación: un Cliente/Universidad/Etapa/TipoProyecto puede estar asociado a muchos Proyectos.

> Nota: Se implementó **bloqueo de borrado** en el monolito: si existen proyectos asociados, no se permite eliminar el registro (respuesta 409).

---

## Ejecución con Docker Compose

### Requisitos
- Docker Desktop
- Docker Compose

### Levantar servicios (usando imágenes de Docker Hub)
En la raíz del proyecto:

```bash
docker compose pull
docker compose up

