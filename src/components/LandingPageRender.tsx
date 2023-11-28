import React from "react"
import LandingPageDemo from './landing_page_templates/LandingPageDemo.tsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const templates: { [key: string]: React.FC<{ data: any }> } = {
  LandingPageDemo: LandingPageDemo
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageRender: React.FC<{ data: any, component: string }> = ({ data, component }) => {

  const Template = templates[component];

  return (
    <Template data={data} />
  );
}

export default LandingPageRender;

// Lazy version, causes annoying flicker in page editor (ok on plain render)

// import React, { Suspense } from "react"
// // import LandingPageDemo from './landing_page_templates/LandingPageDemo.tsx';

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // const templates: { [key: string]: React.FC<{ data: any }> } = {
// //   LandingPageDemo: LandingPageDemo
// // };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const LandingPageRender: React.FC<{ data: any, component: string }> = ({ data, component }) => {

//   // const Template = templates[component];
//   const Template = React.lazy(() => import('./landing_page_templates/' + component + '.tsx'));

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Template data={data} />
//     </Suspense>
//   );
// }

// export default LandingPageRender;
