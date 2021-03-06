import React from "react";

import {Option, Variant} from "~/product/types";
import RadioGroup, {RadioRow} from "~/ui/inputs/Radio";

interface Props {
  value: Variant;
  onChange: (value: Variant) => void;
}

const SingleInput: React.FC<Props> = ({value, onChange}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const option: Option = value.options.find((option) => option.id === event.target.value);

    onChange({...value, value: [option]});
  }

  return (
    <RadioGroup value={value.value[0]?.id} onChange={handleChange}>
      {value.options.map((option) => (
        <RadioRow
          key={option.id}
          note={option.price ? `+ $${option.price}` : null}
          value={option.id}
        >
          {option.title}
        </RadioRow>
      ))}
    </RadioGroup>
  );
};

export default SingleInput;
