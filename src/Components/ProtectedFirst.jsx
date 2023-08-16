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
    <div className="div">
      <p> clientId = {user?.pool?.clientId}</p>
      <p>userPoolId = {user?.pool?.userPoolId}</p>
      <p>
        {" "}
        tokenUse = {user?.signInUserSession?.accessToken?.payload?.token_use}
      </p>
      <p> Token:</p>
      <p className="token" ref={textToCopyRef}>
        {user?.signInUserSession?.accessToken?.jwtToken}
      </p>
      <button onClick={handleCopy}>Copiar token</button>
      {copied && <p>¡Texto copiado!</p>}
    </div>
  );
};
