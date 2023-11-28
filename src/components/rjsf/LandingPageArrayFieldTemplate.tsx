import { ArrayFieldTemplateProps } from '@rjsf/utils';

// https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-templates#arrayfieldtemplate

function LandingPageArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  return (
    <div className="border p-5 mt-5 mb-5">
      {props.items.map((element) => 
        <div key={element.key}>
          <div>{element.children}</div>
          {/* { element.canAdd &&
            <button className='btn' onClick={() => element.onAddIndexClick(element.index + 1)()}>Add</button>
          } */}
          { element.hasRemove &&
            <button className='btn' onClick={() => element.onDropIndexClick(element.index)()}>Remove</button>
          }
          { element.hasMoveUp &&
            <button className='btn' onClick={() => element.onReorderClick(element.index, element.index - 1)()}>Move Up</button>
          }
          { element.hasMoveDown &&
            <button className='btn' onClick={() => element.onReorderClick(element.index, element.index + 1)()}>Move Down</button>
          }
        </div>
      
      )}
      {props.canAdd && <button type='button' className="btn mt-5" onClick={props.onAddClick}>Add {props.schema.title}</button>}
    </div>
  );
}

export default LandingPageArrayFieldTemplate;