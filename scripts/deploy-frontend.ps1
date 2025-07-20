# Deployment script untuk Google Cloud Run - Frontend
# PanenHub Frontend Deployment

param(
    [string]$Region = "asia-southeast2",
    [string]$ProjectId = "panenhub-mvp",
    [string]$ServiceName = "panenhub-frontend"
)

Write-Host "Starting PanenHub Frontend Deployment to Google Cloud Run..." -ForegroundColor Green
Write-Host "Region: $Region" -ForegroundColor Cyan
Write-Host "Project: $ProjectId" -ForegroundColor Cyan
Write-Host "Service: $ServiceName" -ForegroundColor Cyan

# Check if gcloud is installed
try {
    $null = Get-Command gcloud -ErrorAction Stop
    Write-Host "Google Cloud CLI is available" -ForegroundColor Green
} catch {
    Write-Host "Google Cloud CLI is not installed. Please install it first." -ForegroundColor Red
    Write-Host "Download from: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    exit 1
}

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "Docker is running" -ForegroundColor Green
} catch {
    Write-Host "Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Set the project
Write-Host "Setting Google Cloud project..." -ForegroundColor Cyan
gcloud config set project $ProjectId

# Enable required APIs
Write-Host "Enabling required APIs..." -ForegroundColor Cyan
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and deploy
Write-Host "Building and deploying Frontend to Cloud Run..." -ForegroundColor Cyan
try {
    gcloud run deploy $ServiceName `
        --source . `
        --platform managed `
        --region $Region `
        --allow-unauthenticated `
        --port 3000 `
        --memory 1Gi `
        --cpu 1 `
        --min-instances 0 `
        --max-instances 10 `
        --timeout 900 `
        --cpu-boost `
        --set-env-vars "NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1" `
        --quiet

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Deployment successful!" -ForegroundColor Green
        
        # Get service URL
        $serviceUrl = gcloud run services describe $ServiceName --region $Region --format "value(status.url)"
        Write-Host ""
        Write-Host "Service URL: $serviceUrl" -ForegroundColor Green
        Write-Host "Frontend is now live!" -ForegroundColor Cyan
        
        # Test frontend
        Write-Host ""
        Write-Host "Testing frontend..." -ForegroundColor Cyan
        try {
            $response = Invoke-WebRequest -Uri $serviceUrl -Method Get -TimeoutSec 30 -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Host "Frontend is responding correctly!" -ForegroundColor Green
            } else {
                Write-Host "Frontend responded with status: $($response.StatusCode)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "Frontend test failed: $($_.Exception.Message)" -ForegroundColor Yellow
            Write-Host "Service might still be starting up..." -ForegroundColor Yellow
        }
        
    } else {
        throw "Deployment failed"
    }
} catch {
    Write-Host "Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test your frontend application" -ForegroundColor White
Write-Host "2. Verify API connections to backend" -ForegroundColor White
Write-Host "3. Monitor logs with: gcloud run logs tail $ServiceName --region $Region" -ForegroundColor White

Write-Host ""
Write-Host "Frontend deployment completed successfully! 🚀" -ForegroundColor Green
