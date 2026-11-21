# Pulso Abierto

Aplicación web para consultar los precios de Bitcoin, Ethereum y Solana en dólares estadounidenses.

## Funciones
- Consulta de precios mediante CoinGecko.
- Vista detallada de criptomonedas.
- Agregar y quitar favoritos.
- Guardado de favoritos en el navegador.
- Formulario de consulta con validación.
- Diseño adaptable a móviles y computadoras.

## Tecnologías
- React
- TypeScript
- Vite
- React Router
- Zustand
- Vitest
- Testing Library

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run dev
npm run test
npm run build
npm run preview
```

## API
Se utiliza la API pública de CoinGecko.

No requiere variables de entorno.

## Mejora de mantenimiento
Se centralizaron los nombres de las criptomonedas en `src/constants/cryptos.ts` para evitar duplicaciones entre páginas.

## Publicación
Aplicación disponible en:

https://pulso-abierto-green.vercel.app

Repositorio:

https://github.com/benjaminlenarduzzi3-alt/pulso-abierto

## Verificación final
- 4 pruebas automatizadas aprobadas.
- Compilación de producción correcta.
- Código publicado en GitHub.
- Aplicación desplegada en Vercel.
- Funcionamiento de la página publicada comprobado por el usuario.
- Fecha de verificación: 21/11/2026.
