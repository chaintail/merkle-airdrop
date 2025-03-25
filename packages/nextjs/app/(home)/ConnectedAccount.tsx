"use client";

import { Address } from "~~/components/scaffold-eth";
import { useAccount } from "wagmi";

export const ConnectedAccount = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
      <p className="my-2 font-medium">Connected Address:</p>
      <Address address={connectedAddress} />
    </div>
  );
};
