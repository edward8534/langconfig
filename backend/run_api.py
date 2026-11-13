"""Run the production API worker pool."""

import os

from dotenv import load_dotenv
import uvicorn

load_dotenv()
os.environ["LANGCONFIG_PROCESS_ROLE"] = "api"

def main() -> None:
    uvicorn.run(
        "main:app",
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", "8000")),
        workers=int(os.getenv("API_WORKERS", "6")),
        limit_concurrency=int(os.getenv("API_LIMIT_CONCURRENCY", "100")),
    )


if __name__ == "__main__":
    main()