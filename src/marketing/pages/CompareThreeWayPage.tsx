import CompareMultiWayPage from './CompareMultiWayPage';
import { fourWayConfig, threeWayConfig } from '../data/compareMultiWay';
import { compareThreeWayModifiedIso } from '../data/contentDates';

/**
 * The two multi-vendor boards. Both render through CompareMultiWayPage, so the
 * markup exists once; only the peer list and the copy differ.
 */
export default function CompareThreeWayPage() {
  return <CompareMultiWayPage config={threeWayConfig(compareThreeWayModifiedIso())} />;
}

export function CompareFourWayPage() {
  return <CompareMultiWayPage config={fourWayConfig(compareThreeWayModifiedIso())} />;
}
