"use client";

import { useOthers, useUpdateMyPresence } from "@/liveblocks.config";

import Cursor from "@/components/cursor";
import { useEffect } from "react";

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

function useLiveCursors() {
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    let scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition: { x: number; y: number } | null = null;

    function transformPosition(cursor: { x: number; y: number }) {
      return {
        x: cursor.x / window.innerWidth,
        y: cursor.y,
      };
    }

    function onPointerMove(event: PointerEvent) {
      event.preventDefault();
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;
      updateMyPresence({
        cursor: transformPosition(position),
      });
    }

    function onPointerLeave() {
      lastPosition = null;
      updateMyPresence({ cursor: null });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        updateMyPresence({
          cursor: transformPosition(position),
        });
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [updateMyPresence]);

  const others = useOthers();

  const cursors = [];

  for (const { connectionId, presence } of others) {
    if (presence.cursor) {
      cursors.push({
        x: presence.cursor.x * window.innerWidth,
        y: presence.cursor.y,
        connectionId,
      });
    }
  }

  return cursors;
}

function Page() {
  /**
   * useMyPresence returns the presence of the current user and a function to update it.
   * updateMyPresence is different than the setState function returned by the useState hook from React.
   * You don't need to pass the full presence object to update it.
   * See https://liveblocks.io/docs/api-reference/liveblocks-react#useMyPresence for more information
   */

  const cursors = useLiveCursors();

  return (
    <main>
      <div className="mx-auto max-w-xl py-32 px-6 font-serif text-lg leading-loose">
        <h2 className="text-4xl font-bold">Hello world</h2>
        <p className="mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non odio
          at sapien sollicitudin molestie. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Integer suscipit dolor eget odio interdum, a
          ultrices elit feugiat. Suspendisse nec mauris pharetra, auctor ante
          vel.
        </p>
        <p className="mt-6">
          Donec eu lectus tristique, semper dolor at, laoreet urna. Nullam at
          pulvinar ligula. Sed luctus eu enim quis sagittis. Quisque justo sem,
          finibus eu mauris sit amet, venenatis egestas velit. Donec consequat
          porta gravida. Nunc egestas, ipsum a rhoncus semper, magna nulla
          accumsan odio, et rutrum neque diam id erat. Nulla sit amet sodales
          est.
        </p>
        <p className="mt-6">
          Fusce venenatis arcu a dolor dapibus, non placerat leo egestas. Fusce
          ultrices ligula vel nunc sodales, a condimentum arcu placerat. Nulla
          pretium nunc a nunc egestas egestas. Duis vel hendrerit elit, vel
          malesuada tellus. Integer posuere, metus quis blandit suscipit, lacus
          purus gravida neque, faucibus condimentum arcu magna in quam. Donec a
          augue nec neque sagittis luctus. Nunc lobortis nunc sit amet ligula
          sollicitudin, non euismod augue vestibulum. Sed ut mollis mauris, nec
          vestibulum.
        </p>
        <p className="mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non odio
          at sapien sollicitudin molestie. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Integer suscipit dolor eget odio interdum, a
          ultrices elit feugiat. Suspendisse nec mauris pharetra, auctor ante
          vel.
        </p>
        <p className="mt-6">
          Donec eu lectus tristique, semper dolor at, laoreet urna. Nullam at
          pulvinar ligula. Sed luctus eu enim quis sagittis. Quisque justo sem,
          finibus eu mauris sit amet, venenatis egestas velit. Donec consequat
          porta gravida. Nunc egestas, ipsum a rhoncus semper, magna nulla
          accumsan odio, et rutrum neque diam id erat. Nulla sit amet sodales
          est.
        </p>
        <p className="mt-6">
          Fusce venenatis arcu a dolor dapibus, non placerat leo egestas. Fusce
          ultrices ligula vel nunc sodales, a condimentum arcu placerat. Nulla
          pretium nunc a nunc egestas egestas. Duis vel hendrerit elit, vel
          malesuada tellus. Integer posuere, metus quis blandit suscipit, lacus
          purus gravida neque, faucibus condimentum arcu magna in quam. Donec a
          augue nec neque sagittis luctus. Nunc lobortis nunc sit amet ligula
          sollicitudin, non euismod augue vestibulum. Sed ut mollis mauris, nec
          vestibulum.
        </p>
      </div>
      {cursors.map(({ x, y, connectionId }) => (
        <Cursor
          key={connectionId}
          color={COLORS[connectionId % COLORS.length]}
          x={x}
          y={y}
        />
      ))}
    </main>
  );
}

export default Page;
