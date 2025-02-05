# Pasaporte Biológico para Atletas con Hyperledger Fabric
Este proyecto implementa un sistema de Pasaporte Biológico para atletas utilizando Hyperledger Fabric. El sistema usa blockchain para almacenar y gestionar la información biológica y de dopaje de los atletas, asegurando transparencia, integridad y seguridad en los datos.

## Descripción
El objetivo principal de este proyecto es proporcionar una solución descentralizada para el almacenamiento y gestión de datos sensibles relacionados con la salud y el rendimiento de los atletas. Utilizando Hyperledger Fabric, se asegura que la información de cada atleta sea inmutable, accesible y verificable solo por los actores autorizados, como agencias antidopaje, comités olímpicos, federaciones deportivas y otros stakeholders.

## Estructura del Proyecto
El proyecto se organiza de la siguiente manera:

fabric-pasaporte-biologico/
├── chaincode/
│   └── pasaporte-biologico/
│       └── pasaporte.go           # El código del chaincode
├── config/
│   ├── docker-compose.yaml        # Configuración de Docker para la red Hyperledger Fabric
│   ├── connection-profile.yaml    # Perfil de conexión para la red
├── scripts/
│   ├── deploy.sh                  # Script para desplegar el chaincode
│   ├── invoke.sh                  # Script para invocar funciones del chaincode
│   └── query.sh                   # Script para consultar los datos de un atleta
└── README.txt                     # Este archivo

## Requisitos
Docker: Hyperledger Fabric utiliza contenedores Docker para simular la red blockchain. Asegúrate de tener Docker y Docker Compose instalados.
	Instalar Docker
	Instalar Docker Compose
Go: El código de chaincode está escrito en Go. Asegúrate de tener Go instalado en tu máquina para poder modificar el código si es necesario.
	Instalar Go

## Instrucciones de Configuración
Paso 1: Configurar la Red de Hyperledger Fabric
	Clona este repositorio o descarga el proyecto.
	Ve a la carpeta config/ y abre el archivo docker-compose.yaml.
	Si es necesario, ajusta las configuraciones según tu entorno (puertos, imagen de la red, etc.).
Paso 2: Iniciar la Red de Hyperledger Fabric
	Para iniciar la red de Hyperledger Fabric, ejecuta el siguiente comando desde la raíz del proyecto:
		docker-compose -f config/docker-compose.yaml up -d
		Este comando iniciará los contenedores de Docker necesarios para ejecutar la red.
Paso 3: Desplegar el Chaincode
	Asegúrate de que los contenedores estén en ejecución.
	Ejecuta el script de despliegue:
		./scripts/deploy.sh
Paso 4: Registrar un Atleta
	Para registrar un atleta en la red, puedes ejecutar el script de invocación:
		./scripts/invoke.sh
	Este script registrará al atleta "Juan Perez" con los datos proporcionados (identidad biométrica y resultados de dopaje).
Paso 5: Consultar los Datos de un Atleta
	Para consultar los datos de un atleta registrado, puedes ejecutar el siguiente script:
		./scripts/query.sh
	Este script consultará y mostrará los datos de un atleta registrado, como "Juan Perez".

## Contribuciones
Si deseas contribuir a este proyecto, por favor abre un issue o crea un pull request con tus cambios. Asegúrate de seguir las buenas prácticas de desarrollo y pruebas para mantener la calidad del código.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
