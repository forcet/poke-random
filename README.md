# 🌀 POKE-RANDOM

Servicio **POKE-RANDOM** — genera y administra Pokémon de forma aleatoria, consumiendo los servicios del microservicio [`forcet-poke-data`](https://github.com/forcet22/poke-data) para almacenar y recuperar información.

---

## 📦 Descripción General

Este microservicio forma parte del ecosistema **FORCET**, encargado de generar Pokémon de manera aleatoria, registrar su información en `poke-data`, y exponer endpoints REST para su gestión.

Está construido en **Node.js** + **Express**, con **TypeScript**, y se despliega mediante **Helm** en OpenShift/Kubernetes.

---

## 🧩 Estructura del Proyecto

```
POKE-RANDOM/
├── .github/workflows/
│   └── docker-image-poke-random.yml   # Pipeline CI/CD (build + push a Docker Hub)
├── helm/                              # Chart Helm de despliegue
├── src/
│   ├── model/                         # Modelos de datos
│   ├── routes/                        # Rutas HTTP del servicio
│   │   ├── HealthRoute.ts
│   │   ├── PokemonRoute.ts
│   │   ├── ReadinessRoute.ts
│   │   ├── StartupRoute.ts
│   ├── service/                       # Servicios internos
│   │   ├── Http.ts
│   │   └── PokemonService.ts
│   ├── util/                          # Utilidades (funciones auxiliares)
│   │   ├── getJson.ts
│   │   ├── Random.ts
│   ├── init.ts                        # Inicialización de dependencias
│   └── server.ts                      # Punto de entrada principal
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Endpoints

### `/pokemon`  
- **GET** → genera y devuelve un Pokémon aleatorio.  
- **POST** → registra un nuevo Pokémon aleatorio en `poke-data`.

### `/pokemon/:id`  
- **GET** → obtiene la información detallada de un Pokémon previamente guardado.  
- **DELETE** → elimina un Pokémon registrado.

### `/info/pokemon`  
- **GET** → obtiene una lista reducida y general de Pokémon registrados.

### `/all/pokemon`  
- **GET** → obtiene el listado completo con detalle de todos los Pokémon registrados.

### Rutas de salud y readiness:
- `/health`  
- `/readiness`  
- `/startup`  

---

## 🧪 CI/CD (GitHub Actions)

El flujo de integración continua (`.github/workflows/docker-image-poke-random.yml`) realiza los siguientes pasos:

1. **Build** del contenedor Docker.
2. **Push** a Docker Hub (o registro configurado).
3. **Actualización** del despliegue en OpenShift/Kubernetes vía Helm Chart.

---


## 🐳 Construcción con Docker

```bash
docker build -t poke-random .
docker run -d -p 3000:3000 --env-file .env poke-random
```
---

### Build local
```bash
docker build -t forcet22/poke-random:1.0.0 .
```

### Run local
```bash
docker run -p 3000:3000   -e POKEDATA_BASE_URL=http://localhost:3001   forcet22/poke-random:1.0.0
```

---

## 🧭 Despliegue con Helm

El chart Helm se encuentra en el directorio `helm/`.

Ejemplo de despliegue:
```bash
helm upgrade --install forcet-poke-api ./helm   --namespace forcet22-dev   -f ./helm/values-dev.yaml
```

---

## 🧠 Notas

- Este servicio **depende** de que `poke-data` esté disponible y accesible desde la red del cluster.
- Verifica que las NetworkPolicies permitan el **egress** hacia `poke-data`.
- Usa `ClusterFirst` como `dnsPolicy` (resolución interna).

---

## 🧾 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.
