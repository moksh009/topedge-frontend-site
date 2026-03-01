import PremiumButton from './PricingPremiumButton';
import { DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingCTAButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <PremiumButton
        icon={DollarSign}
        text="Book Coffee Call"
        onClick={() => navigate('/booking')}
        variant="green"
      />
      <PremiumButton
        icon={DollarSign}
        text="Get Started"
        onClick={() => navigate('/booking')}
        variant="green"
      />
    </div>
  );
};

export default PricingCTAButtons;
