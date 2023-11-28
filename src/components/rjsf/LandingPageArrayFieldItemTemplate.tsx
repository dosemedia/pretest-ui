import { ArrayFieldTemplateItemType } from '@rjsf/utils';

function LandingPageArrayFieldItemTemplate(props: ArrayFieldTemplateItemType) {
  const { children } = props;

  return (
    <>
    <div>Index: {props.index}</div>

    <div>START--{children}--END</div>
    { props.canAdd &&
      <button className='btn' onClick={() => props.onAddIndexClick(props.index + 1)}>FIT Add</button>
    }
    { props.hasRemove &&
      <button className='btn' onClick={() => props.onDropIndexClick(props.index)}>FIT Remove</button>
    }
    { props.hasMoveUp &&
      <button className='btn' onClick={() => props.onReorderClick(props.index, props.index - 1)}>FIT Move Up</button>
    }
    { props.hasMoveDown &&
      <button className='btn' onClick={() => props.onReorderClick(props.index, props.index + 1)}>FIT Move Down</button>
    }
    </>
  );
}

export default LandingPageArrayFieldItemTemplate;
