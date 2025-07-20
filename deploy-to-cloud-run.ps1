# Deploy PanenHub Frontend to Google Cloud Run
# Make sure you're authenticated with gcloud and have the correct project set

Write-Host "Starting deployment of PanenHub Frontend to Google Cloud Run..." -ForegroundColor Green

# Set variables
$SERVICE_NAME = "panenhub-frontend"
$REGION = "asia-southeast2"
$PROJECT_ID = "panenhub-mvp"
$PORT = 3000
$MEMORY = "2Gi"
$CPU = 2
$MIN_INSTANCES = 0
$MAX_INSTANCES = 10
$TIMEOUT = 900

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

Write-Host "Deploying to Google Cloud Run..." -ForegroundColor Yellow
Write-Host "Service: $SERVICE_NAME" -ForegroundColor Cyan
Write-Host "Region: $REGION" -ForegroundColor Cyan
Write-Host "Project: $PROJECT_ID" -ForegroundColor Cyan

# Deploy to Cloud Run
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
    Write-Host "Your application should be available at the URL shown above." -ForegroundColor Green
} else {
    Write-Host "Deployment failed. Please check the error messages above." -ForegroundColor Red
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Make sure you're authenticated: gcloud auth login" -ForegroundColor White
    Write-Host "2. Set the correct project: gcloud config set project panenhub-mvp" -ForegroundColor White
    Write-Host "3. Enable required APIs: gcloud services enable run.googleapis.com cloudbuild.googleapis.com" -ForegroundColor White
    exit 1
}
