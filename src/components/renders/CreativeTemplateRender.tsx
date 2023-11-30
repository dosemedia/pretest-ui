import React from "react"
import CreativeTemplates from "../creative_templates/CreativeTemplates";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const templates: { [key: string]: React.FC<{ data: any }> } = {};
for (const template of CreativeTemplates) {
  templates[template.name] = template.render;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreativeTemplateRender: React.FC<{ data: any, component: string }> = ({ data, component }) => {

  const Template = templates[component];

  return (
    <Template data={data} />
  );
}

export default CreativeTemplateRender;