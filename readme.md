Chat Reflector 9000
===================

# Goals
- Connect to slack via token
- Watch for messages on specific channels that match the format: "Q: My question is, what is the meaning of life?"
- Broadcast that question via a WebSocket
- WebSocket client display that message, who said it and when. Ideally in a large format for TV.
- Client should allow selecting different channels to Watch

# Stretch Goals
- A message with the format: "Come here chat reflector 9000" summons the app to watch that channel
- Enhance the client API

# Ultra stretch
- WebRTC streams a single client as a background for the main client
- Overlay questions on top of WebRTC, fade over time
- Give a link for WebRTC to channel when Chat Reflector 9000 comes around
