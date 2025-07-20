'use client';
import { useEffect, useState } from 'react';
import { Users, Clock, Package, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Campaign {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string | null;
  };
  store: {
    id: string;
    store_name: string;
    banner_url: string | null;
  };
  group_price: number;
  target_quantity: number;
  current_quantity: number;
  end_date: string;
  status: string;
}

const GroupBuyCard = ({ campaign }: { campaign: Campaign }) => {
  const progress = (campaign.current_quantity / campaign.target_quantity) * 100;
  const timeLeft = new Date(campaign.end_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <Link href={`/group-buy/${campaign.id}`} passHref>
        <div>
          <img src={campaign.product.image_url || '/placeholder.svg'} alt={campaign.product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{campaign.product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{campaign.store.store_name}</p>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl font-bold text-green-600">Rp{campaign.group_price.toLocaleString('id-ID')}</p>
              <p className="text-sm text-gray-500 line-through">Rp{campaign.product.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{campaign.current_quantity} terkumpul</span>
              <span>Target: {campaign.target_quantity}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Clock className="w-4 h-4 mr-1" />
              Berakhir pada {timeLeft}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function GroupBuyClient() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/group-buy');
        if (!response.ok) {
          throw new Error(`Gagal memuat data. Status: ${response.status}`);
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Memuat data patungan...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (campaigns.length === 0) {
      return <p className="text-center text-gray-500">Saat ini tidak ada patungan yang aktif.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <GroupBuyCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Patungan Aktif</h2>
      {renderContent()}
    </div>
  );
}