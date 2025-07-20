# Deploy PanenHub Frontend to Google Cloud Run as a new service
# This creates a completely new service separate from the backend

Write-Host "Starting deployment of PanenHub Frontend to Google Cloud Run..." -ForegroundColor Green

# Set variables for new frontend service
$SERVICE_NAME = "panenhub-frontend-app"
$REGION = "asia-southeast2"
$PROJECT_ID = "panenhub-mvp"
$PORT = 3000
$MEMORY = "1Gi"
$CPU = 1
$MIN_INSTANCES = 0
$MAX_INSTANCES = 5
$TIMEOUT = 600

# Check if we're in the correct directory
if (!(Test-Path "package.json")) {
    Write-Host "Error: package.json not found. Make sure you're in the PanenHub-FE directory." -ForegroundColor Red
    exit 1
}

# Check if Dockerfile exists
if (!(Test-Path "Dockerfile")) {
    Write-Host "Error: Dockerfile not found. Please make sure the Dockerfile is in the current directory." -ForegroundColor Red
    exit 1
}

Write-Host "Creating new frontend service..." -ForegroundColor Yellow
Write-Host "Service: $SERVICE_NAME" -ForegroundColor Cyan
Write-Host "Region: $REGION" -ForegroundColor Cyan
Write-Host "Project: $PROJECT_ID" -ForegroundColor Cyan

# Deploy to Cloud Run with new service name
gcloud run deploy $SERVICE_NAME `
    --source . `
    --platform managed `
    --region $REGION `
    --allow-unauthenticated `
    --port $PORT `
    --memory $MEMORY `
    --cpu $CPU `
    --min-instances $MIN_INSTANCES `
    --max-instances $MAX_INSTANCES `
    --timeout $TIMEOUT `
    --set-env-vars "NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1" `
    --project $PROJECT_ID

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host "Your frontend application should be available at the URL shown above." -ForegroundColor Green
    Write-Host "This is a separate service from your backend at: https://panenhub-backend-kzrzjw7s3a-et.a.run.app" -ForegroundColor Cyan
} else {
    Write-Host "Deployment failed. Please check the error messages above." -ForegroundColor Red
    Write-Host "Build logs are available at the URL shown above." -ForegroundColor Yellow
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Make sure you're authenticated: gcloud auth login" -ForegroundColor White
    Write-Host "2. Set the correct project: gcloud config set project panenhub-mvp" -ForegroundColor White
    Write-Host "3. Enable required APIs: gcloud services enable run.googleapis.com cloudbuild.googleapis.com" -ForegroundColor White
    Write-Host "4. Check if there are any build errors in the logs" -ForegroundColor White
    exit 1
}
