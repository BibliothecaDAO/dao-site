import { formatCurrency } from "pages/treasury";

interface TreasuryRowProps {
  balance: number;
  rate: number;
  account_name: string;
}

export const TreasuryRow = ({
  balance,
  rate,
  account_name,
}: TreasuryRowProps) => {
  return (
    <tr className="border border-gray-300/40 ">
      <td className="p-2">Lords [{account_name}]</td>
      <td className="p-2 text-right">
        {(balance / Math.pow(10, 18)).toLocaleString()}
      </td>
      <td className="p-2 text-right">
        {formatCurrency((balance / Math.pow(10, 18)) * rate)}
      </td>
    </tr>
  );
};
