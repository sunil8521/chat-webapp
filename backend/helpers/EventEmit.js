import { users } from "../ws.js";

export const Emit = (members, data) => {
  const memberSocket = members
    .map((id) => users.get(id))
    .filter((ws) => ws !== undefined);

  memberSocket.forEach((ws) => {
    ws.send(JSON.stringify(data));
  });
};
