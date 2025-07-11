import GroupBuyDetailClient from '@/components/group-buy/GroupBuyDetailClient';
import { groupBuyData, getGroupBuyById } from '@/lib/group-buy-data';

// Generate static params for static export
export async function generateStaticParams() {
  return groupBuyData.map((groupBuy) => ({
    id: groupBuy.id,
  }));
}

interface GroupBuyDetailPageProps {
  params: {
    id: string;
  };
}

export default function GroupBuyDetailPage({ params }: GroupBuyDetailPageProps) {
  const groupBuy = getGroupBuyById(params.id);

  return (
    <div>
      <GroupBuyDetailClient groupBuy={groupBuy} />
    </div>
  );
}