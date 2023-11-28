import React from 'react';

// TODO - should schema for the template go here right with the template instead of in the database?

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageDemo: React.FC<{ data: any }> = ({ data }) => {
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-4" style={{
        backgroundImage: 'linear-gradient(to right, ' + data.ctaColor1 + ' , ' + data.ctaColor2 + ')'
      }}>
        <div>
          <div className="text-lg">{ data.ctaTitle }</div>
          <div>{ data.ctaSubtitle }</div>
        </div>
        <div>
          <img src={data.ctaImageUrl} alt="CTA" className='w-full' />
        </div>
      </div>

      <div>Data: { JSON.stringify(data) }</div>
    </div>
  );
}

export default LandingPageDemo;
