import LandingPageTemplate from './LandingPageTemplate.ts';
import LandingPageSimplePollModule from './simple_poll/LandingPageSimplePollModule.tsx';
import LandingPageHeroSimplePollModule from './hero_simple_poll/LandingPageHeroSimplePollModule.tsx';

const LandingPageTemplates : Array<LandingPageTemplate> = [
  LandingPageSimplePollModule,
  LandingPageHeroSimplePollModule
]

export default LandingPageTemplates;
