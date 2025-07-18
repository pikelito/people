# People Project

## Descripción

Aplicación web desarrollada con Vue 3, TypeScript y Quasar Framework.

## Tecnologías Principales

- Vue 3
- TypeScript
- Vite
- Quasar Framework
- SASS para estilos

## Requisitos Previos

- Node.js (versión recomendada: >=18)
- npm

## Instalación

```bash
# Instalar dependencias
npm install
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev
npm run build
npm run preview

# Testing
npm run test
npm run test:coverage
npm run test:watch
```

## Estructura de Carpetas

```bash
src/
├── modules/              # Módulos de la aplicación
│   └── people/
│       ├── components/   # Componentes específicos del módulo
│       ├── composables/  # Lógica de negocio reutilizable
│       ├── services/     # Servicios
│       └── pages/        # Páginas específicas del módulo
│
│
├── shared/               # Código compartido
│   ├── components/       # Componentes reutilizables
│   ├── composables/      # Composables globales
│   ├── services/         # Servicios compartidos
│   └── utils/            # Utilidades
│
├── router/               # Configuración de rutas
│
├── stores/               # Stores de Pinia
│
├── assets/               # Recursos estáticos
│
├── types/                # tipos globales
│
└── scss/                 # Estilos globales
    ├── abstracts/        # Variables, mixins, funciones
    ├── base/             # Estilos base
    ├── components/       # Estilos de componentes
    └── layouts/          # Estilos de layouts
```
