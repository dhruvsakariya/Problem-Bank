import React, { useState } from "react";
// import { socket } from "../../socket";

interface MyFormProps {}

export function MyForm(props: MyFormProps) {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // socket.timeout(5000).emit("create-something", value, () => {
    //   setIsLoading(false);
    // });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        title="message"
        className="border-2 border-black"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
