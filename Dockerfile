# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY portfolio-frontend/package*.json ./
RUN npm install
COPY portfolio-frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM eclipse-temurin:21-jdk-jammy AS backend-build
WORKDIR /backend
COPY portfolio-backend/mvnw portfolio-backend/mvnw.cmd ./
COPY portfolio-backend/.mvn .mvn
RUN chmod +x mvnw
COPY portfolio-backend/pom.xml ./
RUN ./mvnw dependency:go-offline
COPY portfolio-backend/src ./src
# Copy frontend build to backend static resources
COPY --from=frontend-build /frontend/dist /backend/src/main/resources/static
RUN ./mvnw clean package -DskipTests

# Stage 3: Final Image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=backend-build /backend/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
