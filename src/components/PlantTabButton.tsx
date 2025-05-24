import { Button } from './ui/button';

type PlantTab = 'cabai' | 'selada' | 'tomat';

interface PlantTabButtonGroupProps {
  activeTab: PlantTab;
  onTabChange: (tab: PlantTab) => void;
}

const tabs: { key: PlantTab; label: string }[] = [
  { key: 'cabai', label: 'Cabai' },
  { key: 'selada', label: 'Selada' },
  { key: 'tomat', label: 'Tomat' },
];

const PlantTabButtonGroup = ({
  activeTab,
  onTabChange,
}: PlantTabButtonGroupProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`w-full py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              isActive
                ? 'bg-[#2d5d46] text-white'
                : 'bg-transparent text-[#2d5d46] border border-[#2d5d46] hover:bg-[#e0ebe7]'
            }`}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default PlantTabButtonGroup;
