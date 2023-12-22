import LandingPageTemplate from './LandingPageTemplate.ts';
import LandingPageSimplePollModule from './simple_poll/LandingPageSimplePollModule.tsx';
import LandingPageHeroSimplePollModule from './hero_simple_poll/LandingPageHeroSimplePollModule.tsx';
import LandingPageProductCtaLinkModule from './product_cta_link/LandingPageProductCtaLinkModule.tsx';
import LandingPageProductCtaEmailModule from './product_cta_email/LandingPageProductCtaEmailModule.tsx';

const LandingPageTemplates : Array<LandingPageTemplate> = [
  LandingPageSimplePollModule,
  LandingPageHeroSimplePollModule,
  LandingPageProductCtaLinkModule,
  LandingPageProductCtaEmailModule
]

export default LandingPageTemplates;
