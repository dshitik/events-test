import React from 'react';
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { observer, useLocalStore } from "mobx-react-lite";

export const EventField = observer((props) => {
  const fieldState = useLocalStore(() => ({
    value: props.value,
    changeValue(value) {
      fieldState.value = value
    }
  }));
  const handleClick = () => props.onClick(props.type, fieldState.value);
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>{props.type.toUpperCase()}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        onChange={(e) => fieldState.changeValue(e.target.value)}
        value={!fieldState.value ? props.value : fieldState.value}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={handleClick}>Change</Button>
      </InputGroup.Append>
    </InputGroup>
  );
});