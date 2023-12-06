/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Button } from "../components/button";
import React, { useEffect, useState } from "react";

import { MainLayout } from "../components/layout/MainLayout";

const DAOlordsBalance = 87500000;

function Treasury() {
  const [nftList, setNftList] = useState([]);
  const [erc20Balance, setErc20Balance] = useState<any>(); // for table array of objc
  const [ethbalance, setEthBalance] = useState<any>(); // for table array of objc
  const [lords, setLords] = useState<any>();

  function formatCurrency(value: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(value);
  }

  useEffect(() => {
    const getNftList = async () => {
      const response = await fetch("/api/getNFTList");
      const data = await response.json();
      // console.log(data); //logging nftlist data
      setNftList(data.data.realms);
    };

    const getERC20 = async () => {
      const response = await fetch("/api/getERC20Balances");
      const data = await response.json();
      setEthBalance(data);
    };

    const coins = [
      "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ];

    // filter

    const getERC20Balances = async () => {
      const response = await fetch("/api/getERC20Balances");
      const data = await response.json();
      const filtered = data.tokens.filter((token: any) =>
        coins.includes(token.tokenInfo.address)
      );
      console.log(filtered);
      setErc20Balance(filtered);
    };
    getNftList();
    getERC20();
    getERC20Balances();
  }, []);

  console.log(erc20Balance);

  return (
    <MainLayout>
      <div className="container px-10 py-20 pt-40 mx-auto sm:px-20 sm:py-40 sm:pt-60">
        <h1 className="mb-8 font-lords">Bibliotheca DAO</h1>
        <p className="sm:text-xl sm:w-1/2">
          {" "}
          The treasury funds managed by community members will be used to enable
          the DAO's mission, vision and goals.
        </p>
        <div className="flex mt-10">
          <Button
            href="https://snapshot.org/#/council.bibliotheca.eth"
            size="sm"
            variant="dao"
            texture={false}
          >
            Snapshot
          </Button>
        </div>
        {/* <FaqBlock faqs={treasuryPage} /> */}
      </div>
      <div className="border-t">
        <div className="container px-8 py-20 mx-auto">
          <h1 className="mb-10">Assets</h1>
          <table className="w-full mb-20 text-xs text-left border border-gray-300 table-auto sm:text-lg md:w-1/2 sm:w-2/3">
            <thead>
              <tr className="tracking-widest uppercase border border-off-300/40">
                <th className="p-2">Asset</th>
                <th className="p-2 text-right">Amount</th>
                <th className="p-2 text-right">USD</th>
              </tr>
            </thead>
            <tbody>
              {ethbalance && (
                <tr className="border border-gray-300/40 ">
                  <td className="p-2">Ethereum</td>
                  <td className="p-2 text-right">
                    {ethbalance.ETH.balance.toFixed(3)}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency(
                      ethbalance.ETH.balance * ethbalance.ETH.price.rate
                    )}
                  </td>
                </tr>
              )}
              {erc20Balance &&
                erc20Balance.map((token: any) => (
                  <tr
                    key={token.tokenInfo.name}
                    className="border border-gray-300/40 "
                  >
                    <td className="p-2">{token.tokenInfo.name}</td>
                    <td className="p-2 text-right">
                      {(
                        token.balance / Math.pow(10, token.tokenInfo.decimals)
                      ).toFixed(3)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(
                        (token.balance /
                          Math.pow(10, token.tokenInfo.decimals)) *
                          token.tokenInfo.price.rate
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="container grid gap-4 sm:grid-cols-3 md:grid-cols-4">
            {nftList.map((realm: any) => (
              <div
                key={realm.tokenId}
                className="rounded rounded-t shadow-lg bg-gray-900/40"
              >
                <img
                  className="object-cover w-full rounded-t"
                  src={
                    `https://d23fdhqc1jb9no.cloudfront.net/_Realms/` +
                    realm.tokenId +
                    `.svg`
                  }
                  alt=""
                />
                <div className="p-4">
                  <h5 className="text-off-300">Realm #{realm.tokenId}</h5>
                  <h4 className="text-off-300">{realm.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Treasury;
