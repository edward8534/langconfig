"""Run the single background-services process alongside the API pool."""

import asyncio
import os

from dotenv import load_dotenv

load_dotenv()
os.environ["LANGCONFIG_PROCESS_ROLE"] = "worker"

async def run_worker() -> None:
    from main import app

    async with app.router.lifespan_context(app):
        await asyncio.Event().wait()


if __name__ == "__main__":
    try:
        asyncio.run(run_worker())
    except KeyboardInterrupt:
        pass