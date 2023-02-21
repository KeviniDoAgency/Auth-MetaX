import { Heading } from "@aws-amplify/ui-react";
import useUserPermissions from "../Hooks/useUserPermissions";

export function Home() {
  const { userPermissions } = useUserPermissions();
  return (
    <Heading level={3}>
      Please use the buttons at the top to test out protected routes!
    </Heading>
  );
}
