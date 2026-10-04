import sys
import traceback

with open("run_error.log", "w") as f:
    try:
        import uvicorn
        f.write("Uvicorn imported successfully\n")
        f.flush()
        uvicorn.run("app.main:app", host="127.0.0.1", port=8000, log_level="info")
    except Exception as e:
        f.write(f"Exception: {e}\n")
        traceback.print_exc(file=f)
        f.flush()
