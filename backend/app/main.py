import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .core.config import settings
from .api.routes import router as api_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("blindspot")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for BlindSpot — Decision Crash Test. Challenges reasoning without making decisions for the user.",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Universal CORS configuration for Localhost, Vercel preview & production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router for both /api/v1 and /v1 prefixes (Vercel serverless resilience)
app.include_router(api_router, prefix="/api/v1")
app.include_router(api_router, prefix="/v1")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred while processing your request. Please try again later."}
    )

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "status": "online",
        "docs": "/docs"
    }
