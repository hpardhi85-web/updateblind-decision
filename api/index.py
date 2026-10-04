import sys
from pathlib import Path

# Ensure backend directory is in sys.path so modules like app.main can be imported
root_dir = Path(__file__).resolve().parent.parent
backend_dir = root_dir / "backend"

if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

# Import the FastAPI application instance for Vercel Serverless
from app.main import app

# Export for Vercel ASGI
__all__ = ["app"]
