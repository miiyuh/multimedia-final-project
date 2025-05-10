import CaseIntro from '@/components/case-intro';
import CaseBackground from '@/components/case-background';
import EvidenceBoard from '@/components/evidence-board';
import InvestigationTools from '@/components/investigation-tools';
import DecisionPoint from '@/components/decision-point';
import SuspectProfiles from '@/components/suspect-profiles';
import { useCaseState, CaseStateProvider } from '@/hooks/use-case-state';

const HomeContent = () => {
  const { currentStep } = useCaseState();
  
  return (
    <>
      <CaseIntro />
      <CaseBackground />
      <EvidenceBoard />
      <InvestigationTools />
      <DecisionPoint />
      <SuspectProfiles />
    </>
  );
};

const Home = () => {
  return (
    <CaseStateProvider>
      <HomeContent />
    </CaseStateProvider>
  );
};

export default Home;
