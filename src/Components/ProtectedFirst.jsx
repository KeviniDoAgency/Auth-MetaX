import { useAuthenticator, Heading } from "@aws-amplify/ui-react";
import { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism"; // Elige un estilo de resaltado

export const ProtectedFirst = () => {
  const { route, user } = useAuthenticator((context) => [
    context.route,
    context.user,
  ]);

  const [copied, setCopied] = useState(false);
  const textToCopyRef = useRef(null);

  const handleCopy = () => {
    const textToCopy = textToCopyRef.current.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="bg-white p-8 rounded-md shadow-lg flex flex-col gap-2 min-w-[1000px]">
      <code className="text-black font-bold text-[28px] flex items-center gap-4">
        {" "}
        clientId = <code className="font-light">{user?.pool?.clientId}</code>
      </code>
      <code className="text-black font-bold text-[28px] flex items-center  gap-4">
        userPoolId ={" "}
        <code className="font-light">{user?.pool?.userPoolId}</code>
      </code>
      <code className="text-black font-bold text-[28px] flex items-center  gap-4">
        tokenUse ={" "}
        <code className="font-light">
          {user?.signInUserSession?.accessToken?.payload?.token_use}
        </code>
      </code>
      <code className="text-black font-bold text-[28px] flex items-center justify-between">
        {" "}
        Token:{" "}
        <button
          className="bg-[#6465b3] text-white p-1 text-[10px]"
          onClick={handleCopy}
        >
          Copiar token
        </button>
      </code>

      <p className="token border-[#7181c4] border p-8" ref={textToCopyRef}>
        {user?.signInUserSession?.accessToken?.jwtToken}
      </p>

      {copied && <p className="mt-2 font-bold">¡Texto copiado!</p>}
    </div>
  );
};
