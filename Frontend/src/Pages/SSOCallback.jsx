import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function SSOCallback() {
  return (
    <AuthenticateWithRedirectCallback
      signInForceRedirectUrl="/oauth-sync"
      signUpForceRedirectUrl="/oauth-sync"
    />
  );
}

export default SSOCallback;
