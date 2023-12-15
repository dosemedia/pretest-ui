function LandingPageDemoHeader({ ctaTitle, ctaSubtitle, ctaColor1, ctaColor2, ctaImageUrl, onCtaClick }: { ctaTitle: string, ctaSubtitle: string, ctaColor1: string, ctaColor2: string, ctaImageUrl: string, onCtaClick: () => void }) {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4" style={{
                backgroundImage: 'linear-gradient(to right, ' + ctaColor1 + ' , ' + ctaColor2 + ')'
            }}>
                <div className="flex flex-col p-4">
                    <div className="text-lg">{ctaTitle}</div>
                    <div>{ctaSubtitle}</div>
                    <div className="grow flex items-end">
                        <button className="bg-green-400 btn border-green-700 w-full" onClick={onCtaClick}>Call to Action</button>
                    </div>
                </div>
                <div>
                    <img src={ctaImageUrl} alt="CTA" className='w-full' />
                </div>
            </div>
        </div>
    );
}

export default LandingPageDemoHeader
