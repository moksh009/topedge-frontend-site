import MockupFrame from './shared/MockupFrame';
import { marketingImages } from '../assets';

/** Premium Flow Builder graphic — uses your canvas artwork */
export default function FlowBuilderMockup() {
  return (
    <MockupFrame>
      <img
        src={marketingImages.flowBuilderCanvas.src}
        alt={marketingImages.flowBuilderCanvas.alt}
        className="block w-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
    </MockupFrame>
  );
}
