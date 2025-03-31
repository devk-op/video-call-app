# main.py
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

connected_users = {}

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    if room_id not in connected_users:
        connected_users[room_id] = []
    connected_users[room_id].append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            for user in connected_users[room_id]:
                if user != websocket:
                    await user.send_text(data)
    except Exception as e:
        print(f"[WebSocket Closed] {e}")
    finally:
        connected_users[room_id].remove(websocket)
        await websocket.close()

app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
