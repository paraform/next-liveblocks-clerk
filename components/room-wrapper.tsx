"use client";

import { ReactNode, useMemo } from "react";

import { RoomProvider } from "@/liveblocks.config";
import { useSearchParams } from "next/navigation";

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useOverrideRoomId(roomId: string) {
  const query = useSearchParams();
  const overrideRoomId = useMemo(() => {
    const roomIdQuery = query?.get(roomId);
    return roomIdQuery ? `${roomId}-${roomIdQuery}` : roomId;
  }, [query, roomId]);

  return overrideRoomId;
}
export function RoomWrapper({ children }: { children: ReactNode }) {
  const roomId = useOverrideRoomId("next-liveblocks-clerk");

  return (
    <RoomProvider
      id={roomId}
      /**
       * Initialize the cursor position to null when joining the room
       */
      initialPresence={{
        cursor: null,
      }}
    >
      {children}
    </RoomProvider>
  );
}
