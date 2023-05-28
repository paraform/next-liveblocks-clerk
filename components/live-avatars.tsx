"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useOthersMapped, useSelf } from "../liveblocks.config";

type LiveAvatarsProps = {
  max?: number;
};

// change the max to allow for more users
function LiveAvatars({ max = 3 }: LiveAvatarsProps) {
  const others = useOthersMapped((other) => other.info);
  const hasMoreUsers = others.length > max;
  const currentUser = useSelf();

  return (
    <div className="flex">
      {currentUser ? (
        <Avatar
          key="you"
          className="-ml-4 text-black bg-white border-2 border-white border-solid shadow-2xl"
        >
          <AvatarImage src={currentUser?.info?.image} />
          <AvatarFallback>{currentUser?.info?.username}</AvatarFallback>
        </Avatar>
      ) : null}

      {others
        .slice(0, max)
        .reverse()
        .map(([key, info]) => (
          <Avatar
            key={key}
            className="-ml-4 text-black bg-white border-2 border-white border-solid shadow-2xl"
          >
            <AvatarImage src={info?.image} />
            <AvatarFallback>{info?.username}</AvatarFallback>
          </Avatar>
        ))}

      {hasMoreUsers ? (
        <Avatar className="-ml-4 border-2 bg-gray-500 text-gray-900 border-white border-solid shadow-2xl">
          <AvatarFallback>+</AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
}

export default LiveAvatars;
