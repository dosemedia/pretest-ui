import { ArrayFieldTitleProps } from '@rjsf/utils';

function LandingPageArrayFieldTitleTemplate(props: ArrayFieldTitleProps) {
  const { title } = props;
  return <h1 className="text-lg">{title}</h1>;
}

export default LandingPageArrayFieldTitleTemplate;
