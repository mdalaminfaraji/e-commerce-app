# Docker Setup Guide for E-Commerce App

This guide explains how to use Docker with this e-commerce application, making it easy for any developer to run the project locally without installing Node.js or other dependencies.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine (comes with Docker Desktop for Windows/Mac)

## Getting Started

### Option 1: Using Docker Compose (Recommended for Beginners)

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdalaminfaraji/e-commerce-app.git
   cd e-commerce-app
   ```

2. **Start the application**
   ```bash
   docker-compose up
   ```

3. **Access the application**
   Open your browser and go to: http://localhost:5173

4. **Stop the application**
   Press `Ctrl+C` in the terminal window, or run:
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker Directly

1. **Build the Docker image**
   ```bash
   docker build -t e-commerce-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 5173:5173 -v $(pwd)/src:/app/src -v $(pwd)/public:/app/public e-commerce-app
   ```

3. **Access the application**
   Open your browser and go to: http://localhost:5173

## Understanding the Docker Files

### Dockerfile

The `Dockerfile` contains instructions for building the application image:

- Uses Node.js 18 Alpine as the base image (lightweight)
- Sets up a working directory for the application
- Installs dependencies
- Copies application code
- Exposes port 5173 for the Vite development server
- Configures the start command

### docker-compose.yml

The `docker-compose.yml` file simplifies container management:

- Builds the application from the Dockerfile
- Maps port 5173 from the container to your host
- Sets up volume mapping for real-time code changes
- Configures environment variables

### .dockerignore

The `.dockerignore` file excludes unnecessary files from the Docker build process, making builds faster and images smaller.

## Development with Docker

### Making Changes

With the setup using volumes (`./src:/app/src`), any changes you make to files in the `src` directory will be immediately reflected in the running application thanks to Vite's hot module replacement.

### Adding Dependencies

If you add new dependencies to `package.json`, you'll need to rebuild the Docker image:

```bash
docker-compose down
docker-compose up --build
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use on your machine, modify the `docker-compose.yml` file to use a different port:

```yaml
ports:
  - "3000:5173"  # Change 3000 to any available port
```

### Container Not Starting

Check the logs:
```bash
docker-compose logs
```

### Performance Issues

For better performance on Windows/Mac, consider adjusting Docker Desktop resource allocation (CPU, Memory) in the Docker Desktop settings.
