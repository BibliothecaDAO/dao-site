import { Button } from "../components/button";
import React, { useEffect, useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { TreasuryRow } from "components/TreasuryRow";

export function formatCurrency(value: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
}

const getERC20 = async (address: string) => {
  const response = await fetch(`/api/getERC20Balances?address=${address}`);
  return await response.json();
};

function Treasury() {
  const [nftList, setNftList] = useState([]);
  const [ethbalance, setEthBalance] = useState<any>();

  const developmentAccount = "0xa8e6efaf015d424c626cf3c23546fcb3bd2c9f1a";
  const frontinusHouseAccount = "0x439d859b391c38160227aeb5636df52da789cfc1";
  const emmissionsAccount = "0xbbae2e00bcc495913546dfaf0997fb18bf0f20fe";
  const daoRaiseAccount = "0xf92a1536fec97360f674c15e557ff60a2dbfbcdc";

  const [developmentBalance, setDevelopmentBalance] = useState<any>(0);
  const [frontinusHouseBalance, setFrontinusHouseBalance] = useState<any>(0);
  const [emmissionsBalance, setEmmissionsBalance] = useState<any>(0);
  const [daoRaiseBalance, setDaoRaiseBalance] = useState<any>(0);

  useEffect(() => {
    const getNftList = async () => {
      const response = await fetch("/api/getNFTList");
      const data = await response.json();
      // console.log(data); //logging nftlist data
      setNftList(data.data.realms);
    };

    const coins = [
      "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ];

    getNftList();

    getERC20("0xef3155450baa054ffe7950509ce2042613ee6586").then((data) => {
      console.log(data);
      setEthBalance(data);
    });

    getERC20(developmentAccount).then((data) => {
      setDevelopmentBalance(
        data.tokens.filter(
          (token: any) => token.tokenInfo.address == coins[0]
        )[0]
      );
    });

    getERC20(frontinusHouseAccount).then((data) => {
      setFrontinusHouseBalance(
        data.tokens.filter(
          (token: any) => token.tokenInfo.address == coins[0]
        )[0]
      );
    });

    getERC20(emmissionsAccount).then((data) => {
      setEmmissionsBalance(
        data.tokens.filter(
          (token: any) => token.tokenInfo.address == coins[0]
        )[0]
      );
    });

    getERC20(daoRaiseAccount).then((data) => {
      setDaoRaiseBalance(
        data.tokens.filter(
          (token: any) => token.tokenInfo.address == coins[0]
        )[0]
      );
    });
  }, []);

  console.log(
    developmentBalance,
    frontinusHouseBalance,
    emmissionsBalance,
    daoRaiseBalance
  );

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

              {developmentBalance != 0 && (
                <TreasuryRow
                  balance={developmentBalance.balance}
                  rate={developmentBalance.tokenInfo.price.rate}
                  account_name="Development"
                />
              )}

              {frontinusHouseBalance != 0 && (
                <TreasuryRow
                  balance={frontinusHouseBalance.balance}
                  rate={frontinusHouseBalance.tokenInfo.price.rate}
                  account_name="Frontinus House"
                />
              )}

              {emmissionsBalance != 0 && (
                <TreasuryRow
                  balance={emmissionsBalance.balance}
                  rate={emmissionsBalance.tokenInfo.price.rate}
                  account_name="Emissions"
                />
              )}

              {daoRaiseBalance != 0 && (
                <TreasuryRow
                  balance={daoRaiseBalance.balance}
                  rate={daoRaiseBalance.tokenInfo.price.rate}
                  account_name="DAO Raise"
                />
              )}
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
